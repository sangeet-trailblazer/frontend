import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus,LogOut } from 'lucide-react';
import './Home.css';
import axiosInstance from '../Interceptor';
import PatientForm from '../AddPatient/PatientForm'; // Import your patient form component (to be created)
import PatientGrid from '../AddPatient/PatientGrid'; 
import '../AddPatient/PatientStyle.css';
import axios from 'axios';
// import { getBaseUrl } from '../config';
function Dashboard() {
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState(''); // Error state to display error messages
  const [patients, setPatients] = useState([]); // Patient state
  const [showForm, setShowForm] = useState(false); // State to show/hide the form
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // If no token, redirect to the login page
      navigate('/');
    } else {
      // If token exists, proceed to fetch patient data
      fetchPatients();
    }
  }, [navigate]);

  // Fetch patients from API
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/patients/'); // Adjust the URL to your API endpoint
      if (response.data) {
        setPatients(response.data); // Assuming the response is an array of patient objects
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError('Error fetching patient data. Please try again later.');
    } finally {
      setLoading(false); // Set loading to false when done fetching data
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) {
      setError('No refresh token found. Please log in again.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/api/logout/', { refresh });
      if (response.data.success) {
        setError('');  // Reset error state if logout is successful
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh');
        navigate('/');
      } else {
        setError('Logout failed. Please try again.');
      }
    } catch (err) {
      setError('Unexpected error. Please try again later.');
    }
  };

  const handleSubmit = (formData) => {
    const newPatient = {
      id: generateId(),  // Assuming you have a function to generate unique IDs
      ...formData
    };
    setPatients([newPatient, ...patients]); // Add the new patient to the list
    setShowForm(false); // Hide the form after submission
  };

  if (loading) {
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
            <h2 className="content-title">Welcome to your Medical Dashboard</h2>
            <div className="header-actions">
              <button className="add-button" onClick={() => setShowForm(true)}>
                <Plus className="icon" /> Add Patient
              </button>
            </div>
          </div>
        </div>

        <div className="patients-section">
          {showForm && (
            <PatientForm
              onSubmit={handleSubmit}
              onClose={() => setShowForm(false)}
            />
          )}
          
          <div className="patient-list">
            {/* Passing the patients to the PatientGrid component */}
            <PatientGrid patients={patients} />
          </div>
        </div>
      </main>

      {error && <div className="error-message">{error}</div>} {/* Display any error message */}
    </div>
  );
}

export default Dashboard;


