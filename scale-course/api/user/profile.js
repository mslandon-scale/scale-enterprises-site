const { query } = require('../../lib/db');
const { getUser } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  const decoded = getUser(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    if (req.method === 'GET') {
      const result = await query(
        'SELECT id, email, first_name, last_name, annual_revenue, industry, created_at FROM course_users WHERE id = $1',
        [decoded.userId]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      const u = result.rows[0];
      return res.status(200).json({
        id: u.id, email: u.email,
        firstName: u.first_name, lastName: u.last_name,
        annualRevenue: u.annual_revenue || '',
        industry: u.industry || '',
        createdAt: u.created_at
      });
    }

    if (req.method === 'PUT') {
      const { firstName, lastName, email, annualRevenue, industry } = req.body || {};
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      const emailClean = email.trim().toLowerCase();

      // Check if email is taken by another user
      const existing = await query(
        'SELECT id FROM course_users WHERE email = $1 AND id != $2',
        [emailClean, decoded.userId]
      );
      if (existing.rows.length > 0) {
        return res.status(409).json({ error: 'Email already in use' });
      }

      await query(
        `UPDATE course_users SET first_name = $1, last_name = $2, email = $3,
         annual_revenue = $4, industry = $5, updated_at = NOW()
         WHERE id = $6`,
        [firstName.trim(), lastName.trim(), emailClean,
         (annualRevenue || '').trim() || null, (industry || '').trim() || null,
         decoded.userId]
      );
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Profile error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
