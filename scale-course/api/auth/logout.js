const { clearAuthCookie } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  clearAuthCookie(res);
  return res.status(200).json({ ok: true });
};
