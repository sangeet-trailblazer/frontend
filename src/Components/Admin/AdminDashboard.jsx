import { BarChart, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../../styles/DashboardCard';
import Footer from '../Footer/Footer';
import UserManagementForm from '../Forms/AddDoctor';
import AddPatients from '../Forms/AddNewPatient';
import AddOldPatients from '../Forms/AddOldPatient';
import Header from '../LogoutButton/LogoutHeader';
import WelcomePage from '../WelcomeName/Name';
import './Admin.css';

const AdminDashboard = () => {
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAddOldPatients, setShowAddOldPatients] = useState(false);
  const [showAddPatients, setShowAddPatients] = useState(false);
 const username= localStorage.getItem('username');
 const navigate = useNavigate();
   useEffect(() => {
      const userData = localStorage.getItem('refresh'); // or get from context/api
      console.log(userData);
      if (!userData) {
            navigate('/'); // fallback or error route
      }
       
    }, [navigate]);
 
 return (
    <>
    <Header></Header>
    
    <WelcomePage></WelcomePage>
    
    {/* <div className="min-h-screen bg-gray-100"> */}
    
      
      <div className="dashboard-container">
      {/* <div className="admin-dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <DashboardCard
        title="User Management"
        icon={<Users className="h-8 w-8 admin-icon" />}
        description="Add new users. Create doctor and admin users."
        onClick={() => setShowUserManagement(true)}
        className="admin-card"
      />
      <DashboardCard
        title="Add New Patient"
        icon={<Users className="h-8 w-8 admin-icon" />}
        description="Add new cases to the physiotherapy department."
        onClick={() => setShowAddPatients(true)}
        className="admin-card"
      />
      <DashboardCard
        title="Add Old Cases"
        icon={<BarChart className="h-8 w-8 admin-icon" />}
        description="Iterate old cases to see their progress."
        onClick={() => setShowAddOldPatients(true)}
        className="admin-card"
      />
      </div>
      {/* <Footer></Footer> */}

      {showUserManagement && (
        <UserManagementForm onClose={() => setShowUserManagement(false)} />
      )}
      {showAddPatients && (
        <AddPatients onClose={() => setShowAddPatients(false)} />
      )}
      {showAddOldPatients && (
        <AddOldPatients onClose={() => setShowAddOldPatients(false)} />
      )}
      
      {/* {showAnalytics && (
        <div className="admin-modal fixed inset-0 flex items-center justify-center">
          <div className="admin-modal-content bg-white rounded-lg shadow-xl">
            <div className="admin-modal-header p-4 flex justify-between items-center">
              <h2 className="admin-title text-xl font-semibold">Analytics Dashboard</h2>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowAnalytics(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <p className="admin-description">Analytics dashboard content goes here...</p>
            </div>
          </div>
        </div>
      )} */}
      {/* </div> */}
      <Footer/>
      </>
    // {/* </main> */}
    // </div>
  );
};

export default AdminDashboard;