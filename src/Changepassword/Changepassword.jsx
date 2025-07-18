import React, { useState } from 'react';
import axios from '../Components/Interceptor';
import './ChangePassword.css';
/*Component ChangePassword*/
const ChangePassword = () => {
/*which state it is ?*/ 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
/* Submitting*/
  const handleChangePassword = async (e) => {
    e.preventDefault();
/*both fields Match?*/
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match.");
      return;
    }
/* Trying API call with POST method*/
try {
  const response = await axios.post('http://localhost:8000/api/password_change/', {
    old_password: oldPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  });

  if (response.status === 200) {
    setMessage('Password changed successfully.');
  }
} catch (error) {
  setMessage('Failed to change password.');
  console.error(error);
}
};

return (
<div className="change-password-wrapper">
  <div className="change-password-container">
    <h2>Change Password</h2>
    {message && <p className="message">{message}</p>}
    <form onSubmit={handleChangePassword}>
      <input
        type="password"
        placeholder="Old Password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
    </form>
  </div>
</div>
);
};

export default ChangePassword;