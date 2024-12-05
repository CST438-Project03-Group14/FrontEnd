import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';


const Home = () => {
 const [featuredBooks, setFeaturedBooks] = useState([]); // State to store books from the API
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);


 // Fetch featured books from the backend
 useEffect(() => {
   const fetchFeaturedBooks = async () => {
     try {
       const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/books', {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
       });


       if (!response.ok) {
         throw new Error('Failed to fetch featured books');
       }


       const data = await response.json();
       setFeaturedBooks(data || []);
     } catch (err) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };


   fetchFeaturedBooks();
 }, []);


 // Navigation functions
 const handleLogout = () => {
   window.location.href = '/';
 };


 const goToLibrary = () => {
   window.location.href = '/library';
 };


 const goToFavorites = () => {
   window.location.href = '/favorites';
 };


 // Render loading state
 if (loading) {
   return <div className={styles.wrapper}>Loading...</div>;
 }


 // Render error state
 if (error) {
   return <div className={styles.wrapper}>Error: {error}</div>;
 }


 return (
   <div className={styles.wrapper}>
     <header className={styles.header}>
       <h1 className={styles.title}>Welcome to BookHive</h1>
       <nav className={styles.navbar}>
         <ul>
           <li>
             <button onClick={goToLibrary} className={styles.navButton}>
               Library
             </button>
           </li>
           <li>
             <button onClick={handleLogout} className={styles.navButton}>
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
           {featuredBooks.map((book) => (
             <div key={book.book_id} className={styles.bookCard}>
               {book.cover_image ? (
                 <img
                   src={book.cover_image}
                   alt={`${book.title} cover`}
                   className={styles.bookCover}
                 />
               ) : (
                 <div className={styles.bookCoverPlaceholder}>
                   No Cover Image
                 </div>
               )}
               <h3 className={styles.bookTitle}>{book.title}</h3>
               <p className={styles.bookAuthor}>by {book.author}</p>
               <p className={styles.bookGenre}>{book.genre}</p>
               <p className={styles.bookDescription}>{book.description}</p>
             </div>
           ))}
         </div>
       </section>


       <div className={styles.quickActions}>
         <button onClick={goToLibrary} className={styles.actionButton}>
           Browse Library
         </button>
         <button onClick={goToFavorites} className={styles.actionButton}>
           My Reading List
         </button>
       </div>
     </div>
   </div>
 );
};

export default Home;