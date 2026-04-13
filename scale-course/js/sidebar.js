// Sidebar component — builds the sidebar from module data
async function initSidebar(activePage) {
  const user = window.__user;
  if (!user) return;

  let modules = [];
  try {
    const res = await fetch('/api/modules', { credentials: 'same-origin' });
    if (res.ok) {
      const data = await res.json();
      modules = data.modules || [];
    }
  } catch {}

  const completedCount = modules.filter(m => m.completed).length;

  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="sidebar-brand-top">
        <img src="/logo.png" alt="Scale Enterprises">
        <span class="sidebar-brand-name">Scale Enterprises</span>
      </div>
      <div class="sidebar-brand-title">Enterprise Masterclass</div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">Menu</div>
      <a href="/dashboard" class="sidebar-link ${activePage === 'dashboard' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M8 7h8"/><path d="M8 11h6"/></svg>
        Masterclass Library
      </a>
      <a href="/audiobook" class="sidebar-link ${activePage === 'audiobook' ? 'active' : ''}">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>
        Audio Version
      </a>

      <div class="sidebar-section-label" style="margin-top:1rem">Masterclasses (${completedCount}/${modules.length})</div>
      ${modules.map((m, i) => `
        <a href="/module?slug=${m.slug}" class="sidebar-link ${activePage === m.slug ? 'active' : ''}">
          <span class="check ${m.completed ? 'done' : ''}">${m.completed ? '&#10003;' : ''}</span>
          ${m.title}
        </a>
      `).join('')}
    </nav>
    <div class="sidebar-cta">
      <a href="https://book.scaleenterprises.com/transformation-booking-page" target="_blank">Book Your Custom Build-Out</a>
    </div>
    <div class="sidebar-footer">
      <a href="#" id="logoutLink">Logout</a>
    </div>
  `;

  // Logout handler
  document.getElementById('logoutLink').addEventListener('click', async function(e) {
    e.preventDefault();
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    window.location.href = '/';
  });

  // Mobile toggle
  const hamburger = document.querySelector('.hamburger');
  const overlay = document.querySelector('.sidebar-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', function() {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }
}
