const { createPool } = require('@vercel/postgres');

const pool = createPool({
  connectionString: process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL_NON_POOLING
});

const sql = pool.sql.bind(pool);

async function logConversion({ contactId, eventName, source, status, requestPayload, responsePayload }) {
  try {
    await sql`
      INSERT INTO conversions (contact_id, event_name, source, status, request_payload, response_payload)
      VALUES (${contactId}, ${eventName}, ${source}, ${status},
        ${JSON.stringify(requestPayload)}, ${JSON.stringify(responsePayload)})
    `;
  } catch (e) {
    console.error('Failed to log conversion:', e.message);
  }
}

module.exports = { sql, logConversion };
