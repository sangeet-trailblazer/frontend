import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }
    try {
      // Send a POST request to the backend with username and password
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });
  
      // Check if login was successful
      if (response.data.success) {
        const {access} = response.data.authenticated_user;
        const {refresh} = response.data.authenticated_user;
        localStorage.setItem('access_token', access);
        console.log(access);
        console.log(refresh);
        localStorage.setItem('refresh', refresh);
        setError('');
  
        navigate('/home');
      } else {
        // If login is not successful, show the error message from the backend
        setError(response.data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle errors from the request (e.g. network issues)
      if (err.response) {
        // If the server responded with an error status code
        setError(err.response.data.message || 'An error occurred while processing your request.');
      } else if (err.request) {
        // If no response was received (e.g., network issues)
        setError('Network error. Please check your internet connection.');
      } else {
        // If something went wrong while setting up the request
        setError('Unexpected error. Please try again later.');
      }
    }
  
    console.log('Login attempted:', { username, password });
  };

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
            <div className="input-wrapper">
              {/* <User size={20} /> */}
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              {/* <Lock size={20} /> */}
              <input
                id="password"
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Sign In
            <ArrowRight />
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