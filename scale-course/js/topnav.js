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
        '<div class="topnav-brand-text"><span>The Enterprise Playbook</span><small>by Scale Enterprises</small></div>' +
      '</a>' +
      '<a href="/dashboard" class="topnav-link' + (activePage === 'library' ? ' active' : '') + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>' +
        '<span>Dashboard</span>' +
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
    bar.innerHTML = modules.map(function(m, i) {
      var classes = 'mc-link';
      var unlocked = i === 0 || modules[i - 1].completed;
      if (activeSlug === m.slug) classes += ' active';
      if (m.completed) classes += ' completed';
      if (!unlocked && !m.completed) classes += ' mc-locked';
      return '<a href="' + (unlocked || m.completed ? '/' + m.slug : '#') + '" class="' + classes + '"' + (!unlocked && !m.completed ? ' data-locked="true"' : '') + '>' + ((!unlocked && !m.completed) ? '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="margin-right:3px;vertical-align:-1px;"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' : '') + m.title + '</a>';
    }).join('') + '<a href="#" class="mc-link" id="mcE360Link" style="color:var(--gold);">Enterprise 360</a>';

    bar.addEventListener('click', function(e) {
      var link = e.target.closest('[data-locked]');
      if (link) { e.preventDefault(); }
      var mcLink = e.target.closest('.mc-link');
      if (mcLink) centerMcLink(bar, mcLink);
    });

    var activeLink = bar.querySelector('.mc-link.active');
    if (activeLink) {
      requestAnimationFrame(function() { centerMcLink(bar, activeLink); });
    }

    document.getElementById('mcE360Link').addEventListener('click', function(e) {
      e.preventDefault();
      openComingSoonModal();
    });

    // Update height now that bar is populated
    requestAnimationFrame(function() {
      document.documentElement.style.setProperty('--topnav-height', el.offsetHeight + 'px');
    });
  }

  return modules;
}

function isModuleLocked(modules, slug) {
  var idx = modules.findIndex(function(m) { return m.slug === slug; });
  if (idx <= 0) return false;
  return !modules[idx - 1].completed;
}

function openInviteModal() {
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
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>' +
      '</div>' +
      '<h2>Win Enterprise 360</h2>' +
      '<p style="font-family:Sora,sans-serif;font-size:1.25rem;font-weight:800;color:var(--gold);margin:0.15rem 0 0.35rem;">$100,000 of Value — Free.</p>' +
      '<p class="invite-sub" id="inviteCountdown" style="color:var(--gold);font-weight:600;"></p>' +
      '<p class="invite-sub">Enterprise 360 is the full business transformation program &mdash; 30 days, every system installed, two guarantees or you don\'t pay. The <strong style="color:var(--white);">top referrer</strong> wins the entire program for free. Share your link. Climb the ranks.</p>' +

      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:0.4rem;margin-bottom:0.75rem;" id="inviteStats">' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.5rem 0.35rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.1rem;color:var(--gold);" id="statClicks">&mdash;</div>' +
          '<div style="font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.1rem;">Link Clicks</div>' +
        '</div>' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.5rem 0.35rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.1rem;color:var(--gold);" id="statRegs">&mdash;</div>' +
          '<div style="font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.1rem;">Signups</div>' +
        '</div>' +
        '<div style="text-align:center;background:var(--surface);border:1px solid rgba(255,255,255,0.08);border-radius:0.5rem;padding:0.5rem 0.35rem;">' +
          '<div style="font-family:Sora,sans-serif;font-weight:700;font-size:1.1rem;color:var(--gold);" id="statRank">&mdash;</div>' +
          '<div style="font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-top:0.1rem;">Your Rank</div>' +
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
        '<div class="invite-share-row" style="flex-wrap:wrap;">' +
          '<a href="#" id="shareFacebook" class="invite-share-btn" target="_blank">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" style="width:15px;height:15px;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> Facebook' +
          '</a>' +
          '<a href="#" id="shareInstagram" class="invite-share-btn" onclick="navigator.clipboard.writeText(document.getElementById(\'inviteLinkInput\').value);this.innerHTML=\'Copied! Paste in IG\';var s=this;setTimeout(function(){s.innerHTML=\'<svg viewBox=&quot;0 0 24 24&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; stroke-width=&quot;2&quot; style=&quot;width:15px;height:15px;&quot;><rect x=&quot;2&quot; y=&quot;2&quot; width=&quot;20&quot; height=&quot;20&quot; rx=&quot;5&quot;/><circle cx=&quot;12&quot; cy=&quot;12&quot; r=&quot;5&quot;/><circle cx=&quot;17.5&quot; cy=&quot;6.5&quot; r=&quot;1.5&quot; fill=&quot;currentColor&quot; stroke=&quot;none&quot;/></svg> Instagram\'},2000);return false;">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> Instagram' +
          '</a>' +
          '<a href="#" id="shareTwitter" class="invite-share-btn" target="_blank">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" style="width:14px;height:14px;"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X' +
          '</a>' +
          '<a href="#" id="shareEmail" class="invite-share-btn">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg> Email' +
          '</a>' +
          '<a href="#" id="shareSMS" class="invite-share-btn">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:15px;height:15px;"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Text' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<div class="invite-section">' +
        '<label>Quick Message to Copy</label>' +
        '<div class="invite-message" id="inviteMessage">' +
          'I just went through The Enterprise Playbook from Scale Enterprises — it breaks down the exact 5-stage framework and 56 elements that every business needs to scale past 7 and 8 figures. It’s free and honestly one of the best things I’ve read on building a real enterprise. Check it out: ' +
        '</div>' +
        '<button class="invite-copy-msg" id="copyMsgBtn">Copy Message</button>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  updateCountdown();
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

        var shareText = 'I just went through The Enterprise Playbook from Scale Enterprises — it breaks down the exact 5-stage framework and 56 elements that every business needs to scale past 7 and 8 figures. It’s completely free: ' + url;

        var emailLink = document.getElementById('shareEmail');
        if (emailLink) emailLink.href = 'mailto:?subject=The Enterprise Playbook — Free from Scale Enterprises&body=' + encodeURIComponent(shareText);

        var twitterLink = document.getElementById('shareTwitter');
        if (twitterLink) twitterLink.href = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(shareText);

        var fbLink = document.getElementById('shareFacebook');
        if (fbLink) fbLink.href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url) + '&quote=' + encodeURIComponent(shareText);

        var smsLink = document.getElementById('shareSMS');
        if (smsLink) smsLink.href = 'sms:?&body=' + encodeURIComponent(shareText);

        var msgEl = document.getElementById('inviteMessage');
        if (msgEl) msgEl.textContent = 'I just went through The Enterprise Playbook from Scale Enterprises — it breaks down the exact 5-stage framework and 56 elements that every business needs to scale past 7 and 8 figures. It’s free and honestly one of the best things I’ve read on building a real enterprise. Check it out: ' + url;
      }

      var clicksEl = document.getElementById('statClicks');
      if (clicksEl) clicksEl.textContent = data.linkClicks || 0;

      var regsEl = document.getElementById('statRegs');
      if (regsEl) regsEl.textContent = data.registrations || 0;

      var rankEl = document.getElementById('statRank');
      if (rankEl) rankEl.textContent = '#' + (data.rank || 1256).toLocaleString();
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

function centerMcLink(bar, link) {
  var barRect = bar.getBoundingClientRect();
  var linkRect = link.getBoundingClientRect();
  var linkCenter = linkRect.left + linkRect.width / 2;
  var barCenter = barRect.left + barRect.width / 2;
  var offset = linkCenter - barCenter;
  bar.scrollBy({ left: offset, behavior: 'smooth' });
}
