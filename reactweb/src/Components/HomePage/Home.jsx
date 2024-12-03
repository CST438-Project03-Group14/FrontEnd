import React from 'react';
import styles from './Home.module.css';

const Home = () => {
  const handleLogout = () => {
    window.location.href = '/';
  };

  const goToLibrary = () => {
    window.location.href = '/library';
  };

  const goToFavorites = () => {
    window.location.href = '/favorites';
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome to BookVerse</h1>
        <nav className={styles.navbar}>
          <ul>
            <li>
              <button 
                onClick={goToLibrary}
                className={styles.navButton}
              >
                Library
              </button>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className={styles.navButton}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>
      
      <div className={styles.content}>
        <section className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>Featured Books</h2>
          <div className={styles.bookGrid}>
            {/* Featured Book 1 */}
            <div className={styles.bookCard}>
              <div className={styles.bookCover}></div>
              <h3 className={styles.bookTitle}>The Great Gatsby</h3>
              <p className={styles.bookAuthor}>F. Scott Fitzgerald</p>
            </div>
            
            {/* Featured Book 2 */}
            <div className={styles.bookCard}>
              <div className={styles.bookCover}></div>
              <h3 className={styles.bookTitle}>1984</h3>
              <p className={styles.bookAuthor}>George Orwell</p>
            </div>
            
            {/* Featured Book 3 */}
            <div className={styles.bookCard}>
              <div className={styles.bookCover}></div>
              <h3 className={styles.bookTitle}>Pride and Prejudice</h3>
              <p className={styles.bookAuthor}>Jane Austen</p>
            </div>
          </div>
        </section>
        
        <div className={styles.quickActions}>
          <button 
            onClick={goToLibrary}
            className={styles.actionButton}
          >
            Browse Library
          </button>
          <button 
            onClick={goToFavorites}
            className={styles.actionButton}
          >
            My Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;