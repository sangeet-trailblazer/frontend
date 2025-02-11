import React from 'react';
import './PatientGrid.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import { User, Calendar, Briefcase } from 'lucide-react';
function PatientGrid({ patients }) {
  const navigate = useNavigate(); // Hook to navigate to another route

  const handleClick = (patientId) => {
    // Navigate to the '/sdasgef' page on click
    navigate(`/pdash/${patientId}`);
  };
  
  return (
    <div className="patient-grid">
      {patients.length > 0 ? (
        <div className="patient-list">
          {patients.map((patient) => (
            <div key={patient.Patientid} className="patient-card" onClick={() => handleClick(patient.Patientid)}>
              <div className="patient-card-header">
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.Name)}`}
                  alt={patient.Name}
                  className="patient-avatar"
                />
                <h3 className="patient-name">{patient.Name}</h3>
              </div>
              <div className="patient-card-info">
                <div className="info-row">
                  <span>Age: {patient.Age} years</span>
                </div>
                <div className="info-row">
                  <span>Occupation: {patient.Occupation}</span>
                </div>
                <div className="info-row">
                  <span>Recent Visit: {patient.RecentVisit}</span>
                </div>
              </div>
              <div className="patient-card-footer">
                <span className="view-details">View Details →</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
}

export default PatientGrid;
