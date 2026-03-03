const { hashSha256 } = require('./hash');

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const API_VERSION = 'v19.0';

async function fireMetaEvent({ eventName, email, phone, fbclid, ip, userAgent, sourceUrl, eventId, contactId, value, currency }) {
  if (!ACCESS_TOKEN || !PIXEL_ID) {
    console.warn('Meta CAPI not configured — skipping', eventName);
    return null;
  }

  const userData = {};
  if (email) userData.em = [hashSha256(email.toLowerCase().trim())];
  if (phone) userData.ph = [hashSha256(phone.replace(/\D/g, ''))];
  if (ip) userData.client_ip_address = ip;
  if (userAgent) userData.client_user_agent = userAgent;
  if (fbclid) userData.fbc = 'fb.1.' + Date.now() + '.' + fbclid;
  if (contactId) userData.external_id = [hashSha256(contactId.toString())];

  const eventEntry = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId || undefined,
    action_source: 'website',
    event_source_url: sourceUrl || 'https://scaleenterprises.com',
    user_data: userData
  };

  if (value !== undefined && value !== null) {
    eventEntry.custom_data = {
      value: parseFloat(value),
      currency: currency || 'USD'
    };
  }

  const eventData = { data: [eventEntry] };

  const response = await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    }
  );

  const result = await response.json();
  if (!response.ok) {
    throw new Error(`Meta CAPI ${eventName} failed: ${JSON.stringify(result)}`);
  }

  return { eventData, result };
}

module.exports = {
  fireMetaLeadEvent: (params) => fireMetaEvent({ ...params, eventName: 'Lead' }),
  fireMetaScheduleEvent: (params) => fireMetaEvent({ ...params, eventName: 'Schedule' }),
  fireMetaContactEvent: (params) => fireMetaEvent({ ...params, eventName: 'Contact' }),
  fireMetaPurchaseEvent: (params) => fireMetaEvent({ ...params, eventName: 'Purchase' }),
  fireMetaEvent
};
