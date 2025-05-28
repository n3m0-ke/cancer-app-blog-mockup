const db = require('../db');

const getAllLikes = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM likes');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllLikes };
