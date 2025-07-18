// Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Interceptor';
import './Header.css';

const Header = () => {
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();


  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      console.log('no refresh token found');
      setError('No refresh token found. Please log in again.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/api/logout/', { refresh });
      if (response.data.success) {
        setError('');  // Reset error state if logout is successful
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh');
        localStorage.removeItem('role');
        localStorage.removeItem('FollowUpCount');
        localStorage.removeItem('CrNo');
        localStorage.removeItem('Count');
        localStorage.removeItem('username');
        navigate('/',{ replace: true });
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err) {
      setError('Unexpected error. Please try again later.');
    }
  };

  return (
    <header className="app-header">
     <a href="https://www.ririana.in" target='_blank'>Ririana Innovations</a> 
      <div className="logout-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <button
      onClick={() => navigate('/change-password')}
      className="logout-button"
    >
      Change Password
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
