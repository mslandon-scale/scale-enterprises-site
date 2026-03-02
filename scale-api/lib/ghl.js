const GHL_API_BASE = 'https://services.leadconnectorhq.com';

async function ghlFetch(path, method, body) {
  const response = await fetch(`${GHL_API_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GHL API ${method} ${path} failed: ${response.status} ${text}`);
  }

  return response.json();
}

async function createOrUpdateContact({ email, name, phone, tags, customFields, pipelineStage }) {
  if (!process.env.GHL_API_KEY || !process.env.GHL_LOCATION_ID) {
    console.warn('GHL not configured — skipping contact creation');
    return null;
  }

  // Check if contact already exists
  let existingContact = null;
  try {
    const lookup = await ghlFetch(
      `/contacts/lookup?email=${encodeURIComponent(email)}&locationId=${process.env.GHL_LOCATION_ID}`,
      'GET'
    );
    existingContact = lookup.contacts?.[0];
  } catch (e) {
    // Contact doesn't exist
  }

  const nameParts = (name || '').trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const contactData = {
    locationId: process.env.GHL_LOCATION_ID,
    email,
    firstName,
    lastName,
    phone,
    tags,
    customField: customFields
  };

  let contactId;

  if (existingContact) {
    await ghlFetch(`/contacts/${existingContact.id}`, 'PUT', contactData);
    contactId = existingContact.id;
  } else {
    const result = await ghlFetch('/contacts/', 'POST', contactData);
    contactId = result.contact.id;
  }

  // Add to pipeline if specified
  if (pipelineStage && process.env.GHL_PIPELINE_ID) {
    const stageEnvKey = `GHL_STAGE_${pipelineStage.toUpperCase()}`;
    const stageId = process.env[stageEnvKey];
    if (stageId) {
      try {
        await ghlFetch(`/contacts/${contactId}/pipeline`, 'PUT', {
          pipelineId: process.env.GHL_PIPELINE_ID,
          stageId: stageId
        });
      } catch (e) {
        console.error('Failed to set pipeline stage:', e.message);
      }
    }
  }

  return contactId;
}

async function updateContactFields(contactId, customFields) {
  return ghlFetch(`/contacts/${contactId}`, 'PUT', {
    customField: customFields
  });
}

async function lookupContactByEmail(email) {
  try {
    const result = await ghlFetch(
      `/contacts/lookup?email=${encodeURIComponent(email)}&locationId=${process.env.GHL_LOCATION_ID}`,
      'GET'
    );
    return result.contacts?.[0] || null;
  } catch (e) {
    return null;
  }
}

module.exports = { createOrUpdateContact, updateContactFields, lookupContactByEmail, ghlFetch };
