import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Library.module.css';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/books/');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      console.log('Fetched books:', data); // For debugging
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading books...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Library Collection</h1>
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