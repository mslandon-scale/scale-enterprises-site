const crypto = require('crypto');
const { query } = require('../../lib/db');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const emailClean = email.trim().toLowerCase();

  try {
    // Always return success to prevent email enumeration
    const result = await query(
      'SELECT id, first_name FROM course_users WHERE email = $1',
      [emailClean]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: 'If an account with that email exists, we sent a reset link.' });
    }

    const user = result.rows[0];

    // Invalidate any existing tokens for this user
    await query(
      'UPDATE password_reset_tokens SET used = TRUE WHERE user_id = $1 AND used = FALSE',
      [user.id]
    );

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, token, expiresAt]
    );

    // Build reset URL
    const baseUrl = (process.env.COURSE_BASE_URL || 'https://course.scaleenterprises.com').trim();
    const resetUrl = `${baseUrl}/reset-password?token=${token}`;

    // Send email via scale-api (which has GHL configured)
    const scaleApiBase = (process.env.SCALE_API_URL || 'https://scale-enterprises-site.vercel.app').trim();
    const internalKey = (process.env.INTERNAL_API_KEY || '').trim();

    await fetch(`${scaleApiBase}/api/send-reset-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-key': internalKey
      },
      body: JSON.stringify({
        email: emailClean,
        firstName: user.first_name,
        resetUrl
      })
    });

    return res.status(200).json({ message: 'If an account with that email exists, we sent a reset link.' });
  } catch (err) {
    console.error('Forgot password error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
