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
      '<a href="#" class="topnav-link" id="enterprise360Btn">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>' +
        '<span>Enterprise 360</span>' +
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

  // Enterprise 360 Coming Soon
  document.getElementById('enterprise360Btn').addEventListener('click', function(e) {
    e.preventDefault();
    openComingSoonModal();
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
  // If modal already exists, just re-open and refresh stats
  if (document.getElementById('inviteModal')) {
    document.getElementById('inviteModal').classList.add('open');
    loadReferralStats();
    return;
  }

  var overlay = document.createElement('div');
  overlay.id = 'inviteModal';
  overlay.className = 'invite-overlay open';
  overlay.innerHTML =
    '<div class="invite-card">' +
      '<button class="invite-close" id="inviteClose">&times;</button>' +
      '<div class="invite-icon">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>' +
      '</div>' +
      '<h2>Invite Friends — Win Enterprise 360</h2>' +
      '<p class="invite-sub" id="inviteCountdown" style="color:var(--gold);font-weight:600;"></p>' +
      '<p class="invite-sub">Share your referral link. The top referrer wins a full Enterprise 360 business transformation — for free.</p>' +

      // Stats row
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.5rem;margin-bottom:1.25rem;" id="inviteStats">' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.75rem 0.5rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.25rem;color:var(--gold);" id="statClicks">—</div>' +
          '<div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.15rem;">Link Clicks</div>' +
        '</div>' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.75rem 0.5rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.25rem;color:var(--gold);" id="statRegs">—</div>' +
          '<div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.15rem;">Registrations</div>' +
        '</div>' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.75rem 0.5rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.25rem;color:var(--gold);" id="statRank">—</div>' +
          '<div style="font-size:0.65rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.15rem;">Your Rank</div>' +
        '</div>' +
      '</div>' +

      '<div class="invite-section">' +
        '<label>Your Referral Link</label>' +
        '<div class="invite-link-row">' +
          '<input type="text" value="" readonly id="inviteLinkInput" placeholder="Loading...">' +
          '<button id="copyLinkBtn">Copy</button>' +
        '</div>' +
      '</div>' +
      '<div class="invite-section">' +
        '<label>Share Via</label>' +
        '<div class="invite-share-row">' +
          '<a href="#" id="shareEmail" class="invite-share-btn email">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg> Email' +
          '</a>' +
          '<a href="#" id="shareTwitter" class="invite-share-btn" target="_blank">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> Post' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<div class="invite-section">' +
        '<label>Quick Message to Copy</label>' +
        '<div class="invite-message" id="inviteMessage">' +
          'Hey! I\'ve been going through the Enterprise Masterclass from Scale Enterprises and it\'s been super valuable. It covers vision, marketing, finance, AI, and more — all for free. Check it out: ' +
        '</div>' +
        '<button class="invite-copy-msg" id="copyMsgBtn">Copy Message</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  // Update campaign countdown
  updateCountdown();

  // Load stats and referral code
  loadReferralStats();

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
    var msg = document.getElementById('inviteMessage').textContent;
    navigator.clipboard.writeText(msg).then(function() {
      document.getElementById('copyMsgBtn').textContent = 'Copied!';
      setTimeout(function() { document.getElementById('copyMsgBtn').textContent = 'Copy Message'; }, 2000);
    });
  });
}

function updateCountdown() {
  var endDate = new Date('2026-07-12T23:59:59');
  var now = new Date();
  var diff = endDate - now;
  var el = document.getElementById('inviteCountdown');
  if (!el) return;

  if (diff <= 0) {
    el.textContent = 'Campaign has ended';
    return;
  }

  var days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  el.textContent = days + ' days left — ends July 12, 2026';
}

function loadReferralStats() {
  fetch('/api/referrals/my-stats', { credentials: 'same-origin' })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.referralCode) {
        var url = 'https://course.scaleenterprises.com/register?ref=' + data.referralCode;
        var linkInput = document.getElementById('inviteLinkInput');
        if (linkInput) linkInput.value = url;

        // Update share links
        var emailLink = document.getElementById('shareEmail');
        if (emailLink) emailLink.href = 'mailto:?subject=Free Enterprise Masterclass&body=Check out this free Enterprise Masterclass from Scale Enterprises: ' + encodeURIComponent(url);

        var twitterLink = document.getElementById('shareTwitter');
        if (twitterLink) twitterLink.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent('I\'ve been going through the Enterprise Masterclass from Scale Enterprises — vision, marketing, finance, AI, and more. All free. Check it out: ' + url);

        // Update quick message
        var msgEl = document.getElementById('inviteMessage');
        if (msgEl) msgEl.textContent = 'Hey! I\'ve been going through the Enterprise Masterclass from Scale Enterprises and it\'s been super valuable. It covers vision, marketing, finance, AI, and more — all for free. Check it out: ' + url;
      }

      // Update stat numbers
      var clicksEl = document.getElementById('statClicks');
      if (clicksEl) clicksEl.textContent = data.linkClicks || 0;

      var regsEl = document.getElementById('statRegs');
      if (regsEl) regsEl.textContent = data.registrations || 0;

      var rankEl = document.getElementById('statRank');
      if (rankEl) rankEl.textContent = '#' + (data.rank || 1);
    })
    .catch(function() {});
}

function openComingSoonModal() {
  if (document.getElementById('comingSoonModal')) {
    document.getElementById('comingSoonModal').classList.add('open');
    return;
  }

  var overlay = document.createElement('div');
  overlay.id = 'comingSoonModal';
  overlay.className = 'invite-overlay open';
  overlay.innerHTML =
    '<div class="invite-card" style="max-width:380px;text-align:center;">' +
      '<button class="invite-close" id="csClose">&times;</button>' +
      '<div style="margin-bottom:1rem;">' +
        '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
      '</div>' +
      '<h2 style="font-family:Sora,sans-serif;font-size:1.3rem;margin-bottom:0.5rem;">Coming Soon</h2>' +
      '<p style="color:var(--muted);font-size:0.95rem;margin-bottom:1.25rem;">Enterprise 360 is launching soon. Stay tuned.</p>' +
      '<button class="btn-gold" id="csGotIt" style="width:auto;padding:0.6rem 2rem;">Got It</button>' +
    '</div>';

  document.body.appendChild(overlay);

  document.getElementById('csClose').addEventListener('click', function() {
    overlay.classList.remove('open');
  });
  document.getElementById('csGotIt').addEventListener('click', function() {
    overlay.classList.remove('open');
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });
}
