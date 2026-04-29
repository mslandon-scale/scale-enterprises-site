const { query } = require('../../lib/db');
const { createToken, setAuthCookie } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { credential, referralCode } = req.body || {};
  if (!credential) {
    return res.status(400).json({ error: 'Missing Google credential' });
  }

  try {
    // Verify the Google ID token by calling Google's tokeninfo endpoint
    const verifyRes = await fetch(
      'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(credential)
    );

    if (!verifyRes.ok) {
      return res.status(401).json({ error: 'Invalid Google token' });
    }

    const payload = await verifyRes.json();

    // Verify the audience matches our client ID
    const clientId = (process.env.GOOGLE_CLIENT_ID || '').trim();
    if (payload.aud !== clientId) {
      return res.status(401).json({ error: 'Token audience mismatch' });
    }

    const email = payload.email.toLowerCase();
    const firstName = payload.given_name || '';
    const lastName = payload.family_name || '';

    // Check if user already exists
    let result = await query(
      'SELECT id, email, first_name, last_name FROM course_users WHERE email = $1',
      [email]
    );

    let user;

    let isNewUser = false;

    if (result.rows.length > 0) {
      // Existing user — log them in
      user = result.rows[0];
    } else {
      // New user — create account (no password needed for Google sign-in)
      // Use a random hash so the password field isn't empty but can't be used to login
      const randomHash = '$2a$10$' + require('crypto').randomBytes(30).toString('base64').slice(0, 53);

      result = await query(
        `INSERT INTO course_users (email, password_hash, first_name, last_name)
         VALUES ($1, $2, $3, $4)
         RETURNING id, email, first_name, last_name, referral_code`,
        [email, randomHash, firstName, lastName]
      );
      user = result.rows[0];
      isNewUser = true;
    }

    // Process referral for new users
    if (isNewUser && referralCode) {
      try {
        const referrer = await query('SELECT id FROM course_users WHERE referral_code = $1', [referralCode]);
        if (referrer.rows.length > 0 && referrer.rows[0].id !== user.id) {
          await query(
            'INSERT INTO referrals (referrer_id, referred_id) VALUES ($1, $2) ON CONFLICT (referred_id) DO NOTHING',
            [referrer.rows[0].id, user.id]
          );
        }
      } catch (refErr) {
        console.error('Referral tracking error:', refErr.message);
      }
    }

    const token = createToken(user);
    setAuthCookie(res, token);

    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (err) {
    console.error('Google auth error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
