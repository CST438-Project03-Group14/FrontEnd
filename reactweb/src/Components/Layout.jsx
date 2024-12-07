import React from 'react';
import Navigation from './Navigation';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>BookHive</h4>
            <p>Your Digital Library Companion</p>
          </div>
          <div className={styles.footerSection}>
            <p>&copy; 2024 BookHive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;