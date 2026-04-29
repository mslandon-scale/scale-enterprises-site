const { query } = require('../../lib/db');
const { getUser } = require('../../lib/auth');
const { setCors, handlePreflight } = require('../../lib/cors');

module.exports = async function handler(req, res) {
  if (handlePreflight(req, res)) return;
  setCors(req, res);

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = getUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  try {
    const userResult = await query(
      'SELECT referral_code, link_clicks FROM course_users WHERE id = $1',
      [user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { referral_code, link_clicks } = userResult.rows[0];

    const regResult = await query(
      'SELECT COUNT(*)::int as count FROM referrals WHERE referrer_id = $1',
      [user.userId]
    );
    const registrations = regResult.rows[0].count;

    var rank;

    if (registrations >= 10) {
      // 10+ referrals: real ranking among all users with 10+ referrals
      const rankResult = await query(
        `SELECT COUNT(DISTINCT referrer_id)::int + 1 as rank
         FROM referrals
         GROUP BY referrer_id
         HAVING COUNT(*) > $1`,
        [registrations]
      );
      rank = rankResult.rows.length > 0 ? rankResult.rows[0].rank : 1;
      if (rank > 100) rank = Math.min(rank, 100);
    } else if (registrations === 0) {
      rank = 1256;
    } else if (registrations === 1) {
      rank = 1256 - 124;
    } else if (registrations === 2) {
      rank = 1256 - 271;
    } else if (registrations === 3) {
      rank = Math.floor(Math.random() * 100 + 401);
    } else {
      // 4-9 referrals: interpolate between 500 and 100
      rank = Math.max(101, Math.round(500 - ((registrations - 3) * (400 / 7))));
    }

    return res.status(200).json({
      referralCode: referral_code,
      linkClicks: link_clicks,
      registrations,
      rank
    });
  } catch (err) {
    console.error('My stats error:', err.message);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
