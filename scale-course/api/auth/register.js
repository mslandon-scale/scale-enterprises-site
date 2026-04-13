const bcrypt = require('bcryptjs');
const { query } = require('../../lib/db');
const { createToken, setAuthCookie } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, firstName, lastName } = req.body || {};

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const emailClean = email.trim().toLowerCase();

  try {
    const existing = await query('SELECT id FROM course_users WHERE email = $1', [emailClean]);
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO course_users (email, password_hash, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id, email, first_name, last_name`,
      [emailClean, passwordHash, firstName.trim(), lastName.trim()]
    );

    const user = result.rows[0];
    const token = createToken(user);
    setAuthCookie(res, token);

    return res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (err) {
    console.error('Registration error:', err.message);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
};
