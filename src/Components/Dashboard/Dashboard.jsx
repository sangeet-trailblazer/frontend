import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';


// import { getBaseUrl } from '../../config';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role') || ''); // Store role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    const usersData = localStorage.getItem('username');
    if (!usersData) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
          username,
          password,
        });
  
        if (response.data.success) {
          const { access, refresh } = response.data.authenticated_user;
          const userRole = response.data.authenticated_user.role; 
          localStorage.setItem('role',userRole);// Get role from response
          const usernamee= response.data.authenticated_user.first_name;
          localStorage.setItem('username', usernamee);
          console.log('hi printing role');
          console.log(userRole);
  
          if (userRole === 'Admin') {
            navigate('/admin-dashboard');
          } else if (userRole === 'Doctor') {
            navigate('/doctor-dashboard');
          }
          console.log(usernamee);
          localStorage.setItem('access_token', access);
          localStorage.setItem('refresh', refresh);
          localStorage.setItem('role', userRole); // Store role in local storage
  
          setRole(userRole); // Update state with role
          setError('');
  
          // Redirect based on role
          
        } else {
          setError(response.data.message || 'Login failed. Please check your credentials.');
        }
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || 'An error occurred while processing your request.');
        } else if (err.request) {
          setError('Network error. Please check your internet connection.');
        } else {
          setError('Unexpected error. Please try again later.');
        }
      }
    }

    else{
           alert('A session is already active, Logout and try again!')
    }

  };
  useEffect(() => {
    const userData = (localStorage.getItem('role')); // or get from context/api
    console.log('inside use effect');
    console.log(userData);
    if (userData) {
      // ✅ Redirect to role-specific page
      switch (userData) {
        case 'Admin':
          navigate('/admin-dashboard');
          break;
        case 'Doctor':
          navigate('/doctor-dashboard');
          break;
        default:
          navigate('/'); // fallback or error route
      }
    }
    // else, allow login form to be shown
  }, [navigate]);
  return (
    <div className="login-container">
        <div className="center-container">
          <div className="login-box">
            <div className="login-header">
              <h1>Welcome Back</h1>
              <p>Please sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>

            <Link to="/forgot-password" className="reset-password">
              Forgot your password?
            </Link>
          </div>
        </div>
      
    </div>
  );
}

export default Dashboard;
