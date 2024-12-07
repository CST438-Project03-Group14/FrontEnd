import React, { useState } from 'react';
import styles from './Librarian.module.css';

const Librarian = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    published_date: '',
    cover_image: '',
    available_copies: 1
  });

  const [message, setMessage] = useState('');

  const genres = ['Fantasy', 'Non-Fiction', 'Classic'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/books/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newBook,
          user_id: user.user_id
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Book created successfully!');
        setNewBook({
          title: '',
          author: '',
          description: '',
          genre: '',
          published_date: '',
          cover_image: '',
          available_copies: 1
        });
      } else {
        setMessage(data.error || 'Failed to create book');
      }
    } catch (err) {
      setMessage('Error creating book: ' + err.message);
    }
  };

  if (!user?.is_librarian) {
    return <div className={styles.unauthorized}>Access Denied: Librarian privileges required</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Librarian Dashboard</h1>

      <div className={styles.formContainer}>
        <h2>Add New Book</h2>
        {message && <div className={styles.message}>{message}</div>}
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Title *</label>
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({...newBook, title: e.target.value})}
              required
              placeholder="Enter book title"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Author *</label>
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({...newBook, author: e.target.value})}
              required
              placeholder="Enter author name"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description *</label>
            <textarea
              value={newBook.description}
              onChange={(e) => setNewBook({...newBook, description: e.target.value})}
              required
              placeholder="Enter book description"
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Genre *</label>
            <select
              value={newBook.genre}
              onChange={(e) => setNewBook({...newBook, genre: e.target.value})}
              required
            >
              <option value="">Select Genre</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Published Date *</label>
            <input
              type="date"
              value={newBook.published_date}
              onChange={(e) => setNewBook({...newBook, published_date: e.target.value})}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Cover Image URL</label>
            <input
              type="url"
              value={newBook.cover_image}
              onChange={(e) => setNewBook({...newBook, cover_image: e.target.value})}
              placeholder="Enter cover image URL"
            />
            {newBook.cover_image && (
              <img 
                src={newBook.cover_image} 
                alt="Cover preview" 
                className={styles.coverPreview}
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Available Copies *</label>
            <input
              type="number"
              min="1"
              value={newBook.available_copies}
              onChange={(e) => setNewBook({...newBook, available_copies: parseInt(e.target.value)})}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default Librarian;