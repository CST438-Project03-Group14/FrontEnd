import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Fetch books
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/books/');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }

      const data = await response.json();
      
      // Randomly select 4 books
      const shuffled = [...data].sort(() => 0.5 - Math.random());
      setFeaturedBooks(shuffled.slice(0, 4));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <section className={styles.welcomeSection}>
        <h1 className={styles.welcomeTitle}>
          Welcome back, {user?.username}!
        </h1>
        <p className={styles.welcomeMessage}>
          Discover your next favorite book from our curated collection.
        </p>
      </section>

      {/* Featured Books Section */}
      <section className={styles.featuredSection}>
        <h2 className={styles.featuredTitle}>Featured Books</h2>
        <div className={styles.bookGrid}>
          {featuredBooks.map((book) => (
            <div key={book.book_id} className={styles.bookCard}>
              {book.cover_image ? (
                <img 
                  src={book.cover_image} 
                  alt={book.title} 
                  className={styles.bookCover}
                />
              ) : (
                <div className={styles.defaultCover}>
                  <span>{book.title[0]}</span>
                </div>
              )}
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{book.title}</h3>
                <p className={styles.bookAuthor}>by {book.author}</p>
                <span className={styles.bookGenre}>{book.genre}</span>
                <p className={styles.bookDescription}>
                  {book.description?.slice(0, 100)}...
                </p>
                <button 
                  className={styles.viewButton}
                  onClick={() => window.location.href = `/book/${book.book_id}`}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;