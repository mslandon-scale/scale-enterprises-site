const ALLOWED_ORIGINS = [
  'https://scaleenterprises.com',
  'https://www.scaleenterprises.com'
];

function isAllowedOrigin(origin) {
  if (!origin) return false;
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (origin.endsWith('.myclickfunnels.com')) return true;
  return false;
}

function setCors(req, res) {
  const origin = req.headers.origin;
  if (isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function handleCorsPreflightIfNeeded(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

module.exports = { setCors, handleCorsPreflightIfNeeded, isAllowedOrigin };
