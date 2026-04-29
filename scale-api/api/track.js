const { query, logConversion } = require('../lib/db');
const { createOrUpdateContact } = require('../lib/ghl');
const { fireMetaLeadEvent } = require('../lib/meta-capi');
const { fireGoogleLeadEvent } = require('../lib/google-ads');
const { normalizeAttribution, getClickId } = require('../lib/attribution');
const { setCors } = require('../lib/cors');

async function withRetry(fn, retries = 1, delayMs = 1000) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt < retries) {
        console.warn(`Attempt ${attempt + 1} failed, retrying in ${delayMs}ms:`, err.message);
        await new Promise(r => setTimeout(r, delayMs));
      } else {
        throw err;
      }
    }
  }
}

module.exports = async function handler(req, res) {
  setCors(req, res);
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

    // 2. DB writes + GHL + Meta + Google — all in parallel
    const visitorPromise = attr.visitor_id
      ? query(
          `INSERT INTO visitors (visitor_id, first_touch, last_touch)
           VALUES ($1, $2, $3)
           ON CONFLICT (visitor_id)
           DO UPDATE SET last_touch = $3, updated_at = NOW()`,
          [attr.visitor_id, JSON.stringify(attr.first_touch), JSON.stringify(attr.last_touch)]
        )
      : Promise.resolve();

    const contactPromise = query(
      `INSERT INTO contacts (visitor_id, email, name, phone, revenue, service_business, qualified, consent, fbclid, gclid, ip_address, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING id`,
      [attr.visitor_id, form.email, form.name || null, form.phone || null, form.revenue || null, isService, qualified, !!form.sms_consent, fbclid, gclid, ip, attr.user_agent]
    );

    const ghlPromise = withRetry(() => createOrUpdateContact({
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
    }));

    // DB writes run in parallel; GHL is non-blocking
    const [, contactResult] = await Promise.all([visitorPromise, contactPromise]);
    const contactId = contactResult.rows[0].id;
    let ghlContactId;
    try {
      ghlContactId = await ghlPromise;
    } catch (err) {
      console.error('GHL contact creation failed after retry:', err.message, err.stack);
    }

    // Link GHL contact to DB record
    if (ghlContactId) {
      query(`UPDATE contacts SET ghl_contact_id = $1 WHERE id = $2`, [ghlContactId, contactId])
        .catch(err => console.error('Failed to store ghl_contact_id:', err.message));
    }

    // Fire Meta + Google in parallel (non-blocking but awaited)
    const eventId = (attr.visitor_id || contactId) + '_lead';

    const metaPromise = fireMetaLeadEvent({
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

    const googlePromise = gclid
      ? fireGoogleLeadEvent({ gclid, contactId }).then(result => {
          if (result) logConversion({ contactId, eventName: 'Lead', source: 'google_ads', status: result.ok ? 'sent' : 'failed', requestPayload: result.requestBody, responsePayload: result.result });
        }).catch(err => console.error('Google Ads Lead failed:', err.message))
      : Promise.resolve();

    await Promise.allSettled([metaPromise, googlePromise]);

    // Record A/B test conversions
    if (attr.ab_variants && typeof attr.ab_variants === 'object') {
      for (const [testId, variantId] of Object.entries(attr.ab_variants)) {
        query(
          `INSERT INTO ab_events (test_id, variant_id, visitor_id, event_type, contact_id) VALUES ($1, $2, $3, 'conversion', $4)`,
          [testId, variantId, attr.visitor_id || null, contactId]
        ).catch(err => console.error('AB conversion tracking failed:', err.message));
      }
    }

    // Return redirect
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
