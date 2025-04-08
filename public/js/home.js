document.addEventListener('DOMContentLoaded', function() {
    axios.get('/api/books')
      .then(response => {
        const books = response.data;
        const tbody = document.getElementById('books-list');
        
        books.forEach(book => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.rating}</td>
            <td>${book.review}</td>
          `;
          tbody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  });