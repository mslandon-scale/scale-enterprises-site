const { query } = require('../lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'GET only' });

  const results = [];
  try {
    await query(`CREATE TABLE IF NOT EXISTS agreements (
      id SERIAL PRIMARY KEY,
      contact_id INTEGER REFERENCES contacts(id),
      ghl_contact_id VARCHAR(64),
      ghl_opportunity_id VARCHAR(64),
      client_name VARCHAR(255) NOT NULL,
      client_email VARCHAR(255) NOT NULL,
      client_phone VARCHAR(32),
      service_name VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      pandadoc_id VARCHAR(64),
      invoice_id INTEGER REFERENCES invoices(id),
      status VARCHAR(32) NOT NULL DEFAULT 'draft',
      signed_at TIMESTAMPTZ,
      submitted_by VARCHAR(255),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);
    results.push('agreements: created');
  } catch (e) { results.push('agreements: ' + e.message); }

  try {
    await query('CREATE INDEX IF NOT EXISTS idx_agreements_pandadoc_id ON agreements(pandadoc_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_agreements_client_email ON agreements(client_email)');
    await query('CREATE INDEX IF NOT EXISTS idx_agreements_status ON agreements(status)');
    results.push('indexes: created');
  } catch (e) { results.push('indexes: ' + e.message); }

  return res.status(200).json({ results });
};
