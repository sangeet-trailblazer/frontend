import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Home.css';
import axiosInstance from '../Interceptor';

function Dashboard() {
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(''); // Error state to display error messages
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // If no token, redirect to the login page
      navigate('/');
    } else {
      // If token exists, set loading to false after the check
      setLoading(false);
    }
  }, [navigate]);

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      setError('No refresh token found. Please log in again.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/api/logout/', { refresh,});
      console.log('Response:', response); 
      if (response.data.success) {
        setError('');  // Reset error state if logout is successful
  
        // Remove both access and refresh tokens from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh');
  
        // Redirect to home page after successful logout
        navigate('/');
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err) {
      console.error("Logout error:", err);  // Log the full error for debugging
      setError('Unexpected error. Please try again later.');
    }
  };
  

  if (loading) {
    // Show loading indicator until the authentication check is done
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-content">
          <div className="nav-wrapper">
            <h1 className="dashboard-title">Dashboard</h1>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="content-wrapper">
          <div className="content-box">
            <h2 className="content-title">Welcome to your Dashboard</h2>
            <p className="content-text">
              You have successfully logged in. This is a protected route that can only be accessed after authentication.
            </p>
          </div>
        </div>
      </main>

      {error && <div className="error-message">{error}</div>} {/* Display any error message */}
    </div>
  );
}

export default Dashboard;

