const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // adjust if your db file is in another location
require('dotenv').config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
    const token = generateToken(result.rows[0]);
    res.status(201).json({ token, user: result.rows[0] });
  } catch (err) {
    console.error("Registration error: ", err);
    res.status(400).json({ error: 'Something went wrong.' });

  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    if (!user.is_active) return res.status(403).json({ error: 'Account is deactivated' });

    const token = generateToken(user);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
