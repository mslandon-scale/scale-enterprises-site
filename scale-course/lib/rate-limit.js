const { query } = require('./db');

// Database-backed rate limiter for serverless
// Creates table on first use, tracks attempts by IP + action
async function rateLimit(req, action, maxAttempts, windowMinutes) {
  var ip = (req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown').split(',')[0].trim();

  try {
    await query(`CREATE TABLE IF NOT EXISTS rate_limits (
      id SERIAL PRIMARY KEY,
      ip VARCHAR(45) NOT NULL,
      action VARCHAR(32) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`);

    await query(
      "DELETE FROM rate_limits WHERE action = $1 AND created_at < NOW() - INTERVAL '" + windowMinutes + " minutes'",
      [action]
    );

    var result = await query(
      'SELECT COUNT(*)::int as attempts FROM rate_limits WHERE ip = $1 AND action = $2',
      [ip, action]
    );

    if (result.rows[0].attempts >= maxAttempts) {
      return { limited: true, remaining: 0 };
    }

    await query(
      'INSERT INTO rate_limits (ip, action) VALUES ($1, $2)',
      [ip, action]
    );

    return { limited: false, remaining: maxAttempts - result.rows[0].attempts - 1 };
  } catch (err) {
    console.error('Rate limit error:', err.message);
    return { limited: false, remaining: maxAttempts };
  }
}

module.exports = { rateLimit };
