const { query } = require('../../lib/db');
const { setCors } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const adminKey = (process.env.AB_ADMIN_KEY || '').trim();
  if (!adminKey || req.headers.authorization !== `Bearer ${adminKey}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const testId = req.query.test_id;

    // Get all tests or a specific one
    const testsResult = testId
      ? await query(`SELECT * FROM ab_tests WHERE test_id = $1`, [testId])
      : await query(`SELECT * FROM ab_tests ORDER BY created_at DESC`);

    const tests = testsResult.rows;

    // Get aggregated events for each test
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
        return {
          id: v.id,
          path: v.path,
          weight: v.weight,
          views,
          conversions,
          rate: Math.round(rate * 100) / 100
        };
      });

      // Calculate significance (z-test for two proportions)
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
            // Two-tailed p-value approximation
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
        test_id: test.test_id,
        test_name: test.test_name,
        status: test.status,
        original_path: test.original_path,
        created_at: test.created_at,
        variants,
        significance
      });
    }

    return res.status(200).json({ tests: results });
  } catch (err) {
    console.error('AB results error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
