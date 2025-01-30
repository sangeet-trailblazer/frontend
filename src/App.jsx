
import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/dashboard'
import Home from './Components/Home/Home';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    
    </BrowserRouter>
  );
};

export default App;

