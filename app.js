const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const webRoutes = require('./routes/web');  // Changed variable name

global.mock_db = path.join(__dirname, './data/mock_db.json');

const app = express();

// engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// static
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', webRoutes);

const port = 3002;
app.listen(port, () => console.log(`Book review app running on port ${port}`));