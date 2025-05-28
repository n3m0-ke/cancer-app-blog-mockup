const express = require('express');
const router = express.Router();
const { getAllViews } = require('../controllers/viewsController');

router.get('/', getAllViews);

module.exports = router;
