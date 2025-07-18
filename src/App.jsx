
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChangePassword from './Changepassword/Changepassword';
import AdminDashboard from './Components/Admin/AdminDashboard';
import Dashboard from './Components/Dashboard/Dashboard';
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import Home from './Components/Home/Home';
import PatientDashboard from './Components/PatientDashboard/PatientDashboard';
import SidePanel from "./Components/PatientDashboard/SidePanel";
<Route path="/change-password" element={<ChangePassword />} />


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
      <Route path="/change-password" element={<ChangePassword />} />
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

