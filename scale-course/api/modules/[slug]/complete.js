const { query } = require('../../../lib/db');
const { getUser } = require('../../../lib/auth');
const { setCors, handlePreflight } = require('../../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const decoded = getUser(req);
  if (!decoded) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { slug } = req.query;

  try {
    const modResult = await query(
      'SELECT id FROM course_modules WHERE slug = $1 AND is_published = true',
      [slug]
    );

    if (modResult.rows.length === 0) {
      return res.status(404).json({ error: 'Module not found' });
    }

    const moduleId = modResult.rows[0].id;

    await query(
      `INSERT INTO course_progress (user_id, module_id, completed, completed_at)
       VALUES ($1, $2, true, NOW())
       ON CONFLICT (user_id, module_id)
       DO UPDATE SET completed = true, completed_at = NOW()`,
      [decoded.userId, moduleId]
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Complete module error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
