const { query } = require('../../../lib/db');
const { getUser } = require('../../../lib/auth');
const { setCors, handlePreflight } = require('../../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = getUser(req);
  if (!decoded) return res.status(401).json({ error: 'Not authenticated' });

  const { slug } = req.query;

  try {
    const modResult = await query(
      'SELECT id FROM course_modules WHERE slug = $1 AND is_published = true',
      [slug]
    );
    if (modResult.rows.length === 0) return res.status(404).json({ error: 'Module not found' });
    const moduleId = modResult.rows[0].id;

    const result = await query(
      `SELECT id, title, type, url, content, sort_order
       FROM course_resources
       WHERE module_id = $1
       ORDER BY sort_order, created_at`,
      [moduleId]
    );

    return res.status(200).json({
      resources: result.rows.map(r => ({
        id: r.id,
        title: r.title,
        type: r.type,
        url: r.url,
        content: r.content,
        sortOrder: r.sort_order
      }))
    });
  } catch (err) {
    console.error('Resources error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
