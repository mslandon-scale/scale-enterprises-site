async function getAccessToken() {
  const tenantId = (process.env.MS_TENANT_ID || '').trim();
  const clientId = (process.env.MS_CLIENT_ID || '').trim();
  const clientSecret = (process.env.MS_CLIENT_SECRET || '').trim();

  if (!tenantId || !clientId || !clientSecret) {
    console.warn('Microsoft Graph not configured');
    return null;
  }

  const response = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default',
      grant_type: 'client_credentials'
    })
  });

  const data = await response.json();
  if (!data.access_token) {
    console.error('Microsoft token error:', data);
    return null;
  }
  return data.access_token;
}

async function getTeamsJoinLink(appointmentStartISO) {
  const token = await getAccessToken();
  if (!token) return null;

  const calendarUser = (process.env.MS_CALENDAR_USER || '').trim();
  if (!calendarUser) return null;

  // Search for calendar events in a 5-minute window around the appointment start
  const start = new Date(new Date(appointmentStartISO).getTime() - 2 * 60 * 1000);
  const end = new Date(new Date(appointmentStartISO).getTime() + 2 * 60 * 1000);

  const params = new URLSearchParams({
    startDateTime: start.toISOString(),
    endDateTime: end.toISOString(),
    $top: '5',
    $select: 'subject,start,onlineMeeting,onlineMeetingUrl,isOnlineMeeting,body'
  });

  const url = `https://graph.microsoft.com/v1.0/users/${calendarUser}/calendarView?${params}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!response.ok) {
    const err = await response.text();
    console.error('Microsoft Graph calendar error:', response.status, err);
    return null;
  }

  const data = await response.json();
  const events = data.value || [];

  for (const event of events) {
    // Check onlineMeeting joinUrl first
    if (event.onlineMeeting?.joinUrl) {
      return event.onlineMeeting.joinUrl;
    }
    // Fallback to onlineMeetingUrl
    if (event.onlineMeetingUrl) {
      return event.onlineMeetingUrl;
    }
    // Last resort: parse Teams link from body
    if (event.body?.content) {
      const match = event.body.content.match(/https:\/\/teams\.microsoft\.com\/l\/meetup-join\/[^\s"<]+/);
      if (match) return match[0];
    }
  }

  console.warn('No Teams link found in calendar events for', appointmentStartISO);
  return null;
}

module.exports = { getTeamsJoinLink };
