const { query } = require('../lib/db');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id              SERIAL PRIMARY KEY,
        visitor_id      VARCHAR(64) NOT NULL UNIQUE,
        first_touch     JSONB NOT NULL DEFAULT '{}',
        last_touch      JSONB NOT NULL DEFAULT '{}',
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await query(`CREATE INDEX IF NOT EXISTS idx_visitors_visitor_id ON visitors(visitor_id)`);

    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id              SERIAL PRIMARY KEY,
        visitor_id      VARCHAR(64) REFERENCES visitors(visitor_id),
        ghl_contact_id  VARCHAR(64),
        email           VARCHAR(255) NOT NULL,
        name            VARCHAR(255),
        phone           VARCHAR(32),
        revenue         VARCHAR(32),
        service_business BOOLEAN,
        qualified       BOOLEAN NOT NULL DEFAULT FALSE,
        consent         BOOLEAN NOT NULL DEFAULT FALSE,
        fbclid          VARCHAR(512),
        gclid           VARCHAR(512),
        ip_address      VARCHAR(45),
        user_agent      TEXT,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await query(`CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_contacts_ghl_contact_id ON contacts(ghl_contact_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_contacts_visitor_id ON contacts(visitor_id)`);

    await query(`
      CREATE TABLE IF NOT EXISTS conversions (
        id              SERIAL PRIMARY KEY,
        contact_id      INTEGER REFERENCES contacts(id),
        event_name      VARCHAR(64) NOT NULL,
        source          VARCHAR(32) NOT NULL,
        status          VARCHAR(32) NOT NULL DEFAULT 'sent',
        request_payload JSONB,
        response_payload JSONB,
        created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await query(`CREATE INDEX IF NOT EXISTS idx_conversions_contact_id ON conversions(contact_id)`);
    await query(`CREATE INDEX IF NOT EXISTS idx_conversions_event_name ON conversions(event_name)`);

    return res.status(200).json({ success: true, message: 'All tables created successfully' });

  } catch (error) {
    console.error('Setup error:', error);
    return res.status(500).json({ error: error.message });
  }
};
