const jwt = require('jsonwebtoken');

function parseCookies(req) {
  const cookie = req.headers.cookie || '';
  return Object.fromEntries(
    cookie.split(';').map(c => {
      const [k, ...v] = c.trim().split('=');
      return [k, v.join('=')];
    })
  );
}

function getUser(req) {
  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return null;
  try {
    return jwt.verify(token, (process.env.JWT_SECRET || '').trim());
  } catch {
    return null;
  }
}

function createToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email },
    (process.env.JWT_SECRET || '').trim(),
    { expiresIn: '7d' }
  );
}

function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie',
    `token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}`
  );
}

function clearAuthCookie(res) {
  res.setHeader('Set-Cookie',
    `token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`
  );
}

module.exports = { getUser, createToken, setAuthCookie, clearAuthCookie };
