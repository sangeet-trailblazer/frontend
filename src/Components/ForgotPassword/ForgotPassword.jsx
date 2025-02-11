import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    // In a real app, you would send a password reset email here
    setError('');
    setSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Reset Password</h1>
          <p>Enter your email to receive reset instructions</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              {/* <Mail size={20} /> */}
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              Reset instructions have been sent to your email. Redirecting...
            </div>
          )}

          <button type="submit" className="login-button" disabled={success}>
            Send Reset Link
            <Send size={20} />
          </button>
        </form>

        <Link to="/" className="reset-password">
          <ArrowLeft size={16} className="inline mr-1" />
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default ForgotPassword;