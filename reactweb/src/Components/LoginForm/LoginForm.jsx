import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials
  const mockUsers = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'test@test.com', password: 'test123' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    
    const user = mockUsers.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      setError('');
      localStorage.setItem('user', JSON.stringify({ email: user.email }));
      navigate('/home');
    } else {
      setError('Invalid credentials. Try one of these test accounts:');
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.inputBox}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaEnvelope className={styles.icon} />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className={styles.icon} />
        </div>
        {error && (
          <div className={styles.error}>
            {error}
            <div className={styles.testCredentials}>
              {mockUsers.map((user, index) => (
                <p key={index}>
                  Email: {user.email} | Password: {user.password}
                </p>
              ))}
            </div>
          </div>
        )}
        <button type="submit">Login</button>
      </form>
      <div className={styles.registerLink}>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;