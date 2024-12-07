import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaBookOpen, FaCheck, FaTrash } from 'react-icons/fa';
import styles from './Favorites.module.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState('ALL');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const readingStatuses = {
    ALL: 'All Books',
    WANT_TO_READ: 'Want to Read',
    CURRENTLY_READING: 'Currently Reading',
    ALREADY_READ: 'Already Read'
  };

  useEffect(() => {
    fetchFavorites();
  }, [activeStatus]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      let url = `https://bookhive-90e4e8826675.herokuapp.com/api/users/${user.user_id}/favorites/`;
      
      if (activeStatus !== 'ALL') {
        url = `https://bookhive-90e4e8826675.herokuapp.com/api/users/${user.user_id}/reading/${activeStatus}/`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch favorites');
      
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateReadingStatus = async (bookId, newStatus) => {
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/favorites/status/update/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.user_id,
          book_id: bookId,
          reading_status: newStatus
        }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      fetchFavorites();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFavorite = async (bookId) => {
    try {
      const response = await fetch(
        `https://bookhive-90e4e8826675.herokuapp.com/api/favorites/${user.user_id}/${bookId}/remove/`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error('Failed to remove favorite');
      fetchFavorites();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className={styles.loading}>Loading your favorites...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Reading List</h1>

      <div className={styles.statusFilters}>
        {Object.entries(readingStatuses).map(([status, label]) => (
          <button
            key={status}
            className={`${styles.filterButton} ${activeStatus === status ? styles.active : ''}`}
            onClick={() => setActiveStatus(status)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className={styles.booksGrid}>
        {favorites.length === 0 ? (
          <div className={styles.noBooks}>
            No books found in this category
          </div>
        ) : (
          favorites.map((favorite) => (
            <div key={favorite.favorite_id} className={styles.bookCard}>
              <div className={styles.bookCover}>
                {favorite.book_details.cover_image ? (
                  <img
                    src={favorite.book_details.cover_image}
                    alt={favorite.book_details.title}
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.defaultCover}>
                    <FaBook />
                  </div>
                )}
              </div>
              
              <div className={styles.bookInfo}>
                <h3 className={styles.bookTitle}>{favorite.book_details.title}</h3>
                <p className={styles.bookAuthor}>by {favorite.book_details.author}</p>
                <span className={styles.bookGenre}>{favorite.book_details.genre}</span>

                <div className={styles.statusSelect}>
                  <select
                    value={favorite.reading_status}
                    onChange={(e) => updateReadingStatus(favorite.book_id, e.target.value)}
                  >
                    {Object.entries(readingStatuses)
                      .filter(([status]) => status !== 'ALL')
                      .map(([status, label]) => (
                        <option key={status} value={status}>
                          {label}
                        </option>
                      ))}
                  </select>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.viewButton}
                    onClick={() => navigate(`/book/${favorite.book_id}`)}
                  >
                    <FaBookOpen /> View Details
                  </button>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFavorite(favorite.book_id)}
                  >
                    <FaTrash /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;