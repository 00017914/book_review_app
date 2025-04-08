const fs = require('fs');
const path = require('path');

let books = require(global.mock_db);

const bookService = {
  getAll() {
    return books;
  },

  getById(id) {
    return books.find(book => book.id == id);
  },

  create(bookData) {
    const newBook = { 
      id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
      ...bookData
    };
    books.push(newBook);
    this._saveToFile();
    return newBook;
  },

  update(id, bookData) {
    const index = books.findIndex(book => book.id == id);
    if (index === -1) return null;
    
    books[index] = { ...books[index], ...bookData };
    this._saveToFile();
    return books[index];
  },

  delete(id) {
    const initialLength = books.length;
    books = books.filter(book => book.id != id);
    if (books.length !== initialLength) {
      this._saveToFile();
      return true;
    }
    return false;
  },

  _saveToFile() {
    fs.writeFileSync(
      global.mock_db, 
      JSON.stringify(books, null, 2)
    );
  }
};

module.exports = bookService;