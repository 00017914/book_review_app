const { body, param } = require('express-validator');

// ... (keep existing addBookValidation)

const updateBookValidation = () => {
  return [
    param('id')
      .isInt().withMessage('ID must be an integer'),
    
    body('title')
      .optional()
      .trim()
      .isLength({ min: 2, max: 255 })
      .withMessage('Title must be between 2-255 characters'),
    
    // Include other fields as optional with same validation as addBookValidation
    // ...
  ];
};

module.exports = {
  
  updateBookValidation
};