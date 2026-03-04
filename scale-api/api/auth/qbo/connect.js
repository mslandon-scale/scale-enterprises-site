const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = (process.env.QBO_CLIENT_ID || '').trim();
  const redirectUri = (process.env.QBO_REDIRECT_URI || '').trim();

  if (!clientId || !redirectUri) {
    return res.status(500).json({ error: 'QBO_CLIENT_ID and QBO_REDIRECT_URI must be configured' });
  }

  const state = crypto.randomUUID();

  const authUrl = new URL('https://appcenter.intuit.com/connect/oauth2');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'com.intuit.quickbooks.accounting');
  authUrl.searchParams.set('state', state);

  res.writeHead(302, { Location: authUrl.toString() });
  res.end();
};
