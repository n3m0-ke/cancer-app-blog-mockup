const db = require('../db');

const getAllViews = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM views');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching views:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllViews };
