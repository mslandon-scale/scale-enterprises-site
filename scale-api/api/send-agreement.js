const { query } = require('../lib/db');
const { setCors } = require('../lib/cors');
const { createDocumentFromTemplate, waitForDocumentAndSend } = require('../lib/pandadoc');
const { lookupContactByEmail, findOpportunityByContact, updateOpportunityStage } = require('../lib/ghl');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { secret, client, deal, submitted_by } = req.body;

    // Auth
    const expectedSecret = (process.env.PROCUREMENT_FORM_SECRET || '').trim();
    if (!expectedSecret || secret !== expectedSecret) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Validate
    if (!client?.name || !deal?.service_name || !deal?.trans_fee) {
      return res.status(400).json({ error: 'Missing required fields: client.name, deal.service_name, deal.trans_fee' });
    }

    const transFee = parseFloat(deal.trans_fee);
    const retFee = deal.ret_fee ? parseFloat(deal.ret_fee) : 0;
    if (isNaN(transFee) || transFee <= 0) {
      return res.status(400).json({ error: 'Invalid transformation fee' });
    }

    const amount = transFee + retFee;

    const templateId = (process.env.PANDADOC_TEMPLATE_ID || '').trim();
    if (!templateId) {
      return res.status(500).json({ error: 'PANDADOC_TEMPLATE_ID not configured' });
    }

    const nameParts = (client.name || '').trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Look up contact from GHL if email/phone not provided
    let clientEmail = client.email || null;
    let clientPhone = client.phone || null;
    let ghlContactFromLookup = null;

    if (!clientEmail) {
      // Try to find contact in GHL by name
      try {
        const ghlContact = await lookupContactByEmail(client.name);
        if (ghlContact) {
          ghlContactFromLookup = ghlContact;
          clientEmail = ghlContact.email || null;
          clientPhone = clientPhone || ghlContact.phone || null;
        }
      } catch (e) { /* GHL lookup failed */ }
    }

    if (!clientEmail) {
      return res.status(400).json({ error: 'Client email is required. Provide it directly or ensure the contact exists in GHL.' });
    }

    // Look up existing contact in our DB
    let dbContact = null;
    try {
      const result = await query(
        `SELECT * FROM contacts WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
        [clientEmail]
      );
      dbContact = result.rows[0] || null;
    } catch (e) { /* no existing contact */ }

    // Create PandaDoc document from template
    let pandadocId = null;
    try {
      const doc = await createDocumentFromTemplate({
        templateId,
        name: `${client.name} - ${deal.service_name} Agreement`,
        recipientEmail: clientEmail,
        recipientFirstName: firstName,
        recipientLastName: lastName,
        fields: {
          'trans.fee': transFee.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          'ret.fee': retFee > 0 ? retFee.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '$0.00'
        }
      });

      pandadocId = doc.id;

      // Wait for document to be processed, then send
      await waitForDocumentAndSend(pandadocId,
        `Hi ${firstName},\n\nPlease review and sign the attached agreement for the ${deal.service_name}.\n\nIf you have any questions, reply to this email.\n\n— Matthew Landon\nFounder, Scale Enterprises`
      );
    } catch (pdError) {
      console.error('PandaDoc document creation failed:', pdError.message);
      return res.status(500).json({ error: 'Failed to create agreement', detail: pdError.message });
    }

    // Update GHL opportunity to Procurement stage
    let ghlContactId = dbContact?.ghl_contact_id || ghlContactFromLookup?.id || null;
    let ghlOpportunityId = null;

    try {
      if (!ghlContactId) {
        const ghlContact = await lookupContactByEmail(clientEmail);
        if (ghlContact) ghlContactId = ghlContact.id;
      }

      if (ghlContactId) {
        const stageId = (process.env.GHL_STAGE_PROCUREMENT || '').trim();
        if (stageId) {
          const existingOpp = await findOpportunityByContact(ghlContactId);
          if (existingOpp) {
            await updateOpportunityStage(existingOpp.id, stageId, amount);
            ghlOpportunityId = existingOpp.id;
          }
        }
      }
    } catch (ghlError) {
      console.error('GHL update failed:', ghlError.message);
    }

    // Store agreement record
    let agreementId = null;
    try {
      const result = await query(
        `INSERT INTO agreements (contact_id, ghl_contact_id, ghl_opportunity_id, client_name, client_email, client_phone, service_name, amount, pandadoc_id, status, submitted_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         RETURNING id`,
        [
          dbContact?.id || null, ghlContactId, ghlOpportunityId,
          client.name, clientEmail, clientPhone || null,
          deal.service_name, amount,
          pandadocId, 'sent',
          submitted_by || null
        ]
      );
      agreementId = result.rows[0]?.id;
    } catch (dbError) {
      console.error('Failed to store agreement record:', dbError.message);
    }

    return res.status(200).json({
      success: true,
      agreement_id: agreementId,
      pandadoc_id: pandadocId,
      message: `Agreement sent to ${clientEmail} for signature`
    });

  } catch (error) {
    console.error('Send agreement error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
