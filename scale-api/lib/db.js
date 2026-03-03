const { Pool } = require('pg');

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function query(text, params) {
  const result = await getPool().query(text, params);
  return result;
}

async function logConversion({ contactId, eventName, source, status, requestPayload, responsePayload }) {
  try {
    await query(
      `INSERT INTO conversions (contact_id, event_name, source, status, request_payload, response_payload)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [contactId, eventName, source, status, JSON.stringify(requestPayload), JSON.stringify(responsePayload)]
    );
  } catch (e) {
    console.error('Failed to log conversion:', e.message);
  }
}

module.exports = { query, logConversion };
