const { query } = require('../lib/db');

module.exports = async function handler(req, res) {
  // Temporary setup endpoint — delete after use
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const results = [];

  try {
    await query(`CREATE TABLE IF NOT EXISTS qbo_tokens (
      id SERIAL PRIMARY KEY,
      access_token TEXT NOT NULL,
      refresh_token TEXT NOT NULL,
      realm_id VARCHAR(64) NOT NULL,
      token_type VARCHAR(32) NOT NULL DEFAULT 'bearer',
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    results.push('qbo_tokens: created');
  } catch (e) {
    results.push('qbo_tokens: ' + e.message);
  }

  try {
    await query(`CREATE TABLE IF NOT EXISTS invoices (
      id SERIAL PRIMARY KEY,
      contact_id INTEGER REFERENCES contacts(id),
      ghl_contact_id VARCHAR(64),
      ghl_opportunity_id VARCHAR(64),
      client_name VARCHAR(255) NOT NULL,
      client_email VARCHAR(255) NOT NULL,
      client_phone VARCHAR(32),
      service_name VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      notes TEXT,
      qbo_customer_id VARCHAR(64),
      qbo_invoice_id VARCHAR(64),
      qbo_invoice_number VARCHAR(64),
      cf_order_id VARCHAR(64),
      cf_invoice_id VARCHAR(64),
      status VARCHAR(32) NOT NULL DEFAULT 'draft',
      paid_at TIMESTAMPTZ,
      fbclid VARCHAR(512),
      gclid VARCHAR(512),
      ip_address VARCHAR(45),
      user_agent TEXT,
      submitted_by VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    results.push('invoices: created');
  } catch (e) {
    results.push('invoices: ' + e.message);
  }

  try {
    await query('CREATE INDEX IF NOT EXISTS idx_invoices_contact_id ON invoices(contact_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_invoices_qbo_invoice_id ON invoices(qbo_invoice_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_invoices_cf_order_id ON invoices(cf_order_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status)');
    await query('CREATE INDEX IF NOT EXISTS idx_invoices_client_email ON invoices(client_email)');
    results.push('indexes: created');
  } catch (e) {
    results.push('indexes: ' + e.message);
  }

  return res.status(200).json({ results });
};
