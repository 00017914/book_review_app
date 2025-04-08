const express = require('express');
const router = express.Router();
const path = require('path');

// Fix: Use path.resolve for correct absolute path
const homeController = require(path.resolve(__dirname, '../../controllers/web/home'));

router.get('/', homeController.index);

module.exports = router;