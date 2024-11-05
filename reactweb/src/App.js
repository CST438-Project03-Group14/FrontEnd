import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './Components/LoginForm/LogIn';
import SignupForm from './Components/SignupForm/SignUp';
import Home from './Components/HomePage/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />  {/* Add home route */}
    </Routes>
  );
}

export default App;