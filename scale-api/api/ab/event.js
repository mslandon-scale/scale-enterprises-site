const { query } = require('../../lib/db');
const { setCors } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { test_id, variant_id, visitor_id, event_type, contact_id } = req.body || {};

    if (!test_id || !variant_id || !event_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (event_type !== 'pageview' && event_type !== 'conversion') {
      return res.status(400).json({ error: 'Invalid event_type' });
    }

    // Deduplicate pageviews: one per visitor per test per variant
    if (event_type === 'pageview' && visitor_id) {
      const existing = await query(
        `SELECT id FROM ab_events WHERE test_id = $1 AND variant_id = $2 AND visitor_id = $3 AND event_type = 'pageview' LIMIT 1`,
        [test_id, variant_id, visitor_id]
      );
      if (existing.rows.length > 0) {
        return res.status(200).json({ success: true, deduplicated: true });
      }
    }

    await query(
      `INSERT INTO ab_events (test_id, variant_id, visitor_id, event_type, contact_id) VALUES ($1, $2, $3, $4, $5)`,
      [test_id, variant_id, visitor_id || null, event_type, contact_id || null]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('AB event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
