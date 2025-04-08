const bookService = require('../../../services/book');
const { validationResult } = require('express-validator');

const bookController = {
  // Get all books
  getAll(req, res) {
    try {
      const books = bookService.getAll();
      res.json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  },

  // Get single book
  getById(req, res) {
    try {
      const book = bookService.getById(req.params.id);
      if (!book) return res.status(404).json({ error: 'Book not found' });
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch book' });
    }
  },

  // Create book
  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newBook = bookService.create(req.body);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create book' });
    }
  },

  // Update book
  update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const updatedBook = bookService.update(req.params.id, req.body);
      if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
      res.json(updatedBook);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update book' });
    }
  },

  // Delete book
  delete(req, res) {
    try {
      const deleted = bookService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Book not found' });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete book' });
    }
  }
};

module.exports = bookController;