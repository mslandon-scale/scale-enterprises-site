const API_VERSION = 'v16';

async function getAccessToken() {
  if (!process.env.GOOGLE_ADS_CLIENT_ID || !process.env.GOOGLE_ADS_REFRESH_TOKEN) {
    return null;
  }

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_ADS_CLIENT_ID,
      client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
      refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });

  const data = await response.json();
  return data.access_token;
}

async function uploadClickConversion({ gclid, conversionAction, conversionValue, contactId }) {
  if (!gclid || !process.env.GOOGLE_ADS_DEVELOPER_TOKEN) {
    console.warn('Google Ads not configured or no gclid — skipping', conversionAction);
    return null;
  }

  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  const customerId = process.env.GOOGLE_ADS_CUSTOMER_ID;
  const conversionActionId = process.env[`GOOGLE_ADS_CONV_${conversionAction.toUpperCase()}`];

  if (!conversionActionId) {
    console.warn('No conversion action ID for:', conversionAction);
    return null;
  }

  const requestBody = {
    conversions: [{
      gclid: gclid,
      conversionAction: `customers/${customerId}/conversionActions/${conversionActionId}`,
      conversionDateTime: new Date().toISOString().replace('T', ' ').replace('Z', '+00:00'),
      conversionValue: conversionValue || 0,
      currencyCode: 'USD'
    }],
    partialFailure: true
  };

  const response = await fetch(
    `https://googleads.googleapis.com/${API_VERSION}/customers/${customerId}:uploadClickConversions`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    }
  );

  const result = await response.json();
  return { requestBody, result, ok: response.ok };
}

module.exports = {
  fireGoogleLeadEvent: (params) => uploadClickConversion({ ...params, conversionAction: 'LEAD' }),
  fireGoogleBookEvent: (params) => uploadClickConversion({ ...params, conversionAction: 'BOOKCALL' }),
  fireGoogleShowEvent: (params) => uploadClickConversion({ ...params, conversionAction: 'SHOWEDUP' }),
  fireGooglePurchaseEvent: (params) => uploadClickConversion({ ...params, conversionAction: 'PURCHASE' }),
  uploadClickConversion
};
