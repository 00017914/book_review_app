const bookService = require('../../../services/book');

const bookController = {
    getAll(req, res) {
        const books = bookService.getAll();
        res.json(books);
    
    
    },
    create(req, res) {
        res.status(201).json(
            bookService.create(req, res)
        )}
};

module.exports = bookController;