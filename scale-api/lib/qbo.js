const crypto = require('crypto');
const { query } = require('./db');

function getBaseUrl() {
  const env = (process.env.QBO_ENVIRONMENT || 'production').trim();
  return env === 'sandbox'
    ? 'https://sandbox-quickbooks.api.intuit.com'
    : 'https://quickbooks.api.intuit.com';
}

function getRealmId() {
  return (process.env.QBO_REALM_ID || '').trim();
}

// --- Token Management ---

async function getStoredTokens() {
  const result = await query('SELECT * FROM qbo_tokens ORDER BY updated_at DESC LIMIT 1');
  return result.rows[0] || null;
}

async function storeTokens({ accessToken, refreshToken, realmId, expiresIn }) {
  const existing = await getStoredTokens();
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  if (existing) {
    await query(
      `UPDATE qbo_tokens SET access_token = $1, refresh_token = $2, realm_id = $3, expires_at = $4, updated_at = NOW() WHERE id = $5`,
      [accessToken, refreshToken, realmId, expiresAt, existing.id]
    );
  } else {
    await query(
      `INSERT INTO qbo_tokens (access_token, refresh_token, realm_id, expires_at) VALUES ($1, $2, $3, $4)`,
      [accessToken, refreshToken, realmId, expiresAt]
    );
  }
}

async function refreshTokens(currentRefreshToken) {
  const clientId = (process.env.QBO_CLIENT_ID || '').trim();
  const clientSecret = (process.env.QBO_CLIENT_SECRET || '').trim();

  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: currentRefreshToken
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`QBO token refresh failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function getAccessToken() {
  const tokens = await getStoredTokens();
  if (!tokens) throw new Error('QBO not connected — run OAuth setup at /api/auth/qbo/connect');

  // If token still valid (with 5-min buffer), return it
  if (new Date(tokens.expires_at) > new Date(Date.now() + 5 * 60 * 1000)) {
    return tokens.access_token;
  }

  // Refresh
  const data = await refreshTokens(tokens.refresh_token);
  await storeTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    realmId: tokens.realm_id,
    expiresIn: data.expires_in
  });

  return data.access_token;
}

// --- QBO API Helpers ---

async function qboFetch(path, method, body) {
  const accessToken = await getAccessToken();
  const realmId = getRealmId();
  const baseUrl = getBaseUrl();

  const response = await fetch(`${baseUrl}/v3/company/${realmId}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`QBO API ${method} ${path} failed: ${response.status} ${text}`);
  }

  return response.json();
}

// --- Customer Management ---

async function findCustomerByEmail(email) {
  const result = await qboFetch(
    `/query?query=${encodeURIComponent(`SELECT * FROM Customer WHERE PrimaryEmailAddr = '${email}' MAXRESULTS 1`)}`,
    'GET'
  );
  return result.QueryResponse?.Customer?.[0] || null;
}

async function createCustomer({ name, email, phone }) {
  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const customerData = {
    DisplayName: name || email,
    GivenName: firstName,
    FamilyName: lastName,
    PrimaryEmailAddr: { Address: email }
  };
  if (phone) customerData.PrimaryPhone = { FreeFormNumber: phone };

  return qboFetch('/customer?minorversion=75', 'POST', customerData);
}

async function findOrCreateCustomer({ name, email, phone }) {
  const existing = await findCustomerByEmail(email);
  if (existing) return existing;
  const result = await createCustomer({ name, email, phone });
  return result.Customer;
}

// --- Invoice Management ---

async function createInvoice({ customerId, customerEmail, serviceName, amount, dueDate }) {
  const serviceItemId = (process.env.QBO_SERVICE_ITEM_ID || '').trim();

  const line = {
    Amount: amount,
    DetailType: 'SalesItemLineDetail',
    Description: serviceName,
    SalesItemLineDetail: {
      Qty: 1,
      UnitPrice: amount
    }
  };

  // Use configured service item if available
  if (serviceItemId) {
    line.SalesItemLineDetail.ItemRef = { value: serviceItemId };
  }

  const invoiceData = {
    CustomerRef: { value: String(customerId) },
    BillEmail: { Address: customerEmail },
    EmailStatus: 'NeedToSend',
    Line: [line]
  };

  if (dueDate) invoiceData.DueDate = dueDate;

  return qboFetch('/invoice?minorversion=75', 'POST', invoiceData);
}

async function sendInvoice(invoiceId, email) {
  return qboFetch(`/invoice/${invoiceId}/send?sendTo=${encodeURIComponent(email)}`, 'POST');
}

async function getInvoice(invoiceId) {
  return qboFetch(`/invoice/${invoiceId}?minorversion=75`, 'GET');
}

async function getPayment(paymentId) {
  return qboFetch(`/payment/${paymentId}?minorversion=75`, 'GET');
}

// --- Webhook Verification ---

function verifyWebhookSignature(rawBody, signature) {
  const verifierToken = (process.env.QBO_WEBHOOK_VERIFIER_TOKEN || '').trim();
  if (!verifierToken) return false;

  const hash = crypto
    .createHmac('sha256', verifierToken)
    .update(rawBody)
    .digest('base64');
  return hash === signature;
}

// --- OAuth2 Exchange ---

async function exchangeCodeForTokens(code) {
  const clientId = (process.env.QBO_CLIENT_ID || '').trim();
  const clientSecret = (process.env.QBO_CLIENT_SECRET || '').trim();
  const redirectUri = (process.env.QBO_REDIRECT_URI || '').trim();

  const response = await fetch('https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`QBO token exchange failed: ${response.status} ${text}`);
  }

  return response.json();
}

module.exports = {
  getAccessToken,
  storeTokens,
  exchangeCodeForTokens,
  findOrCreateCustomer,
  createInvoice,
  sendInvoice,
  getInvoice,
  getPayment,
  verifyWebhookSignature,
  qboFetch
};
