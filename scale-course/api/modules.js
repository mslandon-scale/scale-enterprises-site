const { query } = require('../lib/db');
const { getUser } = require('../lib/auth');
const { setCors, handlePreflight } = require('../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = getUser(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const result = await query(
      `SELECT m.id, m.slug, m.title, m.description, m.sort_order, m.video_url, m.is_published,
              m.icon_color, m.audio_url,
              COALESCE(p.completed, false) AS completed,
              p.completed_at
       FROM course_modules m
       LEFT JOIN course_progress p ON p.module_id = m.id AND p.user_id = $1
       WHERE m.is_published = true
       ORDER BY m.sort_order`,
      [decoded.userId]
    );

    const modules = result.rows.map(r => ({
      id: r.id,
      slug: r.slug,
      title: r.title,
      description: r.description,
      sortOrder: r.sort_order,
      hasVideo: !!r.video_url,
      hasAudio: !!r.audio_url,
      iconColor: r.icon_color,
      completed: r.completed,
      completedAt: r.completed_at
    }));

    return res.status(200).json({ modules });
  } catch (err) {
    console.error('Modules fetch error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
