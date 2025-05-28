const express = require('express');
const router = express.Router();
const { getAllTags } = require('../controllers/tagsController');

router.get('/', getAllTags);

module.exports = router;
