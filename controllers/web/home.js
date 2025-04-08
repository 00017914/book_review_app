const fs = require('fs').promises;
const path = require('path');

module.exports = {
  index: async (req, res) => {
    try {
      const data = await fs.readFile(global.mock_db, 'utf8');
      const books = JSON.parse(data).books || [];
      res.render('home/index', { books });
    } catch (err) {
      console.error(err);
      res.render('home/index', { books: [] });
    }
  },

  add: (req, res) => {
    res.render('home/add_update', { 
      editMode: false,
      book: null 
    });
  },

  update: async (req, res) => {
    try {
      const data = await fs.readFile(global.mock_db, 'utf8');
      const books = JSON.parse(data).books || [];
      const book = books.find(b => b.id === parseInt(req.query.id));
      
      res.render('home/add_update', { 
        editMode: true,
        book: book || null 
      });
    } catch (err) {
      console.error(err);
      res.redirect('/');
    }
  }
};