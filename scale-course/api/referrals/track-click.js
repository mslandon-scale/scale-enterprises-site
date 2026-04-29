const { query } = require('../../lib/db');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body || {};
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing referral code' });
  }

  try {
    const result = await query(
      'UPDATE course_users SET link_clicks = link_clicks + 1 WHERE referral_code = $1',
      [code.trim()]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Invalid referral code' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Track click error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
