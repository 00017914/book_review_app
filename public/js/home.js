document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const booksList = document.getElementById('books-list');
  const addBookBtn = document.getElementById('add-review-btn');
  const modal = document.getElementById('review-modal');
  const closeModal = document.querySelector('.close-modal');
  const reviewForm = document.getElementById('review-form');
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  const resetSearchBtn = document.getElementById('reset-search-btn');
  const ratingFilter = document.getElementById('rating-filter');
  
  let books = [];
  let editingId = null;

  // Initialize the application
  init();

  function init() {
    setupEventListeners();
    fetchBooks();
  }

  function setupEventListeners() {
    addBookBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => closeModalWindow());
    window.addEventListener('click', (e) => {
      if (e.target === modal) closeModalWindow();
    });
    reviewForm.addEventListener('submit', handleFormSubmit);
    searchBtn.addEventListener('click', applySearch);
    resetSearchBtn.addEventListener('click', resetSearch);
    ratingFilter.addEventListener('change', filterByRating);
    searchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') applySearch();
    });
  }

  // Fetch books from API
  async function fetchBooks() {
    try {
      const response = await axios.get('/api/books');
      books = response.data;
      renderBooks(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      showError('Failed to load books. Please try again.');
    }
  }

  // Render books to the table
  function renderBooks(booksToRender) {
    booksList.innerHTML = '';
    
    if (!booksToRender || booksToRender.length === 0) {
      booksList.innerHTML = '<tr><td colspan="5" style="text-align: center;">No books found</td></tr>';
      return;
    }

    booksToRender.forEach(book => {
      const row = document.createElement('tr');
      const reviewText = book.review ? String(book.review) : 'No review available';
      const truncatedReview = reviewText.length > 100 ? 
        reviewText.substring(0, 100) + '...' : 
        reviewText;

      row.innerHTML = `
        <td>${book.title || 'Untitled'}</td>
        <td>${book.author || 'Unknown author'}</td>
        <td>${getStarRating(book.rating)}</td>
        <td>${truncatedReview}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${book._id || book.id}">Edit</button>
          <button class="action-btn delete-btn" data-id="${book._id || book.id}">Delete</button>
        </td>
      `;
      booksList.appendChild(row);
    });

    // Add event listeners to action buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => editBook(e.target.dataset.id));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => deleteBook(e.target.dataset.id));
    });
  }

  // Helper function to convert rating to stars
  function getStarRating(rating) {
    if (!rating) return '☆☆☆☆☆';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  // Modal functions
  function openModal(book = null) {
    const modalTitle = document.getElementById('modal-title');
    const bookId = document.getElementById('review-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const ratingInput = document.getElementById('rating');
    const reviewInput = document.getElementById('review');

    if (book) {
      modalTitle.textContent = 'Edit Book';
      bookId.value = book._id || book.id;
      titleInput.value = book.title || '';
      authorInput.value = book.author || '';
      ratingInput.value = book.rating || '';
      reviewInput.value = book.review || '';
      editingId = book._id || book.id;
    } else {
      modalTitle.textContent = 'Add New Book';
      reviewForm.reset();
      editingId = null;
    }

    modal.style.display = 'block';
  }

  function closeModalWindow() {
    modal.style.display = 'none';
  }

  // Form submission handler
  async function handleFormSubmit(e) {
    e.preventDefault();
    
    const bookData = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      rating: document.getElementById('rating').value,
      review: document.getElementById('review').value
    };

    try {
      if (editingId) {
        await axios.put(`/api/books/${editingId}`, bookData);
      } else {
        await axios.post('/api/books', bookData);
      }
      
      closeModalWindow();
      fetchBooks();
    } catch (error) {
      console.error('Error saving book:', error);
      showError('Failed to save book. Please try again.');
    }
  }

  // Book CRUD operations
  async function editBook(id) {
    try {
      const response = await axios.get(`/api/books/${id}`);
      openModal(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
      showError('Failed to load book for editing.');
    }
  }

  async function deleteBook(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    try {
      await axios.delete(`/api/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
      showError('Failed to delete book.');
    }
  }

  // Search and filter functions
  function applySearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) {
      renderBooks(books);
      return;
    }
    
    const filtered = books.filter(book => 
      (book.title && book.title.toLowerCase().includes(searchTerm)) || 
      (book.author && book.author.toLowerCase().includes(searchTerm)) ||
      (book.review && book.review.toLowerCase().includes(searchTerm))
    );
    
    renderBooks(filtered);
  }

  function resetSearch() {
    searchInput.value = '';
    ratingFilter.value = '';
    renderBooks(books);
  }

  function filterByRating() {
    const rating = ratingFilter.value;
    if (!rating) {
      renderBooks(books);
      return;
    }
    
    const filtered = books.filter(book => book.rating == rating);
    renderBooks(filtered);
  }

  // Utility function
  function showError(message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    document.body.prepend(errorElement);
    setTimeout(() => errorElement.remove(), 3000);
  }
});