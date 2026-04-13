const { Pool } = require('pg');

let pool;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: (process.env.POSTGRES_URL || process.env.PRISMA_DATABASE_URL || '').trim(),
      ssl: { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function query(text, params) {
  const result = await getPool().query(text, params);
  return result;
}

module.exports = { query };
