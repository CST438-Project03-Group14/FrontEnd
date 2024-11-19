import React, { useState } from 'react';
import styles from './Favorites.module.css';

const Favorites = () => {
  // Mock favorites data - in real app this would come from a database
  const [favorites, setFavorites] = useState([
    { 
      id: 1, 
      title: 'The Great Gatsby', 
      author: 'F. Scott Fitzgerald', 
      genre: 'Classic',
      dateAdded: '2024-01-15',
      notes: 'Beautiful prose, fascinating characters'
    },
    { 
      id: 2, 
      title: '1984', 
      author: 'George Orwell', 
      genre: 'Science Fiction',
      dateAdded: '2024-02-01',
      notes: 'Dystopian masterpiece'
    },
    { 
      id: 3, 
      title: 'Pride and Prejudice', 
      author: 'Jane Austen', 
      genre: 'Romance',
      dateAdded: '2024-02-15',
      notes: 'Witty and charming'
    }
  ]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(book => book.id !== id));
  };

  const updateNotes = (id, newNotes) => {
    setFavorites(favorites.map(book => 
      book.id === id ? { ...book, notes: newNotes } : book
    ));
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Favorites</h1>
        <button 
          onClick={() => window.location.href = '/home'}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </header>

      <div className={styles.statsSection}>
        <div className={styles.stat}>
          <h3>Total Favorites</h3>
          <p>{favorites.length}</p>
        </div>
        <div className={styles.stat}>
          <h3>Most Common Genre</h3>
          <p>Classic</p>
        </div>
        <div className={styles.stat}>
          <h3>Recently Added</h3>
          <p>Pride and Prejudice</p>
        </div>
      </div>

      <div className={styles.favoritesList}>
        {favorites.map(book => (
          <div key={book.id} className={styles.favoriteCard}>
            <div className={styles.bookCover}></div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookAuthor}>By {book.author}</p>
              <span className={styles.genre}>{book.genre}</span>
              <p className={styles.dateAdded}>Added on: {book.dateAdded}</p>
              <textarea
                className={styles.notesArea}
                value={book.notes}
                onChange={(e) => updateNotes(book.id, e.target.value)}
                placeholder="Add your notes..."
              />
              <div className={styles.cardActions}>
                <button 
                  className={styles.removeButton}
                  onClick={() => removeFromFavorites(book.id)}
                >
                  Remove from Favorites
                </button>
                <button className={styles.readButton}>
                  Start Reading
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;