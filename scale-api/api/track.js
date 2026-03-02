const { sql, logConversion } = require('../lib/db');
const { createOrUpdateContact } = require('../lib/ghl');
const { fireMetaLeadEvent } = require('../lib/meta-capi');
const { fireGoogleLeadEvent } = require('../lib/google-ads');
const { normalizeAttribution, getClickId } = require('../lib/attribution');

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { form, attribution } = req.body;

    if (!form || !form.email) {
      return res.status(400).json({ error: 'Missing form data' });
    }

    const attr = normalizeAttribution(attribution);
    const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress;

    // 1. Server-side qualification
    const isService = form.service_business === 'yes';
    const isAbove500k = form.revenue === '500k-1m' || form.revenue === '1m-plus';
    const qualified = isService && isAbove500k;

    const fbclid = getClickId(attr, 'fbclid');
    const gclid = getClickId(attr, 'gclid');

    // 2. Upsert visitor
    if (attr.visitor_id) {
      await sql`
        INSERT INTO visitors (visitor_id, first_touch, last_touch)
        VALUES (${attr.visitor_id}, ${JSON.stringify(attr.first_touch)}, ${JSON.stringify(attr.last_touch)})
        ON CONFLICT (visitor_id)
        DO UPDATE SET
          last_touch = ${JSON.stringify(attr.last_touch)},
          updated_at = NOW()
      `;
    }

    // 3. Insert contact
    const contactResult = await sql`
      INSERT INTO contacts (visitor_id, email, name, phone, revenue, service_business, qualified, consent, fbclid, gclid, ip_address, user_agent)
      VALUES (
        ${attr.visitor_id},
        ${form.email},
        ${form.name || null},
        ${form.phone || null},
        ${form.revenue || null},
        ${isService},
        ${qualified},
        ${!!form.consent},
        ${fbclid},
        ${gclid},
        ${ip},
        ${attr.user_agent}
      )
      RETURNING id
    `;
    const contactId = contactResult.rows[0].id;

    // 4. Create GHL contact (non-blocking on failure)
    let ghlContactId = null;
    try {
      ghlContactId = await createOrUpdateContact({
        email: form.email,
        name: form.name,
        phone: form.phone,
        tags: [qualified ? 'qualified' : 'not-qualified', 'website-applicant'],
        customFields: {
          revenue: form.revenue,
          service_business: form.service_business,
          visitor_id: attr.visitor_id,
          utm_source_first: attr.first_touch?.utms?.utm_source,
          utm_medium_first: attr.first_touch?.utms?.utm_medium,
          utm_campaign_first: attr.first_touch?.utms?.utm_campaign,
          utm_source_last: attr.last_touch?.utms?.utm_source,
          utm_medium_last: attr.last_touch?.utms?.utm_medium,
          utm_campaign_last: attr.last_touch?.utms?.utm_campaign,
          fbclid: fbclid,
          gclid: gclid
        },
        pipelineStage: qualified ? 'APPLIED_QUALIFIED' : 'APPLIED_NOT_QUALIFIED'
      });

      if (ghlContactId) {
        await sql`UPDATE contacts SET ghl_contact_id = ${ghlContactId} WHERE id = ${contactId}`;
      }
    } catch (ghlError) {
      console.error('GHL contact creation failed:', ghlError.message);
    }

    // 5. Fire Meta CAPI "Lead" (non-blocking)
    const eventId = (attr.visitor_id || contactId) + '_lead';
    fireMetaLeadEvent({
      email: form.email,
      phone: form.phone,
      fbclid: fbclid,
      ip: ip,
      userAgent: attr.user_agent,
      sourceUrl: attr.current_page,
      eventId: eventId,
      contactId: contactId
    }).then(result => {
      if (result) logConversion({ contactId, eventName: 'Lead', source: 'meta_capi', status: 'sent', requestPayload: result.eventData, responsePayload: result.result });
    }).catch(err => {
      console.error('Meta CAPI Lead failed:', err.message);
      logConversion({ contactId, eventName: 'Lead', source: 'meta_capi', status: 'failed', requestPayload: {}, responsePayload: { error: err.message } });
    });

    // 6. Fire Google Ads offline conversion (non-blocking)
    if (gclid) {
      fireGoogleLeadEvent({ gclid, contactId }).then(result => {
        if (result) logConversion({ contactId, eventName: 'Lead', source: 'google_ads', status: result.ok ? 'sent' : 'failed', requestPayload: result.requestBody, responsePayload: result.result });
      }).catch(err => {
        console.error('Google Ads Lead failed:', err.message);
      });
    }

    // 7. Return redirect
    const redirectUrl = qualified
      ? (process.env.BOOKING_URL || 'https://scaleenterprises.com/booking.html')
      : 'https://scaleenterprises.com/not-a-fit.html';

    return res.status(200).json({
      success: true,
      qualified: qualified,
      redirect: redirectUrl,
      event_id: eventId
    });

  } catch (error) {
    console.error('Track endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
