
import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import PatientDashboard from './Components/PatientDashboard/PatientDashboard';
import Home from './Components/Home/Home';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import SidePanel from "./Components/PatientDashboard/SidePanel";
import AdminDashboard from './Components/Admin/AdminDashboard';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import Footer from './Components/Footer/Footer';
const App = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [patientParagraph, setPatientParagraph] = useState("");
  const toggleSidePanel = () => {
    setIsPanelOpen((prevState) => !prevState); // Toggle the current state
  };
  
  
  return (
    <BrowserRouter>
    <div>
    <SidePanel isOpen={isPanelOpen} onClose={toggleSidePanel}patientParagraph={patientParagraph}>
        </SidePanel>
      <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<>
          <Home />
          
         </>} />
        <Route path="/pdash" element={<PatientDashboard />} />
        <Route path="/admin-dashboard" element={
          <>
          <AdminDashboard />
        
          </>} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/pdash/:CrNo" element={<PatientDashboard toggleSidePanel={toggleSidePanel} setPatientParagraph={setPatientParagraph}/>} />
      </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

