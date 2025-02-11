import React from 'react';
import './PatientDashboardstyle.css';

function DashboardCard({ title, children, icon, action }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-left">
          {icon}
          <h2 className="card-title">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export default DashboardCard;