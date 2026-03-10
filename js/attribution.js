(function() {
  'use strict';

  // --- Visitor ID (cookie-based, 2-year expiry) ---
  function getOrCreateVisitorId() {
    var match = document.cookie.match(/(^|;\s*)_se_vid=([^;]+)/);
    if (match) return match[2];
    var vid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    var expires = new Date(Date.now() + 730 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = '_se_vid=' + vid + '; expires=' + expires + '; path=/; SameSite=Lax';
    return vid;
  }

  // --- Parse URL params ---
  function getParam(name) {
    var match = window.location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  // --- Capture current attribution data ---
  var utmParams = {
    utm_source: getParam('utm_source'),
    utm_medium: getParam('utm_medium'),
    utm_campaign: getParam('utm_campaign'),
    utm_content: getParam('utm_content'),
    utm_term: getParam('utm_term')
  };

  var clickIds = {
    fbclid: getParam('fbclid'),
    gclid: getParam('gclid'),
    msclkid: getParam('msclkid')
  };

  var sessionData = {
    referrer: document.referrer || null,
    landing_page: window.location.href,
    timestamp: new Date().toISOString()
  };

  var visitorId = getOrCreateVisitorId();

  // --- Determine if this visit has trackable attribution ---
  var hasUtms = Object.keys(utmParams).some(function(k) { return utmParams[k] !== null; });
  var hasClickIds = Object.keys(clickIds).some(function(k) { return clickIds[k] !== null; });
  var hasAttribution = hasUtms || hasClickIds;

  // --- First-touch: store only once (never overwrite) ---
  if (!localStorage.getItem('_se_first_touch')) {
    localStorage.setItem('_se_first_touch', JSON.stringify({
      utms: utmParams,
      click_ids: clickIds,
      referrer: sessionData.referrer,
      landing_page: sessionData.landing_page,
      timestamp: sessionData.timestamp
    }));
  }

  // --- Last-touch: overwrite only when real attribution data is present ---
  if (hasAttribution) {
    localStorage.setItem('_se_last_touch', JSON.stringify({
      utms: utmParams,
      click_ids: clickIds,
      referrer: sessionData.referrer,
      landing_page: sessionData.landing_page,
      timestamp: sessionData.timestamp
    }));
  }

  // --- Public API: called by form handlers to get all attribution data ---
  window.SE_getAttribution = function() {
    var firstTouch = JSON.parse(localStorage.getItem('_se_first_touch') || '{}');
    var lastTouch = JSON.parse(localStorage.getItem('_se_last_touch') || '{}');
    // Include A/B test assignments if available
    var abAssignments = window.__SE_AB_ASSIGNMENTS || null;
    if (!abAssignments) {
      var abMatch = document.cookie.match(/(^|;\s*)_se_ab=([^;]+)/);
      if (abMatch) { try { abAssignments = JSON.parse(decodeURIComponent(abMatch[2])); } catch(e) {} }
    }
    return {
      visitor_id: visitorId,
      first_touch: firstTouch,
      last_touch: lastTouch,
      current_page: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      ab_variants: abAssignments
    };
  };
})();
