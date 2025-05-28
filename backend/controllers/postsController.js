const db = require('../db');

const getAllPosts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM posts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllPosts };
