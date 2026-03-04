const { query, logConversion } = require('../../lib/db');
const { verifyWebhook } = require('../../lib/pandadoc');
const { findOrCreateCustomer, createInvoice } = require('../../lib/qbo');
const { findOpportunityByContact, updateOpportunityStage } = require('../../lib/ghl');
const { createExternalOrder, createOrderInvoice, findOrCreateContact: cfFindOrCreateContact } = require('../../lib/clickfunnels');
const { fireMetaEvent } = require('../../lib/meta-capi');
const { uploadClickConversion } = require('../../lib/google-ads');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify webhook
  const signature = req.headers['x-pandadoc-signature'] || '';
  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
  if (!verifyWebhook(rawBody, signature)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Respond immediately
  res.status(200).json({ ok: true });

  try {
    const events = Array.isArray(req.body) ? req.body : [req.body];

    for (const event of events) {
      // Only process completed/signed documents
      if (event.event !== 'document_state_changed' || event.data?.status !== 'document.completed') {
        continue;
      }

      const pandadocId = event.data?.id;
      if (!pandadocId) continue;

      await processSignedAgreement(pandadocId);
    }
  } catch (error) {
    console.error('PandaDoc webhook processing error:', error);
  }
};

async function processSignedAgreement(pandadocId) {
  try {
    // Look up agreement in our DB
    const result = await query(
      `SELECT * FROM agreements WHERE pandadoc_id = $1 AND status != 'signed' LIMIT 1`,
      [pandadocId]
    );

    const agreement = result.rows[0];
    if (!agreement) {
      console.log(`No pending agreement found for PandaDoc ID: ${pandadocId}`);
      return;
    }

    // Update agreement status
    await query(
      `UPDATE agreements SET status = 'signed', signed_at = NOW(), updated_at = NOW() WHERE id = $1`,
      [agreement.id]
    );

    const amount = parseFloat(agreement.amount);

    // --- Create QuickBooks Invoice ---
    let qboInvoiceId = null;
    let qboInvoiceNumber = null;

    try {
      const qboCustomer = await findOrCreateCustomer({
        name: agreement.client_name,
        email: agreement.client_email,
        phone: agreement.client_phone
      });

      const invoiceResult = await createInvoice({
        customerId: qboCustomer.Id,
        customerEmail: agreement.client_email,
        serviceName: agreement.service_name,
        amount: amount
      });

      const invoice = invoiceResult.Invoice;
      qboInvoiceId = invoice.Id;
      qboInvoiceNumber = invoice.DocNumber;
    } catch (qboError) {
      console.error('QBO invoice creation after signing failed:', qboError.message);
    }

    // --- Store invoice record ---
    let invoiceId = null;
    if (qboInvoiceId) {
      // Look up contact for attribution data
      let dbContact = null;
      if (agreement.contact_id) {
        const contactResult = await query(`SELECT * FROM contacts WHERE id = $1`, [agreement.contact_id]);
        dbContact = contactResult.rows[0] || null;
      }

      try {
        const invoiceResult = await query(
          `INSERT INTO invoices (contact_id, ghl_contact_id, ghl_opportunity_id, client_name, client_email, client_phone, service_name, amount, qbo_invoice_id, qbo_invoice_number, status, fbclid, gclid, ip_address, user_agent, submitted_by)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
           RETURNING id`,
          [
            agreement.contact_id, agreement.ghl_contact_id, agreement.ghl_opportunity_id,
            agreement.client_name, agreement.client_email, agreement.client_phone,
            agreement.service_name, amount,
            qboInvoiceId, qboInvoiceNumber,
            'sent',
            dbContact?.fbclid || null, dbContact?.gclid || null,
            dbContact?.ip_address || null, dbContact?.user_agent || null,
            agreement.submitted_by
          ]
        );
        invoiceId = invoiceResult.rows[0]?.id;
      } catch (e) {
        console.error('Failed to store invoice record:', e.message);
      }

      // Link invoice back to agreement
      await query(
        `UPDATE agreements SET invoice_id = $1, updated_at = NOW() WHERE id = $2`,
        [invoiceId, agreement.id]
      );
    }

    // --- Create ClickFunnels order for 2CC ---
    try {
      const cfContact = await cfFindOrCreateContact({
        email: agreement.client_email,
        name: agreement.client_name,
        phone: agreement.client_phone
      });

      if (cfContact) {
        const order = await createExternalOrder({
          contactId: cfContact.id,
          serviceName: agreement.service_name,
          amount: amount,
          originId: `pandadoc-${pandadocId}`
        });

        if (order && invoiceId) {
          await query(`UPDATE invoices SET cf_order_id = $1, updated_at = NOW() WHERE id = $2`, [order.id, invoiceId]);

          const cfInvoice = await createOrderInvoice({
            orderId: order.id,
            amount: amount,
            status: 'open'
          });
          if (cfInvoice) {
            await query(`UPDATE invoices SET cf_invoice_id = $1, updated_at = NOW() WHERE id = $2`, [cfInvoice.id, invoiceId]);
          }
        }
      }
    } catch (cfError) {
      console.error('CF order creation failed:', cfError.message);
    }

    // --- Fire Meta CAPI InitiateCheckout ---
    if (agreement.contact_id) {
      const contactResult = await query(`SELECT * FROM contacts WHERE id = $1`, [agreement.contact_id]);
      const contact = contactResult.rows[0];

      if (contact?.fbclid || contact?.email) {
        fireMetaEvent({
          eventName: 'InitiateCheckout',
          email: agreement.client_email,
          fbclid: contact?.fbclid,
          ip: contact?.ip_address,
          userAgent: contact?.user_agent,
          contactId: contact?.id,
          value: amount,
          currency: 'USD'
        }).then(r => {
          if (r) logConversion({ contactId: contact.id, eventName: 'InitiateCheckout', source: 'meta_capi', status: 'sent', requestPayload: r.eventData, responsePayload: r.result });
        }).catch(e => console.error('Meta CAPI InitiateCheckout failed:', e.message));
      }

      // --- Fire Google Ads PROCUREMENT ---
      if (contact?.gclid) {
        uploadClickConversion({
          gclid: contact.gclid,
          conversionAction: 'PROCUREMENT',
          conversionValue: amount,
          contactId: contact.id
        }).then(r => {
          if (r) logConversion({ contactId: contact.id, eventName: 'PROCUREMENT', source: 'google_ads', status: r.ok ? 'sent' : 'failed', requestPayload: r.requestBody, responsePayload: r.result });
        }).catch(e => console.error('Google Ads PROCUREMENT failed:', e.message));
      }
    }

    console.log(`Agreement ${agreement.id} signed. QBO invoice ${qboInvoiceNumber || 'N/A'} created and sent to ${agreement.client_email}.`);

  } catch (error) {
    console.error(`Failed to process signed agreement ${pandadocId}:`, error);
  }
}
