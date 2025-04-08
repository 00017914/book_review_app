const { body } = require('express-validator');

const addBookValidation = () => {
  return [
    body('title')
      .notEmpty().withMessage('Title must not be empty')
      .isLength({ min: 2, max: 255 }).withMessage('Title must be between 2 and 255 characters'),
    
    body('author')
      .notEmpty().withMessage('Author must not be empty')
      .isLength({ min: 2, max: 100 }).withMessage('Author name must be between 2 and 100 characters'),
    
    body('rating')
      .notEmpty().withMessage('Rating is required')
      .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    
    body('review')
      .optional()
      .isLength({ max: 1000 }).withMessage('Review cannot exceed 1000 characters'),
    
    body('genre')
      .optional()
      .isIn(['Fiction', 'Non-Fiction', 'Sci-Fi', 'Biography', 'Fantasy'])
      .withMessage('Invalid genre selected')
  ];
};

module.exports = {
  addBookValidation
};