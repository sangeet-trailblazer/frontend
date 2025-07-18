import axios from 'axios';
import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:8000/api/send-otp/', {
        username,
        phone,
        step: 'send_otp',
      });
      setMessage('OTP sent to your phone!');
      setStep(2);
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Failed to send OTP. Check username and phone.'
      );
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/verify-otp/', {
        username,
        otp,
        step: 'verify_otp',
      });

      if (response.data.message === 'OTP verified') {
        setMessage('OTP verified. Please enter your new password.');
        setStep(3);
      } else {
        setMessage('Invalid OTP.');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Incorrect or expired OTP. Please try again.'
      );
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/reset-password/', {
        username,
        new_password: newPassword,
        confirm_password: confirmPassword,
        step: 'reset_password',
      });

      if (response.data.message === 'Password reset successful') {
        setMessage('Password reset successfully! Please log in again.');
        setUsername('');
        setPhone('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        setStep(1);
      } else {
        setMessage('Password reset failed.');
      }
    } catch (error) {
      setMessage(
        error.response?.data?.error || 'Failed to reset password. Try again.'
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) handleSendOtp();
    else if (step === 2) handleVerifyOtp();
    else if (step === 3) handleResetPassword();
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your registered phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <p className="hint">
                Use 10-digit mobile number only. We'll add +91 automatically.
              </p>
              <button type="submit">Send OTP</button>
            </>
          )}

          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button type="submit">Verify OTP</button>
            </>
          )}

          {step === 3 && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="submit">Reset Password</button>
            </>
          )}
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
