const pool = require("../db");
const express = require('express');
const router = express.Router();
const { getAllPosts } = require('../controllers/postsController');

router.get('/', getAllPosts);

router.get('/:slug', async (req, res) => {
    // console.log("inside slug route");
  const { slug } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug]);
    if (rows.length === 0) return res.status(404).json({ error: 'Post not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
