import React, { useState } from 'react';
import { Settings, Users, BarChart } from 'lucide-react';
import DashboardCard from '../../styles/DashboardCard';
import UserManagementForm from '../Forms/AddDoctor';
import '../Admin/Admin.css';
import AddOldPatients from '../Forms/AddOldPatient';
import Header from '../LogoutButton/LogoutHeader';
import AddPatients from '../Forms/AddNewPatient';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
const AdminDashboard = () => {
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAddOldPatients, setShowAddOldPatients] = useState(false);
  const [showAddPatients, setShowAddPatients] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
    
      <Header></Header>
      <div className="dashboard-container">
      {/* <div className="admin-dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      <DashboardCard
        title="Patients Under You"
        icon={<Users className="h-8 w-8 admin-icon" />}
        description="View patients who are referring you."
        onClick={() => navigate('/home')}
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
      {showAddPatients && (
              <AddPatients onClose={() => setShowAddPatients(false)} />
            )}
      {showUserManagement && (
        <UserManagementForm onClose={() => setShowUserManagement(false)} />
      )}
      {showAddOldPatients && (
              <AddOldPatients onClose={() => setShowAddOldPatients(false)} />
            )}
      <Footer/>
      </div>
    // {/* </main> */}
    // </div>
  );
};

export default AdminDashboard;