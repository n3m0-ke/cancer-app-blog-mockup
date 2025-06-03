const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');
const authorController = require('../controllers/authorController');

router.use(authenticateToken, requireRole('author'));

// Dashboard stats for author
router.get('/dashboard',authorController.getDashboardStats);

// My Posts
router.get('/posts', authorController.getMyPosts);
router.post('/posts', authorController.createPost);
router.patch('/posts/:id', authorController.updatePost);
router.delete('/posts/:id', authorController.deletePost);

// Profile
router.get('/profile', authorController.getProfile);
router.put('/profile', authorController.updateProfile);

module.exports = router;
