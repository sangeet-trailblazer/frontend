import React, { useState, useEffect } from 'react';
import { User,UserCircle, Activity, Droplets, History, Pencil, Save, DotIcon } from 'lucide-react';
import DashboardCard from './DashboardCard';
import './PatientDashboardstyle.css';
import axios from 'axios';  // Import axios for making HTTP requests
import { useParams } from 'react-router-dom';
import { format } from 'date-fns'; 


 function PatientDashboard({toggleSidePanel,setPatientParagraph }) {
   const { CrNo } = useParams();
   const [response, setResponse] = useState('');
   const [isEditing, setIsEditing] = useState(false);
   const [patientInfo, setPatientInfo] = useState({
     name: '',
     age: '',
     gender: '',
     occupation: '',
     symptoms: [], // Ensure symptoms is an array
     bloodReport: [], // Ensure this is an array
     medicalHistory: []
   });
 
   const handleEdit = () => {
     setIsEditing(!isEditing);
   };
 
   const handleChange = (field, value) => {
     setPatientInfo(prev => ({
       ...prev,
       [field]: value
     }));
   };
   const handleHeaderButtonClick = async(e) => {
    toggleSidePanel();
    e.preventDefault();
    console.log('Header button clicked');
    if (patientInfo.name) {
      console.log(patientParagraph);
      setPatientParagraph(patientParagraph); 
      
      // try{
      //  const res = await axios.post('http://127.0.0.1:8000/hi/generate/', { input: patientParagraph });
      //  setResponse(res.data.response);
      // }
      // catch(error){
      // console.error('Error fetching data:', error);
      // setResponse('An error occurred. Please try again.');
      // }



    }
    // Add your button functionality here
  };
   const handleSymptomChange = (index, value) => {
     const newSymptoms = [...patientInfo.symptoms];
     newSymptoms[index] = value;
     handleChange('symptoms', newSymptoms);
   };
 
   const handleHistoryChange = (index, field, value) => {
     const newHistory = [...patientInfo.medicalHistory];
     newHistory[index] = { ...newHistory[index], [field]: value };
     handleChange('medicalHistory', newHistory);
   };
 
   const EditButton = () => (
     <button 
       className={`edit-button ${isEditing ? 'save-button' : ''}`}
       onClick={handleEdit}
     >
       {isEditing ? (
         <>
           <Save size={16} />
           Save
         </>
       ) : (
         <>
           <Pencil size={16} />
           Edit
         </>
       )}
     </button>
   );
 
   useEffect(() => {
     // Fetch patient information
     
     axios.get(`http://127.0.0.1:8000api/patients/${CrNo}/`)
       .then((response) => {
         const patientData = response.data;
         setPatientInfo(prev => ({
           ...prev,
           age: patientData.Age,
           gender: patientData.Gender,
           occupation: patientData.Occupation,
           name: patientData.Name // Add name to the state
         }));
       })
       .catch((error) => {
         console.error('Error fetching patient details:', error);
       });
 
     // Fetch medical history for patient 102
     axios.get(`http://127.0.0.1:8000/api/medical-history/${CrNo}/`)
     .then((response) => {
       const medicalHistoryData = response.data;
       setPatientInfo(prev => ({
         ...prev,
         medicalHistory: medicalHistoryData.map(item => ({
           date: format(new Date(item.Date), 'd MMMM yyyy'), // Use correct field names from API response
           observation: item.Observation,
           remarks: item.Remarks
         }))
       }));
     })
       .catch((error) => {
         console.error('Error fetching medical history:', error);
       });
 
     // Fetch blood reports for patient 102
     axios.get(`http://127.0.0.1:8000/api/blood-reports/${CrNo}/`)
       .then((response) => {
         setPatientInfo(prev => ({
           ...prev,
           bloodReport: Array.isArray(response.data) ? response.data : []  // Ensure it's an array
         }));
       })
       .catch((error) => {
         console.error('Error fetching blood reports:', error);
       });
 
     // Fetch current symptoms for patient 102
     axios.get(`http://127.0.0.1:8000/api/current-symptoms/${CrNo}/`)
       .then((response) => {
         setPatientInfo(prev => ({
           ...prev,
           symptoms: Array.isArray(response.data) ? response.data : [] // Ensure symptoms is always an array
         }));
       })
       .catch((error) => {
         console.error('Error fetching current symptoms:', error);
       });
   }, []); // Runs once when the component mounts
  
  
  
 const symptomsParagraph = patientInfo.symptoms.length > 0 
  ? `symptoms of ${patientInfo.symptoms.map((symptom) => symptom.Symptoms).join(', ')}.`
  : 'No current symptoms.';

 const bloodReportsParagraph = patientInfo.bloodReport.length > 0 
   ? `The Blood Reports show that ${patientInfo.bloodReport.map(report => `${report.Test} is ${report.Status}`).join(', ')}.`
   : 'No blood reports available.';

 const medicalHistoryParagraph = patientInfo.medicalHistory.length > 0 
   ? `The Patient's Medical History is as follows: on ${patientInfo.medicalHistory.map(item => `${item.date}, it was observed that the patient experienced ${item.observation}, then it was remarked for the patient to ${item.remarks}`).join(', ')}.`
   : 'No medical history available.';

 const patientParagraph = `${patientInfo.age}-year-old ${patientInfo.gender.toLowerCase()} working as ${patientInfo.occupation} is showing ${symptomsParagraph} ${bloodReportsParagraph} ${medicalHistoryParagraph}`;
  
  //  useEffect(() => {
  //   if (patientInfo.name) {
  //     console.log(patientParagraph);
  //   }
  // }, [patientInfo, patientParagraph]);
   return (
     <div className="dashboard">
       <header className="dashboard-header">
         <h1>
         <DotIcon size={30}  className="header-icon"/>
            Patient Dashboard</h1>
          <div className="header-content">
          <button className="header-button" onClick={handleHeaderButtonClick}>
            ASK AI
          </button>
        </div> 


       </header>
       
       <div className="dashboard-grid">
         <DashboardCard 
           title="Patient Information" 
           icon={<User size={24} className="text-primary" />}
           action={<EditButton />}
         >
           <div className="patient-info">
             <div className="info-item">
               <div className="info-label">Name</div>
               {isEditing ? (
                 <input
                   type="text"
                   className="info-value editable"
                   value={patientInfo.name}
                   onChange={(e) => handleChange('name', e.target.value)}
                 />
               ) : (
                 <div className="info-value">{patientInfo.name}</div>
               )}
             </div>
             <div className="info-item">
               <div className="info-label">Age</div>
               {isEditing ? (
                 <input
                   type="text"
                   className="info-value editable"
                   value={patientInfo.age}
                   onChange={(e) => handleChange('age', e.target.value)}
                 />
               ) : (
                 <div className="info-value">{patientInfo.age}</div>
               )}
             </div>
             <div className="info-item">
               <div className="info-label">Gender</div>
               {isEditing ? (
                 <input
                   type="text"
                   className="info-value editable"
                   value={patientInfo.gender}
                   onChange={(e) => handleChange('gender', e.target.value)}
                 />
               ) : (
                 <div className="info-value">{patientInfo.gender}</div>
               )}
             </div>
             <div className="info-item">
               <div className="info-label">Occupation</div>
               {isEditing ? (
                 <input
                   type="text"
                   className="info-value editable"
                   value={patientInfo.occupation}
                   onChange={(e) => handleChange('occupation', e.target.value)}
                 />
               ) : (
                 <div className="info-value">{patientInfo.occupation}</div>
               )}
             </div>
           </div>
         </DashboardCard>
 
         <DashboardCard 
           title="Current Symptoms" 
           icon={<Activity size={24} className="text-warning" />}
         >
           <ul className="symptoms-list">
             {patientInfo.symptoms.map((symptom, index) => (
               <li key={index} className="symptom-item">
                 {isEditing ? (
                   <input
                     type="text"
                     className="info-value editable"
                     value={symptom.Symptoms} // Access the Symptoms field here
                     onChange={(e) => handleSymptomChange(index, e.target.value)}
                   />
                 ) : (
                   symptom.Symptoms // Access the Symptoms field here for display
                 )}
               </li>
             ))}
           </ul>
         </DashboardCard>
 
         <DashboardCard 
           title="Blood Report" 
           icon={<Droplets size={24} className="text-danger" />}
         >
           <table className="blood-report-table">
             <thead>
               <tr>
                 <th>Test</th>
                 <th>Result</th>
                 <th>Status</th>
               </tr>
             </thead>
             <tbody>
               {patientInfo.bloodReport.map((report, index) => (
                 <tr key={index}>
                   <td>{report.Test}</td>
                   <td>{report.Result}</td>
                   <td>
                     <span className={`status-badge status-${report.Status}`}>
                       {report.Status}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </DashboardCard>
 
         <DashboardCard 
           title="Medical History" 
           icon={<History size={24} className="text-info" />}
         >
           <ul className="history-list">
             {patientInfo.medicalHistory.map((item, index) => (
               <li key={index} className="history-item">
                 {isEditing ? (
                   <>
                     <input
                       type="text"
                       className="info-value editable history-date-input"
                       value={item.date}
                       onChange={(e) => handleHistoryChange(index, 'date', e.target.value)}
                     />
                     <input
                       type="text"
                       className="info-value editable"
                       value={item.observation}
                       onChange={(e) => handleHistoryChange(index, 'observation', e.target.value)}
                     />
                     <input
                       type="text"
                       className="info-value editable"
                       value={item.remarks}
                       onChange={(e) => handleHistoryChange(index, 'remarks', e.target.value)}
                     />
                   </>
                 ) : (
                   <>
                     <div className="history-date">{item.date}</div>
                     <div className="history-observation">{item.observation}</div>
                     <div className="history-remarks">{item.remarks}</div>
                   </>
                 )}
               </li>
             ))}
           </ul>
         </DashboardCard>
       </div>
     </div>
   );
 }
 
 export default PatientDashboard;
 
 

