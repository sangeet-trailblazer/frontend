// Adding New patient to the physio department 
import React, { useState } from 'react';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import '../../styles/forms.css';
import config from '../../Config';
import axios from 'axios';

const AddPatients = ({ onClose }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [formData, setFormData] = useState({
        CrNo: '',
        Name: '',
        Age: '',
        Gender:'Female',
        Occupation:'',
        ConsultingDoctor:'Dr.Pramod',
        Diagnosis:'',
        FirstVisit:currentDate,
    });
  
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log('hererrerere');
        console.log('User Management Form Data:', formData);
    
        const jsonData = JSON.stringify(formData);
        console.log('changing it to json data');
        console.log(jsonData);
    
        try {
          // Send POST request with form data
          const response = await axios.post(`${config.API_BASE_URL}/patients/`, jsonData,{ headers: {
            'Content-Type': 'application/json', // Ensure content type is JSON
          },});
          
          // Check if the request was successful
          if (response.status === 201) {
            console.log('Patient added successfully:', response.data);
            alert('Patient has been successfully added!');
          } else {
            console.error('Failed to add Patient');
            alert('Failed to add Patient');
            
          }
        } catch (error) {
          alert('Something went wrong.Try again');
          
          console.error('Error during POST request:', error);
        }
        
        
        
        onClose();
    };
  
    return (
      <div className="form-container admin-form">
        <div className="form-content">
          <div className="form-header">
            <h2 className="form-title">Add New Patients</h2>
            <button className="close-button" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                required
              />
              <div className="form-group">
              <label className="form-label">Age</label>
              <input
                type="text"
                className="form-input"
                value={formData.Age}
                onChange={(e) => setFormData({ ...formData, Age: e.target.value })}
                required
              />
            </div>
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-input"
                value={formData.Gender}
                onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Others</option>
              
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Occupation</label>
              <input
                type="text"
                className="form-input"
                value={formData.Occupation}
                onChange={(e) => setFormData({ ...formData, Occupation: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">CR Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.CrNo}
                onChange={(e) => setFormData({ ...formData, CrNo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Consulting Doctor</label>
              <select
                className="form-input"
                value={formData.ConsultingDoctor}
                onChange={(e) => setFormData({ ...formData, ConsultingDoctor: e.target.value })}
              >
                <option value="Pramod"> Dr.Pramod</option>
                <option value="Urja">Dr.Urja</option>
              
              </select>
            </div>
            
            <div className="form-group">
              <label className="form-label">Diagnosis/ Chief Complaints</label>
              <input
                type="text"
                className="form-input"
                value={formData.Diagnosis}
                onChange={(e) => setFormData({ ...formData, Diagnosis: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Add New Patient
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  AddPatients.propTypes = {
    onClose: PropTypes.func.isRequired
  };
  
  export default AddPatients;