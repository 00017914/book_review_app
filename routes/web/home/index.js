const express = require('express');
const router = express.Router();
const controller = require('../../controllers/web/home');

// GET Routes
router.get('/', controller.index);
router.get('/add', controller.add);
router.get('/update', controller.update);

// POST Routes
router.post('/add', controller.addBook);
router.post('/update', controller.updateBook);

module.exports = router;