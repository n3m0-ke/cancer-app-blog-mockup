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

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await pool.query(`
      SELECT p.*, u.name AS author_name 
      FROM posts p 
      JOIN users u ON p.author_id = u.id
      ORDER BY p.created_at DESC
    `);
    res.json(posts.rows);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

// Approve (publish) a post
const approvePost = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE posts SET status = 'published', published_at = NOW() WHERE id = $1`,
      [id]
    );
    res.json({ message: 'Post published' });
  } catch (err) {
    console.error('Approve post error:', err);
    res.status(500).json({ error: 'Failed to publish post' });
  }
};

// Revert post to draft
const revertPost = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `UPDATE posts SET status = 'draft' WHERE id = $1`,
      [id]
    );
    res.json({ message: 'Post reverted to draft' });
  } catch (err) {
    console.error('Revert post error:', err);
    res.status(500).json({ error: 'Failed to revert post' });
  }
};

// Delete post
const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM posts WHERE id = $1`, [id]);
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, u.name AS user_name, p.title AS post_title
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN posts p ON c.post_id = p.id
      ORDER BY c.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Get comments error:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Approve/disapprove a comment
const setCommentApproval = async (req, res) => {
  const { id } = req.params;
  const { approved } = req.body;
  try {
    await pool.query(
      `UPDATE comments SET approved = $1 WHERE id = $2`,
      [approved, id]
    );
    res.json({ message: `Comment ${approved ? 'approved' : 'disapproved'}` });
  } catch (err) {
    console.error('Approve/disapprove comment error:', err);
    res.status(500).json({ error: 'Failed to update comment approval' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM comments WHERE id = $1`, [id]);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    console.error('Delete comment error:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};


module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  updateUserStatus,
  getAllPosts,
  approvePost,
  deletePost,
  revertPost,
  getAllComments,
  setCommentApproval,
  deleteComment
};
