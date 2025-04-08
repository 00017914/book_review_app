# book_review_app

## About the Application
    This is a web-application for making book reviews.
    Book review application presents following features:
    - Viewing all existing reviews in table format
    - Adding new book reviews with title, author, rating, and review text
    - Editing existing book reviews
    - Deleting reviews
    - Search filter 
    - Clear minimalistic design

## How to Run the Application Locally

### Prerequisites
    - Node.js (v14 or higher)
    - npm (comes with Node.js)
    - nodemon

### Step-by-Step Instructions
    1. Clone the repository:
    --bash
    git clone https://github.com/yourusername/book-review-app.git
    cd book-review-app
    2. Install Dependecies and start the application
    --bash
    npm install
    npm start
    3. Set up Mock Data Base
    You can alter data in ./data/mock_db.json
    To work with your own data set
    3. Access Application from your browser 
    http://localhost:3000

## Application dependecies 

### Backend dependecies

    express: Web framework
    mock_db.json: Mock database 
    pug: Template engine
    express-validator: Input validation
    cors: Cross-origin resource sharing

### Frontend dependecies

    axios: HTTP client
    vanilla JavaScript for frontend logic

### Development Dependencies

    nodemon: Development server


## Project Structure 
    BOOK_REVIEW_APP/
    ├── controllers/
    │   ├── api/
    │   │   └── book/
    │   │       └── index.js
    │   └── web/
    ├── data/
    │   └── mock_db.json
    ├── node_modules/ (ignored)
    ├── public/
    │   ├── css/
    │   │   ├── home.css
    │   │   └── styles.css
    │   └── js/
    │       ├── home.js
    │       └── script.js
    ├── routes/
    │   ├── api/
    │   │   └── book/
    │   │       └── index.js
    │   └── web/
    │       └── home/
    │           └── index.js
    ├── services/
    │   └── book/
    │       └── index.js
    ├── validators/
    │   └── book/
    │       └── index.js
    ├── views/
    │   └── home/
    │       ├── add_update.pug
    │       ├── index.pug
    │       ├── head.pug
    │       └── layout.pug
    ├── .gitignore
    ├── app.js
    ├── package-lock.json
    ├── package.json
    └── README.md
    This project structure:
    -allows clear separation routes, services and controllers
    -organiztion of view templates
    -logical grouping of related files
    I chose this structure for its convinience and similarity to ones in requirements as well as sample tutorial in Week12.

# LINKS
## GitHub repository : https://github.com/00017914/book_review_app.git
## Hosted website: https://young-almond-chime.glitch.me

                            
