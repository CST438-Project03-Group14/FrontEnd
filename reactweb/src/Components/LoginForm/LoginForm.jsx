import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import styles from './Login.module.css';
import { FaBook } from "react-icons/fa";

const LoginForm = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      const userData = {
        username: decoded.email.split('@')[0],
        email: decoded.email,
        password: `google_${Date.now()}`,
        is_librarian: 0,
        profile_image: decoded.picture || null,
      };

      const response = await fetch('https://bookhive-90e4e8826675.herokuapp.com/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('user', JSON.stringify({
        user_id: data.user.user_id,
        username: data.user.username,
        is_librarian: data.user.is_librarian,
        email: data.user.email
      }));

      navigate('/home');
      
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.brandSection}>
        <FaBook className={styles.brandIcon} />
        <h1>BookHive</h1>
        <p className={styles.brandTagline}>Your Digital Library Companion</p>
      </div>

      <div className={styles.loginSection}>
        <h2>Welcome Back</h2>
        <p className={styles.loginMessage}>Sign in to continue to your library</p>

        <div className={styles.googleLoginWrapper}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              setError('Login failed. Please try again.');
            }}
            useOneTap={false}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.termsSection}>
          <p>By signing in, you agree to our</p>
          <div className={styles.termsLinks}>
            <a href="#" className={styles.termsLink}>Terms of Service</a>
            <span> and </span>
            <a href="#" className={styles.termsLink}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;