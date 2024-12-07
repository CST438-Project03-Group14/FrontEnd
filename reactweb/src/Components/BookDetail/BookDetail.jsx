import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaHeart, FaTrash } from 'react-icons/fa';
import styles from './BookDetail.module.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [bookData, setBookData] = useState({ book: null, reviews: [] });
  const [newReview, setNewReview] = useState({ rating: 5, review_text: '' });
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/books/${bookId}/`);
        if (response.ok) {
          const data = await response.json();
          setBookData(data);
        }
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/reviews/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          book_id: bookId,
          rating: newReview.rating,
          review_text: newReview.review_text
        }),
      });

      if (response.ok) {
        const updatedData = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/books/${bookId}/`);
        const newData = await updatedData.json();
        setBookData(newData);
        setNewReview({ rating: 5, review_text: '' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/reviews/${reviewId}/delete/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id
        })
      });

      if (response.ok) {
        const updatedData = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/books/${bookId}/`);
        const newData = await updatedData.json();
        setBookData(newData);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const addToFavorites = async () => {
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/favorites/add/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          book_id: bookId,
          reading_status: 'WANT_TO_READ'
        }),
      });

      if (response.ok) {
        alert('Added to favorites!');
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (!bookData.book) {
    return <div className={styles.container}>Loading...</div>;
  }

  const { book, reviews } = bookData;

  return (
    <div className={styles.container}>
      <div className={styles.bookSection}>
        <div className={styles.coverContainer}>
          {book.cover_image ? (
            <img src={book.cover_image} alt={book.title} className={styles.coverImage} />
          ) : (
            <div className={styles.defaultCover}>
              <span>{book.title[0]}</span>
            </div>
          )}
        </div>

        <div className={styles.bookInfo}>
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <span className={styles.genre}>{book.genre}</span>
          <p className={styles.description}>{book.description}</p>
          <div className={styles.bookMeta}>
            <span>Published: {new Date(book.published_date).toLocaleDateString()}</span>
          </div>
          <button className={styles.favoriteButton} onClick={addToFavorites}>
            <FaHeart /> Add to Favorites
          </button>
        </div>
      </div>

      <div className={styles.reviewsSection}>
        <h2>Reviews</h2>
        
        <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
            className={styles.ratingSelect}
          >
            {[5, 4, 3, 2, 1].map(num => (
              <option key={num} value={num}>{num} Stars</option>
            ))}
          </select>

          <textarea
            placeholder="Write your review..."
            value={newReview.review_text}
            onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
            required
          />
          <button type="submit">Submit Review</button>
        </form>

        <div className={styles.reviewsList}>
          {reviews.length === 0 ? (
            <p className={styles.noReviews}>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map(review => (
              <div key={review.review_id} className={styles.review}>
                <div className={styles.reviewHeader}>
                  <div className={styles.stars}>
                    {[...Array(review.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className={styles.date}>
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                  {user?.is_librarian && (
                    <button
                      onClick={() => handleDeleteReview(review.review_id)}
                      className={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
                <p className={styles.reviewText}>{review.review_text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;