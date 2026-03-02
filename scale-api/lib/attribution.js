function normalizeAttribution(attr) {
  if (!attr || typeof attr !== 'object') {
    return {
      visitor_id: null,
      first_touch: {},
      last_touch: {},
      current_page: null,
      user_agent: null
    };
  }

  return {
    visitor_id: attr.visitor_id || null,
    first_touch: attr.first_touch || {},
    last_touch: attr.last_touch || {},
    current_page: attr.current_page || null,
    user_agent: attr.user_agent || null
  };
}

// Extract the best available click ID (prefer last-touch, fall back to first-touch)
function getClickId(attr, type) {
  return attr.last_touch?.click_ids?.[type] || attr.first_touch?.click_ids?.[type] || null;
}

module.exports = { normalizeAttribution, getClickId };
