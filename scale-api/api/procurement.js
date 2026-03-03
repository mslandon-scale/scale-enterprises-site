const { query, logConversion } = require('../lib/db');
const { setCors } = require('../lib/cors');
const { findOrCreateCustomer, createInvoice } = require('../lib/qbo');
const { findOrCreateContact: cfFindOrCreateContact, createExternalOrder, createOrderInvoice } = require('../lib/clickfunnels');
const { lookupContactByEmail, findOpportunityByContact, updateOpportunityStage, createOpportunity } = require('../lib/ghl');
const { fireMetaEvent } = require('../lib/meta-capi');
const { uploadClickConversion } = require('../lib/google-ads');

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
    if (!client?.email || !client?.name || !deal?.service_name || !deal?.amount) {
      return res.status(400).json({ error: 'Missing required fields: client.email, client.name, deal.service_name, deal.amount' });
    }

    const amount = parseFloat(deal.amount);
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid deal amount' });
    }

    // Look up existing contact in our DB for attribution data
    let dbContact = null;
    try {
      const result = await query(
        `SELECT * FROM contacts WHERE email = $1 ORDER BY created_at DESC LIMIT 1`,
        [client.email]
      );
      dbContact = result.rows[0] || null;
    } catch (e) { /* no existing contact */ }

    // --- QuickBooks: Create customer + invoice ---
    let qboCustomerId = null;
    let qboInvoiceId = null;
    let qboInvoiceNumber = null;

    try {
      const qboCustomer = await findOrCreateCustomer({
        name: client.name,
        email: client.email,
        phone: client.phone
      });
      qboCustomerId = qboCustomer.Id;

      const invoiceResult = await createInvoice({
        customerId: qboCustomerId,
        customerEmail: client.email,
        serviceName: deal.service_name,
        amount: amount,
        dueDate: deal.due_date || null
      });

      const invoice = invoiceResult.Invoice;
      qboInvoiceId = invoice.Id;
      qboInvoiceNumber = invoice.DocNumber;
    } catch (qboError) {
      console.error('QBO invoice creation failed:', qboError.message);
      return res.status(500).json({ error: 'Failed to create QuickBooks invoice', detail: qboError.message });
    }

    // --- ClickFunnels: External order for 2CC ---
    let cfOrderId = null;
    let cfInvoiceId = null;

    try {
      const cfContact = await cfFindOrCreateContact({
        email: client.email,
        name: client.name,
        phone: client.phone
      });

      if (cfContact) {
        const order = await createExternalOrder({
          contactId: cfContact.id,
          serviceName: deal.service_name,
          amount: amount,
          originId: `qbo-${qboInvoiceId}`
        });

        if (order) {
          cfOrderId = order.id;
          const cfInvoice = await createOrderInvoice({
            orderId: order.id,
            amount: amount,
            status: 'open'
          });
          if (cfInvoice) cfInvoiceId = cfInvoice.id;
        }
      }
    } catch (cfError) {
      console.error('ClickFunnels order creation failed:', cfError.message);
      // Non-blocking — continue even if CF fails
    }

    // --- GHL: Update opportunity to Procurement ---
    let ghlContactId = dbContact?.ghl_contact_id || null;
    let ghlOpportunityId = null;

    try {
      // Find GHL contact
      if (!ghlContactId) {
        const ghlContact = await lookupContactByEmail(client.email);
        if (ghlContact) ghlContactId = ghlContact.id;
      }

      if (ghlContactId) {
        const stageId = (process.env.GHL_STAGE_PROCUREMENT || '').trim();
        if (stageId) {
          // Try to find existing opportunity
          const existingOpp = await findOpportunityByContact(ghlContactId);
          if (existingOpp) {
            await updateOpportunityStage(existingOpp.id, stageId, amount);
            ghlOpportunityId = existingOpp.id;
          } else {
            const opp = await createOpportunity({
              contactId: ghlContactId,
              name: `${client.name} - ${deal.service_name}`,
              stageId: stageId,
              monetaryValue: amount
            });
            ghlOpportunityId = opp?.opportunity?.id;
          }
        }
      }
    } catch (ghlError) {
      console.error('GHL opportunity update failed:', ghlError.message);
    }

    // --- Store invoice record ---
    let invoiceId = null;
    try {
      const result = await query(
        `INSERT INTO invoices (contact_id, ghl_contact_id, ghl_opportunity_id, client_name, client_email, client_phone, service_name, amount, notes, qbo_customer_id, qbo_invoice_id, qbo_invoice_number, cf_order_id, cf_invoice_id, status, fbclid, gclid, ip_address, user_agent, submitted_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
         RETURNING id`,
        [
          dbContact?.id || null, ghlContactId, ghlOpportunityId,
          client.name, client.email, client.phone || null,
          deal.service_name, amount, deal.notes || null,
          qboCustomerId, qboInvoiceId, qboInvoiceNumber,
          cfOrderId, cfInvoiceId,
          'sent',
          dbContact?.fbclid || null, dbContact?.gclid || null,
          dbContact?.ip_address || null, dbContact?.user_agent || null,
          submitted_by || null
        ]
      );
      invoiceId = result.rows[0]?.id;
    } catch (dbError) {
      console.error('Failed to store invoice record:', dbError.message);
    }

    // --- Fire Meta CAPI InitiateCheckout (non-blocking) ---
    if (dbContact?.fbclid || dbContact?.email) {
      fireMetaEvent({
        eventName: 'InitiateCheckout',
        email: client.email,
        phone: client.phone,
        fbclid: dbContact?.fbclid,
        ip: dbContact?.ip_address,
        userAgent: dbContact?.user_agent,
        contactId: dbContact?.id,
        value: amount,
        currency: 'USD'
      }).then(result => {
        if (result) logConversion({ contactId: dbContact.id, eventName: 'InitiateCheckout', source: 'meta_capi', status: 'sent', requestPayload: result.eventData, responsePayload: result.result });
      }).catch(err => {
        console.error('Meta CAPI InitiateCheckout failed:', err.message);
      });
    }

    // --- Fire Google Ads PROCUREMENT conversion (non-blocking) ---
    if (dbContact?.gclid) {
      uploadClickConversion({
        gclid: dbContact.gclid,
        conversionAction: 'PROCUREMENT',
        conversionValue: amount,
        contactId: dbContact.id
      }).then(result => {
        if (result) logConversion({ contactId: dbContact.id, eventName: 'PROCUREMENT', source: 'google_ads', status: result.ok ? 'sent' : 'failed', requestPayload: result.requestBody, responsePayload: result.result });
      }).catch(err => {
        console.error('Google Ads PROCUREMENT failed:', err.message);
      });
    }

    return res.status(200).json({
      success: true,
      invoice_id: invoiceId,
      qbo_invoice_id: qboInvoiceId,
      qbo_invoice_number: qboInvoiceNumber,
      cf_order_id: cfOrderId,
      message: `Invoice created and sent to ${client.email}`
    });

  } catch (error) {
    console.error('Procurement endpoint error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
