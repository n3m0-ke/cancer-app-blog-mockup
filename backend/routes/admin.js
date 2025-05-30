const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/dashboard', authenticateToken, requireAdmin, getDashboardStats);

module.exports = router;
