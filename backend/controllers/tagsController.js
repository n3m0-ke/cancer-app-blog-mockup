const db = require('../db');

const getAllTags = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tags');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllTags };
