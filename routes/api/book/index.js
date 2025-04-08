const express = require('express');
const router = express.Router();
const bookController = require('../../../controllers/api/book');

// GET all book reviews
router.get('/', bookController.getAll);

module.exports = router;
