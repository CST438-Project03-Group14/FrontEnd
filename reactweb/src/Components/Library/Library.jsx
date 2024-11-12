import React, { useState } from 'react';
import styles from './Library.module.css';

const Library = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic' },
    { id: 2, title: '1984', author: 'George Orwell', genre: 'Science Fiction' },
    { id: 3, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance' },
    { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy' },
    { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.title}>Library Catalog</h1>
        <button 
          onClick={() => window.location.href = '/home'}
          className={styles.backButton}
        >
          Back to Home
        </button>
      </header>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.bookList}>
        {filteredBooks.map(book => (
          <div key={book.id} className={styles.bookCard}>
            <div className={styles.bookCover}></div>
            <div className={styles.bookInfo}>
              <h3 className={styles.bookTitle}>{book.title}</h3>
              <p className={styles.bookAuthor}>By {book.author}</p>
              <span className={styles.genre}>{book.genre}</span>
              <button className={styles.detailsButton}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;