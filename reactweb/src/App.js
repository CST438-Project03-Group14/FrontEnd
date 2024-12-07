import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import Home from './Components/HomePage/Home';
import Library from './Components/Library/Library';
import Favorites from './Components/Favorites/Favorites';


//web 

function App() {
  return (
    <GoogleOAuthProvider clientId="567112089666-3hjf1cqcgvk1n40s4uvj6o0n44pn8tv5.apps.googleusercontent.com">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>

  );
}

export default App;