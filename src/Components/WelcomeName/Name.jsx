import React from 'react';
import './Name.css'; // Don't forget to import the CSS file

const WelcomePage = () => {
  // You can get the username from localStorage or props, here using localStorage
  const username = localStorage.getItem('username') || 'User';

  return (
    <div className="welcome-page">
      <h1 className="welcome-heading">Welcome Back {username}!</h1>
    </div>
  );
};

export default WelcomePage;
