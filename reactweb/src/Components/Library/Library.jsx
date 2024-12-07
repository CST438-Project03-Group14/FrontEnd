import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Library.module.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If we have search results from genre selection, use those
    if (location.state?.searchResults) {
      setBooks(location.state.searchResults);
    } else {
      fetchAllBooks();
    }
  }, [location.state]);

  const fetchAllBooks = async () => {
    const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/books/');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
  };

  const handleGenreSelect = async (genre) => {
    const response = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/books/search/?q=${genre}`);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      }
  };


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Library Collection</h1>
        <div className={styles.genreButtons}>
          <button 
            className={styles.genreButton}
            onClick={() => fetchAllBooks()}
          >
            All Books
          </button>
          {['Classic', 'Non-Fiction', 'Fantasy'].map((genre) => (
            <button
              key={genre}
              className={`${styles.genreButton} ${location.state?.selectedGenre === genre ? styles.active : ''}`}
              onClick={() => handleGenreSelect(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.booksGrid}>
        {books.map((book) => (
          <div key={book.book_id} className={styles.bookCard}>
            <div className={styles.bookCover}>
              {book.cover_image ? (
                <img 
                  src={book.cover_image} 
                  alt={book.title} 
                  className={styles.coverImage}
                />
              ) : (
                <div className={styles.defaultCover}>
                  <span>{book.title[0]}</span>
                </div>
              )}
            </div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookAuthor}>by {book.author}</p>
              <span className={styles.bookGenre}>{book.genre}</span>
              <p className={styles.bookDescription}>
                {book.description?.substring(0, 100)}...
              </p>
              <div className={styles.bookMeta}>
                <span className={styles.copies}>
                  Available: {book.available_copies}
                </span>
              </div>
              <button 
                className={styles.viewButton}
                onClick={() => navigate(`/book/${book.book_id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;