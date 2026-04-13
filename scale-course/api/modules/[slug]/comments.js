const { query } = require('../../../lib/db');
const { getUser } = require('../../../lib/auth');
const { setCors, handlePreflight } = require('../../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

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

    if (req.method === 'GET') {
      const result = await query(
        `SELECT c.id, c.content, c.created_at,
                u.first_name, u.last_name
         FROM course_comments c
         JOIN course_users u ON u.id = c.user_id
         WHERE c.module_id = $1
         ORDER BY c.created_at DESC`,
        [moduleId]
      );
      return res.status(200).json({
        comments: result.rows.map(r => ({
          id: r.id,
          content: r.content,
          createdAt: r.created_at,
          author: r.first_name + ' ' + r.last_name.charAt(0) + '.',
          isOwn: false
        }))
      });
    }

    if (req.method === 'POST') {
      const { content } = req.body || {};
      if (!content || !content.trim()) {
        return res.status(400).json({ error: 'Comment cannot be empty' });
      }
      await query(
        'INSERT INTO course_comments (user_id, module_id, content) VALUES ($1, $2, $3)',
        [decoded.userId, moduleId, content.trim()]
      );
      return res.status(201).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Comments error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
