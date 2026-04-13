const bcrypt = require('bcryptjs');
const { query } = require('../../lib/db');
const { getUser } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = getUser(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { currentPassword, newPassword } = req.body || {};

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters' });
  }

  try {
    const result = await query(
      'SELECT password_hash FROM course_users WHERE id = $1',
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const valid = await bcrypt.compare(currentPassword, result.rows[0].password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await query(
      'UPDATE course_users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [newHash, decoded.userId]
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Password change error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
