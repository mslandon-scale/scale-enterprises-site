const { query } = require('../lib/db');
const { setCors } = require('../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { visitor_id, page_path, page_title, referrer, utm_source, utm_medium, utm_campaign, ab_variant } = req.body || {};

    if (!page_path) {
      return res.status(400).json({ error: 'Missing page_path' });
    }

    await query(
      `INSERT INTO page_views (visitor_id, page_path, page_title, referrer, utm_source, utm_medium, utm_campaign, ab_variant)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [visitor_id || null, page_path, page_title || null, referrer || null,
       utm_source || null, utm_medium || null, utm_campaign || null, ab_variant || null]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Pageview error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
