import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response1 = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter');
        const data1 = await response1.json();
        const response2 = await fetch('https://www.googleapis.com/books/v1/volumes?q=sherlock+holmes');
        const data2 = await response2.json();

      
        const combinedBooks = [...data1.items, ...data2.items];
        setBooks(combinedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
      const data = await response.json();
      setBooks(data.items);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  const handleBookClick = (book) => {
  };

  return (
    <div className="App">
      <nav>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </nav>
      <div className="book-container">
        {books.map((book) => (
          <div className="book" key={book.id} onClick={() => handleBookClick(book)}>
            <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;