const { query } = require('../../lib/db');
const { setCors } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = (process.env.AB_ADMIN_KEY || '').trim();
  if (!adminKey || req.headers.authorization !== `Bearer ${adminKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { action, test_id, test_name, original_path, variants, status } = req.body || {};

    if (action === 'create') {
      if (!test_id || !test_name || !original_path || !variants || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Missing required fields: test_id, test_name, original_path, variants' });
      }

      // Validate variants
      for (const v of variants) {
        if (!v.id || !v.path || typeof v.weight !== 'number') {
          return res.status(400).json({ error: 'Each variant needs: id, path, weight' });
        }
      }

      await query(
        `INSERT INTO ab_tests (test_id, test_name, status, original_path, variants)
         VALUES ($1, $2, 'active', $3, $4)
         ON CONFLICT (test_id) DO UPDATE SET test_name = $2, original_path = $3, variants = $4, updated_at = NOW()`,
        [test_id, test_name, original_path, JSON.stringify(variants)]
      );

      return res.status(200).json({ success: true, message: 'Test created' });
    }

    if (action === 'update_status') {
      if (!test_id || !status) {
        return res.status(400).json({ error: 'Missing test_id or status' });
      }
      if (!['active', 'paused', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Status must be active, paused, or completed' });
      }

      await query(
        `UPDATE ab_tests SET status = $1, updated_at = NOW() WHERE test_id = $2`,
        [status, test_id]
      );

      return res.status(200).json({ success: true, message: 'Status updated' });
    }

    if (action === 'update_weights') {
      if (!test_id || !variants || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Missing test_id or variants' });
      }

      const existing = await query(`SELECT variants FROM ab_tests WHERE test_id = $1`, [test_id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Test not found' });
      }

      const currentVariants = existing.rows[0].variants;
      for (const update of variants) {
        const match = currentVariants.find(v => v.id === update.id);
        if (match) match.weight = update.weight;
      }

      await query(
        `UPDATE ab_tests SET variants = $1, updated_at = NOW() WHERE test_id = $2`,
        [JSON.stringify(currentVariants), test_id]
      );

      return res.status(200).json({ success: true, message: 'Weights updated' });
    }

    if (action === 'delete') {
      if (!test_id) return res.status(400).json({ error: 'Missing test_id' });
      await query(`DELETE FROM ab_events WHERE test_id = $1`, [test_id]);
      await query(`DELETE FROM ab_tests WHERE test_id = $1`, [test_id]);
      return res.status(200).json({ success: true, message: 'Test deleted' });
    }

    return res.status(400).json({ error: 'Unknown action. Use: create, update_status, update_weights, delete' });
  } catch (err) {
    console.error('AB admin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
