import React from 'react';
import './PatientGrid.css';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation
import { User, Calendar, Briefcase } from 'lucide-react';


// 📆 Date Formatter Helper
const formatDateCustom = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day}, ${year}`;
};

const PatientGrid = ({ patients }) => {
  return (
    <div className="dashboard-grid">
      {patients.length > 0 ? (
        <div className="patient-list">
          {patients.map((patient) => (
            <div key={patient.CrNo} className="patient-card">
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
                  <span>Gender: {patient.Gender}</span>
                </div>
                <div className="info-row">
                  <span>Occupation: {patient.Occupation}</span>
                </div>
                <div className="info-row">
                  <span>First Visit: {formatDateCustom(patient.FirstVisit)}</span>
                </div>
                <div className="info-row">
                  <span>Diagnosis: {patient.Diagnosis || 'N/A'}</span>
                </div>

                {/*  Follow-up Info */}
                {patient.followups && patient.followups.length > 0 ? (
                  <div className="info-row">
                    <span>
                      Follow Up: {patient.followups[0].Followup} (Visited on{' '}
                      {formatDateCustom(patient.followups[0].RecentVisit)})
                    </span>
                  </div>
                ) : (
                  <div className="info-row">
                    <span>Follow Up: None</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No patients found.</p>
      )}
    </div>
  );
};

export default PatientGrid;





















// function PatientGrid({ patients }) {
//   const navigate = useNavigate(); // Hook to navigate to another route

//   // const handleClick = (CrNo) => {
//   //   // Navigate to the '/sdasgef' page on click
//   //   navigate(`/pdash/${CrNo}`);
//   // };
  
//   return (
//     <div className="dashboard-grid">
//   {patients.length > 0 ? (
//     <div className="patient-list">
//       {patients.map((patient) => (
//         <div key={patient.CrNo} className="patient-card">
//           <div className="patient-card-header">
//             <img
//               src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.Name)}`}
//               alt={patient.Name}
//               className="patient-avatar"
//             />
//             <h3 className="patient-name">{patient.Name}</h3>
//           </div>
//           <div className="patient-card-info">
//             <div className="info-row">
//               <span>Age: {patient.Age} years</span>
//             </div>
//             <div className="info-row">
//               <span>Gender: {patient.Gender}</span>
//             </div>
//             <div className="info-row">
//               <span>Occupation: {patient.Occupation}</span>
//             </div>
//             <div className="info-row">
//               <span>First Visit: {patient.FirstVisit || 'N/A'}</span>
//             </div>
//             <div className="info-row">
//               <span>Diagnosis: {patient.Diagnosis || 'N/A'}</span>
//             </div>

//             {patient.followups && patient.followups.length > 0 ? (
//               <div className="info-row">
//                 <span>
//                   Follow Up: {patient.followups[0].Followup} (Visited on {patient.followups[0].RecentVisit})
//                 </span>
//               </div>
//             ) : (
//               <div className="info-row">
//                 <span>Follow Up: None</span>
//               </div>
//             )}
//           </div>
//           {/* <div className="patient-card-footer">
//             <span className="view-details">View Details →</span>
//           </div> */}
//         </div>
//       ))}
//     </div>
//   ) : (
//     <p>No patients found.</p>
//   )}
// </div>

//     // <div className="dashboard-grid">
//     //   {patients.length > 0 ? (
//     //     <div className="patient-list">
//     //       {patients.map((patient) => (
//     //         // onClick={() => handleClick(patient.CrNo)}
//     //         <div key={patient.CrNo} className="patient-card">
//     //           <div className="patient-card-header">
//     //             <img
//     //               src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(patient.Name)}`}
//     //               alt={patient.Name}
//     //               className="patient-avatar"
//     //             />
//     //             <h3 className="patient-name">{patient.Name}</h3>
//     //           </div>
//     //           <div className="patient-card-info">
//     //             <div className="info-row">
//     //               <span>Age: {patient.Age} years</span>
//     //             </div>
//     //             <div className="info-row">
//     //               <span>Gender: {patient.Gender}</span>
//     //             </div>

//     //             <div className="info-row">
//     //               <span>Occupation: {patient.Occupation}</span>
//     //             </div>
//     //             <div className="info-row">
//     //               <span>First Visit: {patient.FirstVisit}</span>
//     //             </div>
//     //             <div className="info-row">
//     //               <span>Diagnosis: {patient.Diagnosis}</span>
//     //             </div>
//     //             <div className="info-row">
//     //               <span>Follow Up: {patient.followups[0].Followup}</span>
//     //             </div>
//     //           </div>
//     //           {/* <div className="patient-card-footer">
//     //             <span className="view-details">View Details →</span>
//     //           </div> */}
//     //         </div>
//     //       ))}
//     //     </div>
//     //   ) : (
//     //     <p>No patients found.</p>
//     //   )}
//     // </div>
//   );
// }

// export default PatientGrid;
