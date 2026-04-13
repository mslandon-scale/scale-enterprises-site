const { query } = require('../../lib/db');
const { getUser } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = getUser(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const result = await query(
      'SELECT id, email, first_name, last_name, annual_revenue, industry, created_at FROM course_users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    return res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      annualRevenue: user.annual_revenue || '',
      industry: user.industry || '',
      createdAt: user.created_at
    });
  } catch (err) {
    console.error('Auth check error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
