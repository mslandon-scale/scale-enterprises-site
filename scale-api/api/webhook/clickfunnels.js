const { lookupContactByEmail, updateContactFields, findOpportunityByContact, updateOpportunityStage } = require('../../lib/ghl');

const BOOKED_STAGE_ID = '3d8cf309-9ceb-432d-8aa7-ccd9ec252211';

function formatAppointment(isoString, tzid) {
  const tz = tzid || 'America/New_York';
  const date = new Date(isoString);

  const dateFmt = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: tz
  }).format(date);

  const timeParts = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: tz
  }).formatToParts(date);

  const hour = timeParts.find(p => p.type === 'hour').value;
  const minute = timeParts.find(p => p.type === 'minute').value;
  const dayPeriod = timeParts.find(p => p.type === 'dayPeriod').value.toUpperCase();

  // Get short timezone abbreviation (e.g. "EST", "EDT", "CT", "PT")
  const tzAbbr = new Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
    timeZone: tz
  }).formatToParts(date).find(p => p.type === 'timeZoneName').value;

  return {
    appointment_date: dateFmt,
    appointment_time: `${hour}:${minute} ${dayPeriod} ${tzAbbr}`
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = (process.env.CF_WEBHOOK_SECRET || '').trim();
  if (!secret || req.query.secret !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { data, event_type } = req.body || {};

    if (!event_type ||
        (!event_type.includes('scheduled_event.created') &&
         !event_type.includes('scheduled_event.rescheduled'))) {
      console.log('CF webhook: ignoring event_type', event_type);
      return res.status(200).json({ message: 'Event type not tracked' });
    }

    // Log full payload to discover all available fields (especially meeting link)
    console.log('CF webhook full payload:', JSON.stringify(req.body, null, 2));

    const email = data?.primary_contact?.email_address;
    const startOn = data?.start_on;

    if (!email || !startOn) {
      console.warn('CF webhook: missing email or start_on');
      return res.status(200).json({ message: 'Missing email or start_on' });
    }

    const { appointment_date, appointment_time } = formatAppointment(startOn, data.tzid);
    console.log(`CF webhook: ${email} booked for ${appointment_date} at ${appointment_time}`);

    // Look up GHL contact
    const contact = await lookupContactByEmail(email);
    if (!contact) {
      console.warn(`CF webhook: no GHL contact found for ${email}`);
      return res.status(200).json({ message: 'Contact not found in GHL' });
    }

    // Update custom fields with appointment info
    await updateContactFields(contact.id, { appointment_date, appointment_time });
    console.log(`CF webhook: updated fields for contact ${contact.id}`);

    // Move opportunity to Booked stage
    const opportunity = await findOpportunityByContact(contact.id);
    if (opportunity) {
      await updateOpportunityStage(opportunity.id, BOOKED_STAGE_ID);
      console.log(`CF webhook: moved opportunity ${opportunity.id} to Booked`);
    } else {
      console.warn(`CF webhook: no opportunity found for contact ${contact.id}`);
    }

    return res.status(200).json({ success: true, contactId: contact.id });
  } catch (err) {
    console.error('CF webhook error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
