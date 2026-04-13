// Auth guard — include on every protected page
// Checks /api/auth/me and redirects to login if not authenticated
(async function() {
  try {
    const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Not authenticated');
    const user = await res.json();
    window.__user = user;
    document.dispatchEvent(new CustomEvent('auth:ready', { detail: user }));
  } catch {
    window.location.href = '/';
  }
})();
