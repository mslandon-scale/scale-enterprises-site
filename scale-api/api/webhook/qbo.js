const { query, logConversion } = require('../../lib/db');
const { verifyWebhookSignature, getPayment } = require('../../lib/qbo');
const { updateInvoiceStatus } = require('../../lib/clickfunnels');
const { findOpportunityByContact, updateOpportunityStage } = require('../../lib/ghl');
const { fireMetaEvent } = require('../../lib/meta-capi');
const { uploadClickConversion } = require('../../lib/google-ads');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // QBO sends a verification challenge on webhook setup
  if (req.headers['intuit-signature']) {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!verifyWebhookSignature(rawBody, req.headers['intuit-signature'])) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  }

  // Respond immediately — QBO expects fast response
  res.status(200).json({ ok: true });

  try {
    const payload = req.body;
    const notifications = payload?.eventNotifications || [];

    for (const notification of notifications) {
      const entities = notification?.dataChangeEvent?.entities || [];

      for (const entity of entities) {
        if (entity.name !== 'Payment' || entity.operation !== 'Create') continue;

        await processPayment(entity.id);
      }
    }
  } catch (error) {
    console.error('QBO webhook processing error:', error);
  }
};

async function processPayment(paymentId) {
  try {
    // Fetch full payment details from QBO
    const paymentResult = await getPayment(paymentId);
    const payment = paymentResult?.Payment;
    if (!payment) return;

    // Find linked invoice IDs
    const linkedInvoiceIds = [];
    for (const line of (payment.Line || [])) {
      for (const txn of (line.LinkedTxn || [])) {
        if (txn.TxnType === 'Invoice') {
          linkedInvoiceIds.push(txn.TxnId);
        }
      }
    }

    if (linkedInvoiceIds.length === 0) return;

    // Look up each linked invoice in our DB
    for (const qboInvoiceId of linkedInvoiceIds) {
      const result = await query(
        `SELECT * FROM invoices WHERE qbo_invoice_id = $1 AND status != 'paid' LIMIT 1`,
        [qboInvoiceId]
      );

      const invoice = result.rows[0];
      if (!invoice) continue;

      // Update invoice status to paid
      await query(
        `UPDATE invoices SET status = 'paid', paid_at = NOW(), updated_at = NOW() WHERE id = $1`,
        [invoice.id]
      );

      // Update ClickFunnels invoice to paid
      if (invoice.cf_invoice_id) {
        try {
          await updateInvoiceStatus(invoice.cf_invoice_id, 'paid');
        } catch (e) {
          console.error('CF invoice update failed:', e.message);
        }
      }

      // Move GHL opportunity to Closed
      if (invoice.ghl_contact_id) {
        try {
          const closedStageId = (process.env.GHL_STAGE_CLOSED || '').trim();
          if (closedStageId) {
            const opp = invoice.ghl_opportunity_id
              ? { id: invoice.ghl_opportunity_id }
              : await findOpportunityByContact(invoice.ghl_contact_id);

            if (opp) {
              await updateOpportunityStage(opp.id, closedStageId, parseFloat(invoice.amount));
            }
          }
        } catch (e) {
          console.error('GHL opportunity close failed:', e.message);
        }
      }

      // Fire Meta CAPI Purchase event
      if (invoice.fbclid || invoice.client_email) {
        try {
          const metaResult = await fireMetaEvent({
            eventName: 'Purchase',
            email: invoice.client_email,
            fbclid: invoice.fbclid,
            ip: invoice.ip_address,
            userAgent: invoice.user_agent,
            contactId: invoice.contact_id,
            value: parseFloat(invoice.amount),
            currency: 'USD'
          });
          if (metaResult) {
            await logConversion({
              contactId: invoice.contact_id,
              eventName: 'Purchase',
              source: 'meta_capi',
              status: 'sent',
              requestPayload: metaResult.eventData,
              responsePayload: metaResult.result
            });
          }
        } catch (e) {
          console.error('Meta CAPI Purchase failed:', e.message);
          if (invoice.contact_id) {
            await logConversion({ contactId: invoice.contact_id, eventName: 'Purchase', source: 'meta_capi', status: 'failed', requestPayload: {}, responsePayload: { error: e.message } });
          }
        }
      }

      // Fire Google Ads PURCHASE conversion
      if (invoice.gclid) {
        try {
          const googleResult = await uploadClickConversion({
            gclid: invoice.gclid,
            conversionAction: 'PURCHASE',
            conversionValue: parseFloat(invoice.amount),
            contactId: invoice.contact_id
          });
          if (googleResult && invoice.contact_id) {
            await logConversion({
              contactId: invoice.contact_id,
              eventName: 'PURCHASE',
              source: 'google_ads',
              status: googleResult.ok ? 'sent' : 'failed',
              requestPayload: googleResult.requestBody,
              responsePayload: googleResult.result
            });
          }
        } catch (e) {
          console.error('Google Ads PURCHASE failed:', e.message);
        }
      }

      console.log(`Invoice ${invoice.id} (QBO: ${qboInvoiceId}) marked as paid. Conversions fired.`);
    }
  } catch (error) {
    console.error(`Failed to process payment ${paymentId}:`, error);
  }
}
