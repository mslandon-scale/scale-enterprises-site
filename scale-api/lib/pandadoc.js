const PANDADOC_API = 'https://api.pandadoc.com/public/v1';

function getApiKey() {
  return (process.env.PANDADOC_API_KEY || '').trim();
}

async function pdFetch(path, method, body) {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn('PandaDoc not configured — skipping');
    return null;
  }

  const response = await fetch(`${PANDADOC_API}${path}`, {
    method,
    headers: {
      'Authorization': `API-Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`PandaDoc API ${method} ${path} failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function createDocumentFromTemplate({ templateId, name, recipientEmail, recipientFirstName, recipientLastName, fields }) {
  const docData = {
    name: name || 'Scale Enterprises Agreement',
    template_uuid: templateId,
    recipients: [
      {
        email: recipientEmail,
        first_name: recipientFirstName || '',
        last_name: recipientLastName || '',
        role: 'Client',
        signing_order: 1
      }
    ],
    tokens: []
  };

  // Add field tokens (pre-fill template variables)
  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      if (value !== null && value !== undefined) {
        docData.tokens.push({ name: key, value: String(value) });
      }
    }
  }

  return pdFetch('/documents', 'POST', docData);
}

async function getDocumentStatus(documentId) {
  return pdFetch(`/documents/${documentId}`, 'GET');
}

async function sendDocument(documentId, message) {
  return pdFetch(`/documents/${documentId}/send`, 'POST', {
    message: message || 'Please review and sign the attached agreement.',
    silent: false
  });
}

async function waitForDocumentAndSend(documentId, message, maxAttempts) {
  // PandaDoc needs time to process the document before it can be sent
  const attempts = maxAttempts || 10;
  for (let i = 0; i < attempts; i++) {
    const doc = await getDocumentStatus(documentId);
    if (doc.status === 'document.draft') {
      return sendDocument(documentId, message);
    }
    if (doc.status === 'document.sent' || doc.status === 'document.completed') {
      return doc; // Already sent or signed
    }
    // Wait 2 seconds before checking again
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  throw new Error(`Document ${documentId} did not reach draft status after ${attempts} attempts`);
}

function verifyWebhook(rawBody, signature) {
  // PandaDoc webhook verification uses a shared secret
  const sharedKey = (process.env.PANDADOC_WEBHOOK_SECRET || '').trim();
  if (!sharedKey) return true; // Skip verification if not configured

  const crypto = require('crypto');
  const hash = crypto
    .createHmac('sha256', sharedKey)
    .update(rawBody)
    .digest('hex');
  return hash === signature;
}

module.exports = {
  createDocumentFromTemplate,
  getDocumentStatus,
  sendDocument,
  waitForDocumentAndSend,
  verifyWebhook,
  pdFetch
};
