const pool = require('../db');

const getDashboardStats = async (req, res) => {
  try {
    const [postCount, commentCount, userCount, draftCount, publishedCount] = await Promise.all([
      pool.query('SELECT COUNT(*) FROM posts'),
      pool.query('SELECT COUNT(*) FROM comments'),
      pool.query('SELECT COUNT(*) FROM users'),
      pool.query("SELECT COUNT(*) FROM posts WHERE status = 'draft'"),
      pool.query("SELECT COUNT(*) FROM posts WHERE status = 'published'")
    ]);

    res.json({
      totalPosts: postCount.rows[0].count,
      totalComments: commentCount.rows[0].count,
      totalUsers: userCount.rows[0].count,
      drafts: draftCount.rows[0].count,
      published: publishedCount.rows[0].count
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
};

module.exports = { getDashboardStats };
