const { exchangeCodeForTokens, storeTokens } = require('../../../lib/qbo');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, realmId, error } = req.query;

  if (error) {
    return res.status(400).send(`<html><body><h1>Authorization Failed</h1><p>${error}</p></body></html>`);
  }

  if (!code || !realmId) {
    return res.status(400).send('<html><body><h1>Missing Parameters</h1><p>No authorization code or realmId received.</p></body></html>');
  }

  try {
    const tokenData = await exchangeCodeForTokens(code);

    await storeTokens({
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      realmId: realmId,
      expiresIn: tokenData.expires_in
    });

    res.status(200).send(`
      <html>
      <body style="font-family: sans-serif; text-align: center; padding: 60px;">
        <h1 style="color: #22C55E;">QuickBooks Connected Successfully</h1>
        <p>Your QuickBooks Online account has been linked.</p>
        <p>Realm ID: <strong>${realmId}</strong></p>
        <p>You can close this window now.</p>
      </body>
      </html>
    `);
  } catch (err) {
    console.error('QBO OAuth callback error:', err);
    res.status(500).send(`
      <html>
      <body style="font-family: sans-serif; text-align: center; padding: 60px;">
        <h1 style="color: #EF4444;">Connection Failed</h1>
        <p>${err.message}</p>
      </body>
      </html>
    `);
  }
};
