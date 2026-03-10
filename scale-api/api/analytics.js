const { query } = require('../lib/db');
const { setCors } = require('../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = (process.env.AB_ADMIN_KEY || '').trim();
  if (!adminKey || req.headers.authorization !== `Bearer ${adminKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const days = parseInt(req.query.days) || 30;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    // Page views by page
    const pageViewsResult = await query(
      `SELECT page_path,
        COUNT(*) AS total_views,
        COUNT(DISTINCT visitor_id) AS unique_visitors
      FROM page_views
      WHERE created_at >= $1
      GROUP BY page_path
      ORDER BY total_views DESC`,
      [since]
    );

    // Daily page views
    const dailyResult = await query(
      `SELECT DATE(created_at) AS date,
        COUNT(*) AS views,
        COUNT(DISTINCT visitor_id) AS unique_visitors
      FROM page_views
      WHERE created_at >= $1
      GROUP BY DATE(created_at)
      ORDER BY date DESC`,
      [since]
    );

    // Funnel: landing page views → applications → qualified → not qualified
    const funnelResult = await query(
      `SELECT
        (SELECT COUNT(DISTINCT visitor_id) FROM page_views WHERE page_path IN ('/', '/index.html') AND created_at >= $1) AS landing_views,
        (SELECT COUNT(*) FROM contacts WHERE created_at >= $1) AS total_applications,
        (SELECT COUNT(*) FROM contacts WHERE qualified = true AND created_at >= $1) AS qualified,
        (SELECT COUNT(*) FROM contacts WHERE qualified = false AND created_at >= $1) AS not_qualified`,
      [since]
    );

    // Page views by UTM source
    const utmResult = await query(
      `SELECT
        COALESCE(utm_source, 'direct') AS source,
        COUNT(*) AS views,
        COUNT(DISTINCT visitor_id) AS unique_visitors
      FROM page_views
      WHERE created_at >= $1
      GROUP BY utm_source
      ORDER BY views DESC
      LIMIT 20`,
      [since]
    );

    // Page views by day and page (for funnel over time)
    const funnelDailyResult = await query(
      `SELECT DATE(created_at) AS date, page_path, COUNT(DISTINCT visitor_id) AS unique_visitors
      FROM page_views
      WHERE created_at >= $1 AND page_path IN ('/', '/index.html', '/not-a-fit.html', '/questionnaire.html')
      GROUP BY DATE(created_at), page_path
      ORDER BY date DESC`,
      [since]
    );

    // Recent conversions (applications)
    const recentAppsResult = await query(
      `SELECT name, email, revenue, qualified, created_at
      FROM contacts
      WHERE created_at >= $1
      ORDER BY created_at DESC
      LIMIT 20`,
      [since]
    );

    const funnel = funnelResult.rows[0] || {};

    return res.status(200).json({
      period_days: days,
      pages: pageViewsResult.rows.map(r => ({
        path: r.page_path,
        total_views: parseInt(r.total_views),
        unique_visitors: parseInt(r.unique_visitors)
      })),
      daily: dailyResult.rows.map(r => ({
        date: r.date,
        views: parseInt(r.views),
        unique_visitors: parseInt(r.unique_visitors)
      })),
      funnel: {
        landing_views: parseInt(funnel.landing_views || 0),
        total_applications: parseInt(funnel.total_applications || 0),
        qualified: parseInt(funnel.qualified || 0),
        not_qualified: parseInt(funnel.not_qualified || 0),
        application_rate: parseInt(funnel.landing_views || 0) > 0
          ? Math.round(parseInt(funnel.total_applications || 0) / parseInt(funnel.landing_views || 0) * 10000) / 100
          : 0,
        qualification_rate: parseInt(funnel.total_applications || 0) > 0
          ? Math.round(parseInt(funnel.qualified || 0) / parseInt(funnel.total_applications || 0) * 10000) / 100
          : 0
      },
      traffic_sources: utmResult.rows.map(r => ({
        source: r.source,
        views: parseInt(r.views),
        unique_visitors: parseInt(r.unique_visitors)
      })),
      funnel_daily: funnelDailyResult.rows,
      recent_applications: recentAppsResult.rows
    });
  } catch (err) {
    console.error('Analytics error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
