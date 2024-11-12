import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LoginForm';
import SignupForm from './Components/SignupForm/SignupForm';
import Home from './Components/HomePage/Home';
import Library from './Components/Library/Library';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;