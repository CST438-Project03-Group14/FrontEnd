import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaBook, 
  FaHeart, 
  FaUser, 
  FaSignOutAlt,
  FaBookReader,
  FaCog
} from 'react-icons/fa';
import styles from './Navigation.module.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Fixed genres
  const genres = ['Classic', 'Non-Fiction', 'Fantasy'];

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleGenreSelect = async (genre) => {
    try {
      const response = await fetch(`https://bookhive-90e4e8826675.herokuapp.com/api/books/search/?q=${genre}`);
      if (response.ok) {
        const data = await response.json();
        navigate('/library', { state: { searchResults: data, selectedGenre: genre } });
      }
    } catch (error) {
      console.error('Genre search error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.user_id }),
      });

      if (response.ok) {
        localStorage.removeItem('user');
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.navLeft}>
        <div className={styles.logo} onClick={() => navigate('/home')}>
          <FaBook className={styles.logoIcon} />
          <span>BookHive</span>
        </div>
      </div>

      <div className={styles.navCenter}>
        <select 
          className={styles.genreSelect}
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            if (e.target.value) {
              handleGenreSelect(e.target.value);
            }
          }}
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.navRight}>
        <button 
          className={`${styles.navButton} ${location.pathname === '/library' ? styles.active : ''}`}
          onClick={() => navigate('/library')}
        >
          <FaBookReader />
          <span>Library</span>
        </button>

        <button 
          className={`${styles.navButton} ${location.pathname === '/favorites' ? styles.active : ''}`}
          onClick={() => navigate('/favorites')}
        >
          <FaHeart />
          <span>Favorites</span>
        </button>

        {user?.is_librarian && (
          <button 
            className={`${styles.navButton} ${location.pathname === '/librarian' ? styles.active : ''}`}
            onClick={() => navigate('/librarian')}
          >
            <FaCog />
            <span>Admin</span>
          </button>
        )}

        <div className={styles.userMenuContainer}>
          <button 
            className={styles.userButton}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {user?.profile_image ? (
              <img 
                src={user.profile_image} 
                alt={user.username} 
                className={styles.userAvatar}
              />
            ) : (
              <FaUser />
            )}
          </button>

          {showDropdown && (
            <div className={styles.dropdown}>
              <div className={styles.userInfo}>
                <p className={styles.username}>{user?.username}</p>
                <p className={styles.email}>{user?.email}</p>
              </div>
              <hr className={styles.divider} />
              <button className={styles.dropdownButton} onClick={handleLogout}>
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;