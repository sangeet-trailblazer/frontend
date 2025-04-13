import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search,Plus,LogOut } from 'lucide-react';
import './Home.css';
import axiosInstance from '../Interceptor';
import PatientForm from '../AddPatient/PatientForm'; // Import your patient form component (to be created)
import PatientGrid from '../AddPatient/PatientGrid'; 
import '../AddPatient/PatientStyle.css';
import axios from 'axios';
import Header from '../LogoutButton/LogoutHeader';
import Footer from '../Footer/Footer';
// import { getBaseUrl } from '../config';
// function Dashboard() {
//   const [loading, setLoading] = useState(true);  // Add loading state
//   const [error, setError] = useState(''); // Error state to display error messages
//   const [patients, setPatients] = useState([]); // Patient state
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const [filteredPatients, setFilteredPatients] = useState([]);
//   const [doctorName, setName] = useState('');
//   useEffect(() => {
//     const doctorName = localStorage.getItem('username'); 
//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       // If no token, redirect to the login page
//       navigate('/');
//     } else {
//       // If token exists, proceed to fetch patient data
//       fetchPatients();
//     }
//     if (doctorName) {
//       setName(doctorName);
//     }
 

//   }, [navigate]);

//   // Fetch patients from API
//   const fetchPatients = async () => {
//     const doctorName = localStorage.getItem('username');  // Example value for doctor_name
//     const url = `http://127.0.0.1:8000/api/patientfollowups/`;
   
    
//     try {
//       const response = await axios.get(url,{params:{doctor_name: doctorName}}); // Adjust the URL to your API endpoint
//       if (response.data) {
//         setPatients(response.data);
//         setFilteredPatients(response.data);
//         console.log(response.data); // Assuming the response is an array of patient objects
//       }
//     } catch (err) {
//       console.error("Error fetching patients:", err);
//       setError('Error fetching patient data. Please try again later.');
//     } finally {
//       setLoading(false); // Set loading to false when done fetching data
//     }
//   };
//   const handleSearch = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     const filtered = patients.filter((p) =>
//       p.Name.toLowerCase().includes(query)
//     );
//     setFilteredPatients(filtered);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//     <Header></Header>
//         <div className="content-wrapper">
//         <div className="content-box header-with-search">
//         <h2 className="content-title">
//           Patients consulting Dr. {doctorName}
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={searchQuery}
//           onChange={handleSearch}
//           className="search-input"
//         />
//           </div>
//         </div>
          
//           <div className="dashboard-grid">
//             {/* Passing the patients to the PatientGrid component */}
//             <PatientGrid patients={filteredPatients} />
//           </div>
//           {/* <Footer/> */}
//         </div>
    
//   );
// }

// export default Dashboard;

const PATIENTS_PER_PAGE = 3;

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [doctorName, setName] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 🔸 Pagination state

  const navigate = useNavigate();

  useEffect(() => {
    const storedDoctorName = localStorage.getItem('username');
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) {
      navigate('/');
    } else {
      fetchPatients();
    }

    if (storedDoctorName) {
      setName(storedDoctorName);
    }
  }, [navigate]);

  const fetchPatients = async () => {
    const doctorName = localStorage.getItem('username');
    const url = `http://127.0.0.1:8000/api/patientfollowups/`;

    try {
      const response = await axios.get(url, { params: { doctor_name: doctorName } });
      if (response.data) {
        setPatients(response.data);
        setFilteredPatients(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
      setError('Error fetching patient data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = patients.filter((p) =>
      p.Name.toLowerCase().includes(query)
    );

    setFilteredPatients(filtered);
    setCurrentPage(1); // 🔸 Reset to first page when search changes
  };

  // 🔸 Pagination logic
  const totalPages = Math.ceil(filteredPatients.length / PATIENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PATIENTS_PER_PAGE;
  const currentPatients = filteredPatients.slice(startIndex, startIndex + PATIENTS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="content-wrapper">
        <div className="content-box header-with-search">
          <h2 className="content-title">
            Patients consulting Dr. {doctorName} ({filteredPatients.length} total)
          </h2>
          <input
            type="text"
            placeholder="Search patients by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      {/* 🔸 Pagination Controls (Top Right) */}
      {filteredPatients.length > 0 && (
        <div className="pagination-wrapper">
          <div className="pagination-controls">
            <button onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
      <PatientGrid patients={currentPatients} />

      <Footer />
    </div>
  );
}

export default Dashboard;


