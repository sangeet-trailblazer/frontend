import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import './Dashboard.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../Admin/AdminDashboard';
import DoctorDashboard from '../Doctor/DoctorDashboard';

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
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username,
        password,
      });

      if (response.data.success) {
        const { access, refresh } = response.data.authenticated_user;
        const userRole = response.data.authenticated_user.role; // Get role from response
        console.log('hi printing role');
        console.log(userRole);
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('role', userRole); // Store role in local storage

        setRole(userRole); // Update state with role
        setError('');

        // Redirect based on role
        if (userRole === 'admin') {
          navigate('/admin-dashboard');
        } else if (userRole === 'doctor') {
          navigate('/doctor-dashboard');
        }
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
