// Top navigation bar with masterclass module row
// Returns modules so pages can reuse without a second fetch
async function initTopnav(activePage, activeSlug) {
  var el = document.getElementById('topnav');
  if (!el) return [];

  // Render the main nav bar immediately (no waiting for modules)
  el.innerHTML =
    '<div class="topnav-main">' +
      '<a href="/dashboard" class="topnav-brand">' +
        '<img src="/logo.png" alt="Scale Enterprises">' +
        '<span>Scale Enterprises</span>' +
      '</a>' +
      '<a href="/dashboard" class="topnav-link' + (activePage === 'library' ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>' +
        '<span>Library</span>' +
      '</a>' +
      '<a href="/audiobook" class="topnav-link' + (activePage === 'audiobook' ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>' +
        '<span>Audio</span>' +
      '</a>' +
      '<a href="https://book.scaleenterprises.com/transformation-booking-page" target="_blank" class="topnav-link">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
        '<span>Custom Buildout</span>' +
      '</a>' +
      '<a href="#" class="topnav-link" id="inviteBtn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' +
        '<span>Invite</span>' +
      '</a>' +
      '<div class="topnav-right">' +
        '<a href="/profile" class="topnav-link' + (activePage === 'profile' ? ' active' : '') + '">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '<span>Profile</span>' +
        '</a>' +
        '<a href="#" class="topnav-link" id="logoutLink">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
          '<span>Logout</span>' +
        '</a>' +
      '</div>' +
    '</div>' +
    '<div class="masterclass-bar" id="masterclassBar"></div>';

  // Set topnav height as CSS variable for main content padding
  requestAnimationFrame(function() {
    document.documentElement.style.setProperty('--topnav-height', el.offsetHeight + 'px');
  });

  // Logout handler
  document.getElementById('logoutLink').addEventListener('click', async function(e) {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.href = '/';
  });

  // Invite Friends modal
  document.getElementById('inviteBtn').addEventListener('click', function(e) {
    e.preventDefault();
    openInviteModal();
  });

  // Fetch modules and render masterclass bar
  var modules = [];
  try {
    var res = await fetch('/api/modules', { credentials: 'same-origin' });
    if (res.ok) {
      var data = await res.json();
      modules = data.modules || [];
    }
  } catch {}

  var bar = document.getElementById('masterclassBar');
  if (bar) {
    bar.innerHTML = modules.map(function(m) {
      var classes = 'mc-link';
      if (activeSlug === m.slug) classes += ' active';
      if (m.completed) classes += ' completed';
      return '<a href="/module?slug=' + m.slug + '" class="' + classes + '">' + m.title + '</a>';
    }).join('');

    // Update height now that bar is populated
    requestAnimationFrame(function() {
      document.documentElement.style.setProperty('--topnav-height', el.offsetHeight + 'px');
    });
  }

  return modules;
}

function openInviteModal() {
  if (document.getElementById('inviteModal')) {
    document.getElementById('inviteModal').classList.add('open');
    return;
  }

  var courseUrl = 'https://course.scaleenterprises.com/setup';

  var overlay = document.createElement('div');
  overlay.id = 'inviteModal';
  overlay.className = 'invite-overlay open';
  overlay.innerHTML =
    '<div class="invite-card">' +
      '<button class="invite-close" id="inviteClose">&times;</button>' +
      '<div class="invite-icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' +
      '</div>' +
      '<h2>Invite Friends to the Masterclass</h2>' +
      '<p class="invite-sub">Share the Enterprise Masterclass with other business owners who are ready to scale.</p>' +
      '<div class="invite-section">' +
        '<label>Your Referral Link</label>' +
        '<div class="invite-link-row">' +
          '<input type="text" value="' + courseUrl + '" readonly id="inviteLinkInput">' +
          '<button id="copyLinkBtn">Copy</button>' +
        '</div>' +
      '</div>' +
      '<div class="invite-section">' +
        '<label>Share Via</label>' +
        '<div class="invite-share-row">' +
          '<a href="mailto:?subject=Free Enterprise Masterclass&body=Check out this free Enterprise Masterclass from Scale Enterprises: ' + encodeURIComponent(courseUrl) + '" class="invite-share-btn email">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg> Email' +
          '</a>' +
          '<a href="sms:?body=Check out this free Enterprise Masterclass from Scale Enterprises: ' + courseUrl + '" class="invite-share-btn sms">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Text' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<div class="invite-section">' +
        '<label>Quick Message to Copy</label>' +
        '<div class="invite-message">' +
          'Hey! I\'ve been going through the Enterprise Masterclass from Scale Enterprises and it\'s been super valuable. It covers vision, marketing, finance, AI, and more — all for free. Check it out: ' + courseUrl +
        '</div>' +
        '<button class="invite-copy-msg" id="copyMsgBtn">Copy Message</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('inviteClose').addEventListener('click', function() {
    overlay.classList.remove('open');
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  document.getElementById('copyLinkBtn').addEventListener('click', function() {
    var input = document.getElementById('inviteLinkInput');
    input.select();
    navigator.clipboard.writeText(input.value).then(function() {
      document.getElementById('copyLinkBtn').textContent = 'Copied!';
      setTimeout(function() { document.getElementById('copyLinkBtn').textContent = 'Copy'; }, 2000);
    });
  });

  document.getElementById('copyMsgBtn').addEventListener('click', function() {
    var msg = document.querySelector('.invite-message').textContent;
    navigator.clipboard.writeText(msg).then(function() {
      document.getElementById('copyMsgBtn').textContent = 'Copied!';
      setTimeout(function() { document.getElementById('copyMsgBtn').textContent = 'Copy Message'; }, 2000);
    });
  });
}
