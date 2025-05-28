const express = require('express');
const router = express.Router();
const { getAllLikes } = require('../controllers/likesController');

router.get('/', getAllLikes);

module.exports = router;
