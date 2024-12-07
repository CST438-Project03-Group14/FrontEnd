import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './Components/Layout';
import LoginForm from './Components/LoginForm/LoginForm';
import Home from './Components/HomePage/Home';
import Library from './Components/Library/Library';
import Favorites from './Components/Favorites/Favorites';
import BookDetail from './Components/BookDetail/BookDetail';
import Librarian from './Components/Librarian/Librarian';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  if (!userStr) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const LibrarianRoute = ({ children }) => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  if (!user || !user.is_librarian) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

function App() {
  return (
    <GoogleOAuthProvider clientId="567112089666-3hjf1cqcgvk1n40s4uvj6o0n44pn8tv5.apps.googleusercontent.com">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />

          {/* Protected Routes - Wrapped in Layout */}
          <Route path="/home" element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/library" element={
            <ProtectedRoute>
              <Layout>
                <Library />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/favorites" element={
            <ProtectedRoute>
              <Layout>
                <Favorites />
              </Layout>
            </ProtectedRoute>
          } />

          <Route path="/book/:bookId" element={
            <ProtectedRoute>
              <Layout>
                <BookDetail />
              </Layout>
            </ProtectedRoute>
          } />

          {/* Librarian Routes */}
          <Route path="/librarian" element={
            <LibrarianRoute>
              <Layout>
                <Librarian />
              </Layout>
            </LibrarianRoute>
          } />

          <Route path="*" element={
            <Navigate to={localStorage.getItem('user') ? '/home' : '/'} replace />
          } />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;