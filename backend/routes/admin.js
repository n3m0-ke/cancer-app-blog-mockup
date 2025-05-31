const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const {  getAllUsers, updateUserRole, updateUserStatus } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/dashboard', authenticateToken, requireAdmin, getDashboardStats);

// user management routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.patch('/users/:id/role', authenticateToken, requireAdmin, updateUserRole);
router.patch('/users/:id/status', authenticateToken, requireAdmin, updateUserStatus);

module.exports = router;
