const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/adminController');
const {  
    getAllUsers, 
    updateUserRole, 
    updateUserStatus,
    getAllPosts,
    approvePost,
    deletePost,
    revertPost,
    getAllComments,
    setCommentApproval,
    deleteComment } = require('../controllers/adminController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.get('/dashboard', authenticateToken, requireAdmin, getDashboardStats);

// user management routes
router.get('/users', authenticateToken, requireAdmin, getAllUsers);
router.patch('/users/:id/role', authenticateToken, requireAdmin, updateUserRole);
router.patch('/users/:id/status', authenticateToken, requireAdmin, updateUserStatus);

// Post moderation
router.get('/posts', authenticateToken, requireAdmin, getAllPosts);
router.patch('/posts/:id/approve', authenticateToken, requireAdmin, approvePost);
router.patch('/posts/:id/revert', authenticateToken, requireAdmin, revertPost);
router.delete('/posts/:id', authenticateToken, requireAdmin, deletePost);

// Comment moderation
router.get('/comments', authenticateToken, requireAdmin, getAllComments);
router.patch('/comments/:id/approve', authenticateToken, requireAdmin, setCommentApproval);
router.delete('/comments/:id', authenticateToken, requireAdmin, deleteComment);


module.exports = router;
