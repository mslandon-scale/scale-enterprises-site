(function() {
  'use strict';

  var API_BASE = 'https://scale-enterprises-site.vercel.app';

  // --- Read/write the _se_ab cookie ---
  function getAbCookie() {
    var match = document.cookie.match(/(^|;\s*)_se_ab=([^;]+)/);
    if (!match) return {};
    try { return JSON.parse(decodeURIComponent(match[2])); } catch(e) { return {}; }
  }

  function setAbCookie(assignments) {
    var expires = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = '_se_ab=' + encodeURIComponent(JSON.stringify(assignments)) + '; expires=' + expires + '; path=/; SameSite=Lax';
  }

  // --- Weighted random selection ---
  function pickVariant(variants) {
    var totalWeight = 0;
    for (var i = 0; i < variants.length; i++) totalWeight += variants[i].weight;
    var rand = Math.random() * totalWeight;
    var cumulative = 0;
    for (var j = 0; j < variants.length; j++) {
      cumulative += variants[j].weight;
      if (rand < cumulative) return variants[j];
    }
    return variants[0];
  }

  // --- Get visitor ID from existing cookie ---
  function getVisitorId() {
    var match = document.cookie.match(/(^|;\s*)_se_vid=([^;]+)/);
    return match ? match[2] : null;
  }

  // --- Get URL param ---
  function getParam(name) {
    var match = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  var currentPath = window.location.pathname;
  var visitorId = getVisitorId();
  var assignments = getAbCookie();
  var changed = false;
  var currentVariant = null;

  // --- A/B Test Logic ---
  var tests = window.__AB_TESTS || [];
  for (var t = 0; t < tests.length; t++) {
    var test = tests[t];

    var isTestPage = false;
    for (var v = 0; v < test.variants.length; v++) {
      if (currentPath === test.variants[v].path || currentPath === test.variants[v].path.replace(/\.html$/, '') || currentPath + 'index.html' === test.variants[v].path) {
        isTestPage = true;
        break;
      }
    }
    if (currentPath === '/' && test.original_path === '/index.html') isTestPage = true;
    if (!isTestPage) continue;

    if (!assignments[test.test_id]) {
      var picked = pickVariant(test.variants);
      assignments[test.test_id] = picked.id;
      changed = true;
    }

    var assignedVariantId = assignments[test.test_id];
    currentVariant = assignedVariantId;

    var assignedPath = null;
    for (var a = 0; a < test.variants.length; a++) {
      if (test.variants[a].id === assignedVariantId) {
        assignedPath = test.variants[a].path;
        break;
      }
    }

    if (assignedPath) {
      var onCorrectPage = currentPath === assignedPath ||
        (currentPath === '/' && assignedPath === '/index.html') ||
        (currentPath === assignedPath.replace(/\.html$/, ''));

      if (!onCorrectPage) {
        if (changed) setAbCookie(assignments);
        window.location.replace(assignedPath + window.location.search);
        return;
      }
    }

    // Fire AB pageview
    if (visitorId) {
      try {
        navigator.sendBeacon(API_BASE + '/api/ab?route=event', JSON.stringify({
          test_id: test.test_id,
          variant_id: assignedVariantId,
          visitor_id: visitorId,
          event_type: 'pageview'
        }));
      } catch(e) {}
    }
  }

  if (changed) setAbCookie(assignments);
  window.__SE_AB_ASSIGNMENTS = assignments;

  // --- Page View Tracking ---
  try {
    navigator.sendBeacon(API_BASE + '/api/pageview', JSON.stringify({
      visitor_id: visitorId,
      page_path: currentPath,
      page_title: document.title,
      referrer: document.referrer || null,
      utm_source: getParam('utm_source'),
      utm_medium: getParam('utm_medium'),
      utm_campaign: getParam('utm_campaign'),
      ab_variant: currentVariant
    }));
  } catch(e) {}
})();
