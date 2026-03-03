const GHL_API_BASE = 'https://services.leadconnectorhq.com';

// Map our field names to GHL custom field IDs
const CUSTOM_FIELD_MAP = {
  revenue: 'TmUBqPRq0wSUZligBqR1',
  service_business: '3U7kfvPQ96jyEpoIUVkF',
  visitor_id: 'KPg1Ws6KmdhQc8sTTTa4',
  utm_source_first: '59IsWTe3ggr7dgQCtwMK',
  utm_medium_first: 'gmahX6eiNVr2YbOBkS2A',
  utm_campaign_first: 'tUZ6hZGM3bI5HZlZCjJf',
  utm_source_last: '5ZXmiTGukb9MuyxztMF5',
  utm_medium_last: 'TUeVHlBrnadHgXtQfEnI',
  utm_campaign_last: 'QyEnOJ5Z9TbSSBjWa9bW',
  fbclid: 'qQHuJMPVcMfRWfvCrUrt',
  dream_outcome: '95zpN9oLWPe8hqBrUd1N',
  bottleneck: '9DbOYULgLr634oO6doIn',
  why_now: 'nJAmn4osieLTfP2CyXWl',
  cost_of_inaction: 'MJZSBUHmRzvyULUfLslc',
  why_you: 'pFf3san0U1uxRdmpK86f',
  past_attempts: 'cNqNPUDYBIIsAi4029zi',
  objections: 'vcInWmPsH9Vavtk44IKv'
};

function formatCustomFields(fields) {
  if (!fields || typeof fields !== 'object') return [];
  const result = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined) continue;
    const fieldId = CUSTOM_FIELD_MAP[key];
    if (fieldId) {
      result.push({ id: fieldId, field_value: String(value) });
    }
  }
  return result;
}

async function ghlFetch(path, method, body) {
  const apiKey = (process.env.GHL_API_KEY || '').trim();
  const response = await fetch(`${GHL_API_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
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
  const locationId = (process.env.GHL_LOCATION_ID || '').trim();
  if (!(process.env.GHL_API_KEY || '').trim() || !locationId) {
    console.warn('GHL not configured — skipping contact creation');
    return null;
  }

  // Check if contact already exists
  let existingContact = null;
  try {
    const lookup = await ghlFetch(
      `/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}`,
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
    locationId,
    email,
    firstName,
    lastName,
    phone,
    tags,
    customFields: formatCustomFields(customFields)
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
  const pipelineId = (process.env.GHL_PIPELINE_ID || '').trim();
  if (pipelineStage && pipelineId) {
    const stageEnvKey = `GHL_STAGE_${pipelineStage.toUpperCase()}`;
    const stageId = (process.env[stageEnvKey] || '').trim();
    if (stageId) {
      try {
        await ghlFetch(`/opportunities/`, 'POST', {
          pipelineId,
          pipelineStageId: stageId,
          locationId,
          contactId: contactId,
          name: `${firstName} ${lastName} - Application`.trim(),
          status: 'open'
        });
      } catch (e) {
        console.error('Failed to create opportunity:', e.message);
      }
    }
  }

  return contactId;
}

async function updateContactFields(contactId, customFields) {
  return ghlFetch(`/contacts/${contactId}`, 'PUT', {
    customFields: formatCustomFields(customFields)
  });
}

async function lookupContactByEmail(email) {
  try {
    const locationId = (process.env.GHL_LOCATION_ID || '').trim();
    const result = await ghlFetch(
      `/contacts/?locationId=${locationId}&query=${encodeURIComponent(email)}`,
      'GET'
    );
    return result.contacts?.[0] || null;
  } catch (e) {
    return null;
  }
}

async function findOpportunityByContact(ghlContactId) {
  const locationId = (process.env.GHL_LOCATION_ID || '').trim();
  const pipelineId = (process.env.GHL_PIPELINE_ID || '').trim();
  if (!locationId || !pipelineId) return null;

  try {
    const result = await ghlFetch(
      `/opportunities/search?location_id=${locationId}&pipeline_id=${pipelineId}&contact_id=${ghlContactId}`,
      'GET'
    );
    return result.opportunities?.[0] || null;
  } catch (e) {
    console.error('Failed to find opportunity:', e.message);
    return null;
  }
}

async function updateOpportunityStage(opportunityId, stageId, monetaryValue) {
  const body = { pipelineStageId: stageId };
  if (monetaryValue !== undefined) body.monetaryValue = monetaryValue;
  return ghlFetch(`/opportunities/${opportunityId}`, 'PUT', body);
}

async function createOpportunity({ contactId, name, stageId, monetaryValue }) {
  const locationId = (process.env.GHL_LOCATION_ID || '').trim();
  const pipelineId = (process.env.GHL_PIPELINE_ID || '').trim();

  return ghlFetch(`/opportunities/`, 'POST', {
    pipelineId,
    pipelineStageId: stageId,
    locationId,
    contactId,
    name,
    monetaryValue: monetaryValue || 0,
    status: 'open'
  });
}

module.exports = {
  createOrUpdateContact, updateContactFields, lookupContactByEmail,
  findOpportunityByContact, updateOpportunityStage, createOpportunity,
  ghlFetch
};
