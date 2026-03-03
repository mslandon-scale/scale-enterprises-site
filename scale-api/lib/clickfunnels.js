function getCfBase() {
  const subdomain = (process.env.CF_SUBDOMAIN || '').trim();
  return `https://${subdomain}.myclickfunnels.com/api/v2`;
}

function getWorkspaceId() {
  return (process.env.CF_WORKSPACE_ID || '').trim();
}

async function cfFetch(path, method, body) {
  const token = (process.env.CF_API_TOKEN || '').trim();
  if (!token) {
    console.warn('ClickFunnels not configured — skipping');
    return null;
  }

  const response = await fetch(`${getCfBase()}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`CF API ${method} ${path} failed: ${response.status} ${text}`);
  }

  return response.json();
}

// --- Contact Management ---

async function findContactByEmail(email) {
  const wsId = getWorkspaceId();
  const result = await cfFetch(
    `/workspaces/${wsId}/contacts?email=${encodeURIComponent(email)}`,
    'GET'
  );
  return result?.[0] || null;
}

async function createContact({ email, firstName, lastName, phone }) {
  const wsId = getWorkspaceId();
  return cfFetch(`/workspaces/${wsId}/contacts`, 'POST', {
    contact: {
      email,
      first_name: firstName || '',
      last_name: lastName || '',
      phone_number: phone || ''
    }
  });
}

async function findOrCreateContact({ email, name, phone }) {
  const existing = await findContactByEmail(email);
  if (existing) return existing;

  const nameParts = (name || '').trim().split(/\s+/);
  return createContact({
    email,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    phone
  });
}

// --- External Orders ---

async function createExternalOrder({ contactId, serviceName, amount, originId }) {
  const wsId = getWorkspaceId();
  return cfFetch(`/workspaces/${wsId}/orders`, 'POST', {
    order: {
      contact_id: contactId,
      origination_type: 'external',
      origin_id: originId || undefined,
      line_items: [{
        name: serviceName,
        price: Math.round(amount * 100), // CF expects cents
        quantity: 1
      }]
    }
  });
}

// --- Invoices on Orders ---

async function createOrderInvoice({ orderId, amount, status }) {
  const wsId = getWorkspaceId();
  return cfFetch(`/workspaces/${wsId}/orders/${orderId}/invoices`, 'POST', {
    invoice: {
      amount: Math.round(amount * 100), // cents
      status: status || 'open'
    }
  });
}

async function updateInvoiceStatus(invoiceId, status) {
  const wsId = getWorkspaceId();
  return cfFetch(`/workspaces/${wsId}/invoices/${invoiceId}`, 'PUT', {
    invoice: { status }
  });
}

module.exports = {
  findOrCreateContact,
  createExternalOrder,
  createOrderInvoice,
  updateInvoiceStatus,
  cfFetch
};
