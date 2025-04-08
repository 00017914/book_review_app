const express = require('express');
const router = express.Router();
const bookController = require('../../../controllers/api/book');
const {
  addBookValidation,
  updateBookValidation
} = require('../../../validators/book');

// GET all books
router.get('/', bookController.getAll);

// GET single book
router.get('/:id', bookController.getById);

// CREATE book
router.post('/', bookController.create);

// UPDATE book
router.put('/:id', updateBookValidation(), bookController.update);

// DELETE book
router.delete('/:id', bookController.delete);

module.exports = router;