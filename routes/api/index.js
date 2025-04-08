const express = require('express');
const bookRouter = require('./book'); // Changed from 'ticket' to 'book'

const router = express.Router();

// All book-related API routes
router.use('/books', bookRouter); // More semantic than '/ticket'

module.exports = router;