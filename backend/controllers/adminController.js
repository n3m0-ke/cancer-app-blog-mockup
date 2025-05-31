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

// List all users
const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT id, name, email, role, is_active FROM users');
    res.json(users.rows);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Change user role (admin/author/user)
const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
    res.json({ message: 'User role updated' });
  } catch (err) {
    console.error('Update role error:', err);
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// Activate/deactivate user
const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    await pool.query('UPDATE users SET is_active = $1 WHERE id = $2', [is_active, id]);
    res.json({ message: 'User status updated' });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
};
