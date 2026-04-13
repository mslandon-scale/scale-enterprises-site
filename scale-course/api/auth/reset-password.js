const bcrypt = require('bcryptjs');
const { query } = require('../../lib/db');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, password } = req.body || {};

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    // Find valid, unused, non-expired token
    const result = await query(
      `SELECT t.id, t.user_id FROM password_reset_tokens t
       WHERE t.token = $1 AND t.used = FALSE AND t.expires_at > NOW()`,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'This reset link is invalid or has expired. Please request a new one.' });
    }

    const resetRecord = result.rows[0];
    const passwordHash = await bcrypt.hash(password, 10);

    // Update password and mark token as used
    await query('UPDATE course_users SET password_hash = $1 WHERE id = $2', [passwordHash, resetRecord.user_id]);
    await query('UPDATE password_reset_tokens SET used = TRUE WHERE id = $1', [resetRecord.id]);

    return res.status(200).json({ message: 'Password reset successfully. You can now sign in.' });
  } catch (err) {
    console.error('Reset password error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
