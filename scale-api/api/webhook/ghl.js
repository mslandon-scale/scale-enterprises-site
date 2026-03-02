const { sql, logConversion } = require('../../lib/db');
const { fireMetaEvent } = require('../../lib/meta-capi');
const { uploadClickConversion } = require('../../lib/google-ads');

// Map GHL pipeline stages to conversion events
const STAGE_EVENT_MAP = {
  'booked':  { meta: 'Schedule', google: 'BOOKCALL' },
  'showed':  { meta: 'Contact',  google: 'SHOWEDUP' },
  'closed':  { meta: 'Purchase', google: 'PURCHASE' }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook secret
  const secret = req.query.secret || req.headers['x-ghl-signature'];
  if (secret !== process.env.GHL_WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const payload = req.body;
    const ghlContactId = payload.contact_id || payload.contactId;
    const pipelineStage = payload.pipeline_stage || payload.pipelineStage || payload.stage;

    if (!ghlContactId || !pipelineStage) {
      return res.status(200).json({ message: 'Missing contact or stage data' });
    }

    const eventMapping = STAGE_EVENT_MAP[pipelineStage];
    if (!eventMapping) {
      return res.status(200).json({ message: `Stage "${pipelineStage}" not tracked` });
    }

    // Look up contact with attribution data
    const result = await sql`
      SELECT c.*, v.first_touch, v.last_touch
      FROM contacts c
      LEFT JOIN visitors v ON c.visitor_id = v.visitor_id
      WHERE c.ghl_contact_id = ${ghlContactId}
      ORDER BY c.created_at DESC
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'Contact not found in DB' });
    }

    const contact = result.rows[0];

    // Fire Meta CAPI event
    if (contact.fbclid || contact.email) {
      try {
        const metaResult = await fireMetaEvent({
          eventName: eventMapping.meta,
          email: contact.email,
          phone: contact.phone,
          fbclid: contact.fbclid,
          ip: contact.ip_address,
          userAgent: contact.user_agent,
          contactId: contact.id
        });
        if (metaResult) {
          await logConversion({
            contactId: contact.id,
            eventName: eventMapping.meta,
            source: 'meta_capi',
            status: 'sent',
            requestPayload: metaResult.eventData,
            responsePayload: metaResult.result
          });
        }
      } catch (err) {
        console.error(`Meta CAPI ${eventMapping.meta} failed:`, err.message);
        await logConversion({
          contactId: contact.id,
          eventName: eventMapping.meta,
          source: 'meta_capi',
          status: 'failed',
          requestPayload: {},
          responsePayload: { error: err.message }
        });
      }
    }

    // Fire Google Ads offline conversion
    if (contact.gclid) {
      try {
        const googleResult = await uploadClickConversion({
          gclid: contact.gclid,
          conversionAction: eventMapping.google,
          conversionValue: pipelineStage === 'closed' ? (parseFloat(process.env.DEAL_VALUE) || 0) : 0,
          contactId: contact.id
        });
        if (googleResult) {
          await logConversion({
            contactId: contact.id,
            eventName: eventMapping.google,
            source: 'google_ads',
            status: googleResult.ok ? 'sent' : 'failed',
            requestPayload: googleResult.requestBody,
            responsePayload: googleResult.result
          });
        }
      } catch (err) {
        console.error(`Google Ads ${eventMapping.google} failed:`, err.message);
      }
    }

    return res.status(200).json({ success: true, stage: pipelineStage });

  } catch (error) {
    console.error('GHL webhook error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
