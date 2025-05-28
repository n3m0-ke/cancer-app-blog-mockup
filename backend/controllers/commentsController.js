const db = require('../db');

const getAllComments = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM comments');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllComments };
