const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get comments for a post by slug
router.get('/post/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const postQuery = await pool.query('SELECT id FROM posts WHERE slug = $1', [slug]);
    if (postQuery.rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    const postId = postQuery.rows[0].id;

    const { rows } = await pool.query(
      'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at DESC',
      [postId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit a new comment
router.post('/', async (req, res) => {
  const { slug, content, user_id = null } = req.body;

  try {
    const postQuery = await pool.query('SELECT id FROM posts WHERE slug = $1', [slug]);
    if (postQuery.rows.length === 0) return res.status(404).json({ error: 'Post not found' });

    const postId = postQuery.rows[0].id;

    const result = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [postId, user_id, content]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// const { getAllComments } = require('../controllers/commentsController');

// router.get('/', getAllComments);

module.exports = router;
