const { query } = require('../lib/db');
const { setCors } = require('../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const route = req.query.route;

  if (route === 'event') return handleEvent(req, res);
  if (route === 'results') return handleResults(req, res);
  if (route === 'admin') return handleAdmin(req, res);

  return res.status(400).json({ error: 'Unknown route. Use ?route=event|results|admin' });
};

// --- Event tracking ---
async function handleEvent(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { test_id, variant_id, visitor_id, event_type, contact_id } = req.body || {};

    if (!test_id || !variant_id || !event_type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (event_type !== 'pageview' && event_type !== 'conversion') {
      return res.status(400).json({ error: 'Invalid event_type' });
    }

    // Deduplicate pageviews: one per visitor per test per variant
    if (event_type === 'pageview' && visitor_id) {
      const existing = await query(
        `SELECT id FROM ab_events WHERE test_id = $1 AND variant_id = $2 AND visitor_id = $3 AND event_type = 'pageview' LIMIT 1`,
        [test_id, variant_id, visitor_id]
      );
      if (existing.rows.length > 0) {
        return res.status(200).json({ success: true, deduplicated: true });
      }
    }

    await query(
      `INSERT INTO ab_events (test_id, variant_id, visitor_id, event_type, contact_id) VALUES ($1, $2, $3, $4, $5)`,
      [test_id, variant_id, visitor_id || null, event_type, contact_id || null]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('AB event error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// --- Results ---
async function handleResults(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = (process.env.AB_ADMIN_KEY || '').trim();
  if (!adminKey || req.headers.authorization !== `Bearer ${adminKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const testId = req.query.test_id;

    const testsResult = testId
      ? await query(`SELECT * FROM ab_tests WHERE test_id = $1`, [testId])
      : await query(`SELECT * FROM ab_tests ORDER BY created_at DESC`);

    const tests = testsResult.rows;

    const results = [];
    for (const test of tests) {
      const eventsResult = await query(
        `SELECT variant_id,
          COUNT(*) FILTER (WHERE event_type = 'pageview') AS views,
          COUNT(*) FILTER (WHERE event_type = 'conversion') AS conversions
        FROM ab_events
        WHERE test_id = $1
        GROUP BY variant_id`,
        [test.test_id]
      );

      const variants = test.variants.map(v => {
        const stats = eventsResult.rows.find(r => r.variant_id === v.id) || { views: '0', conversions: '0' };
        const views = parseInt(stats.views);
        const conversions = parseInt(stats.conversions);
        const rate = views > 0 ? (conversions / views * 100) : 0;
        return { id: v.id, path: v.path, weight: v.weight, views, conversions, rate: Math.round(rate * 100) / 100 };
      });

      // Z-test for two proportions
      let significance = null;
      if (variants.length === 2) {
        const control = variants[0];
        const variant = variants[1];
        if (control.views > 0 && variant.views > 0) {
          const p1 = control.conversions / control.views;
          const p2 = variant.conversions / variant.views;
          const pPool = (control.conversions + variant.conversions) / (control.views + variant.views);
          const se = Math.sqrt(pPool * (1 - pPool) * (1 / control.views + 1 / variant.views));
          if (se > 0) {
            const z = (p2 - p1) / se;
            const absZ = Math.abs(z);
            const p = Math.exp(-0.717 * absZ - 0.416 * absZ * absZ);
            significance = {
              confidence: Math.round((1 - p) * 10000) / 100,
              winner: z > 0 ? variant.id : control.id,
              improvement: control.rate > 0 ? Math.round((variant.rate - control.rate) / control.rate * 10000) / 100 : null
            };
          }
        }
      }

      results.push({
        test_id: test.test_id, test_name: test.test_name, status: test.status,
        original_path: test.original_path, created_at: test.created_at, variants, significance
      });
    }

    return res.status(200).json({ tests: results });
  } catch (err) {
    console.error('AB results error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// --- Admin ---
async function handleAdmin(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = (process.env.AB_ADMIN_KEY || '').trim();
  if (!adminKey || req.headers.authorization !== `Bearer ${adminKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { action, test_id, test_name, original_path, variants, status } = req.body || {};

    if (action === 'create') {
      if (!test_id || !test_name || !original_path || !variants || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
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
      if (!test_id || !status || !['active', 'paused', 'completed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid test_id or status' });
      }
      await query(`UPDATE ab_tests SET status = $1, updated_at = NOW() WHERE test_id = $2`, [status, test_id]);
      return res.status(200).json({ success: true, message: 'Status updated' });
    }

    if (action === 'update_weights') {
      if (!test_id || !variants || !Array.isArray(variants)) {
        return res.status(400).json({ error: 'Missing test_id or variants' });
      }
      const existing = await query(`SELECT variants FROM ab_tests WHERE test_id = $1`, [test_id]);
      if (existing.rows.length === 0) return res.status(404).json({ error: 'Test not found' });
      const currentVariants = existing.rows[0].variants;
      for (const update of variants) {
        const match = currentVariants.find(v => v.id === update.id);
        if (match) match.weight = update.weight;
      }
      await query(`UPDATE ab_tests SET variants = $1, updated_at = NOW() WHERE test_id = $2`, [JSON.stringify(currentVariants), test_id]);
      return res.status(200).json({ success: true, message: 'Weights updated' });
    }

    if (action === 'delete') {
      if (!test_id) return res.status(400).json({ error: 'Missing test_id' });
      await query(`DELETE FROM ab_events WHERE test_id = $1`, [test_id]);
      await query(`DELETE FROM ab_tests WHERE test_id = $1`, [test_id]);
      return res.status(200).json({ success: true, message: 'Test deleted' });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error('AB admin error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
