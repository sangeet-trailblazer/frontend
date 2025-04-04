import React, { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../../styles/forms.css';
import config from '../../Config';
import axios from 'axios';  
import Modal from '../../styles/AlertBox';


// THIS FORM IS TO ADD USER
const UserManagementForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullname:'',
    username: '',
    role: 'Doctor',
    password:''
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state
  const [modalMessage, setModalMessage] = useState(''); // Store modal message
  const [modalTitle, setModalTitle] = useState(''); // Store modal title

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('hererrerere');
    console.log('User Management Form Data:', formData);

    const jsonData = JSON.stringify(formData);
    console.log('changing it to json data');
    console.log(jsonData);

    try {
      // Send POST request with form data
      const response = await axios.post(`${config.API_BASE_URL}/register/`, jsonData,{ headers: {
        'Content-Type': 'application/json', // Ensure content type is JSON
      },});
      
      // Check if the request was successful
      if (response.status === 201) {
        console.log('User added successfully:', response.data);
        alert('User has been successfully added!');
      } else {
        console.error('Failed to add user');
        alert('Failed to add user');
        
      }
    } catch (error) {
      alert('Try again with a different username');
      
      console.error('Error during POST request:', error);
    }
    
    
    
    onClose();
  };

  return (
    <div className="form-container admin-form">
      <div className="form-content">
        <div className="form-header">
          <h2 className="form-title">User Management</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-input"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Doctor">Doctor</option>
              <option value="Admin">Admin</option>
            
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Set Password</label>
            <input
              type="text"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="form-button">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

UserManagementForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default UserManagementForm;