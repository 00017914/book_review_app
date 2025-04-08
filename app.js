const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');



// Mock database for book reviews (JSON file)
global.mock_db = path.join(__dirname, './data/mock_db.json');

const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');

const app = express();

// Pug setup for web views
app.set('view engine', 'pug');

// Static files (CSS/JS)
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use(cors());

// Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes); // API endpoints
app.use('/', webRoutes);    // Web interface

// Redirect invalid requests to home
app.use((req, res) => {
    res.redirect('/');
});

const port = 3333;
app.listen(port, () => console.log(`Book Review App running on port ${port}`));