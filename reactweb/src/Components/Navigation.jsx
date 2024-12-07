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
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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
            (
              <FaUser />
            )
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