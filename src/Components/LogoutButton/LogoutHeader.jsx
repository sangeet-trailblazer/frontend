// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Header.css';
import axiosInstance from '../Interceptor';
const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // If no token, redirect to the login page
      navigate('/');
    } else {
      // If token exists, proceed to fetch patient data
      // fetchPatients();
    }
  }, [navigate]);

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      setError('No refresh token found. Please log in again.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/api/logout/', { refresh });
      if (response.data.success) {
        setError('');  // Reset error state if logout is successful
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh');
        navigate('/');
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err) {
      setError('Unexpected error. Please try again later.');
    }
  };

  return (
    <header className="app-header">
      Ririana Innovations
      <div className="logout-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      </div>
    </header>
  );
//   return (
//     <header className="app-header">
//       {user ? (
//         <div className="user-info">
//           <span>Welcome, {user.name}</span>
//           <button onClick={handleLogout} className="logout-button">
//             Logout
//           </button>
//         </div>
//       ) : (
//         <span>Loading user information...</span>
//       )}
//     </header>
//   );
};

export default Header;
