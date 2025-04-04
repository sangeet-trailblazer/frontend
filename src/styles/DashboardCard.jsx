import React from 'react';
import PropTypes from 'prop-types';
import './DashboardCard.css';
const DashboardCard = ({ title, icon, description, onClick, className }) => (
  <div 
    className={`dashboard-card shadow-md ${className}`}
    onClick={onClick}
  >
    <div className="dashboard-card-content">
      <div className="dashboard-card-header">
        {icon}
        <h3 className="dashboard-card-title">{title}</h3>
      </div>
      <p className="dashboard-card-description">{description}</p>
    </div>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string
};

DashboardCard.defaultProps = {
  className: ''
};

export default DashboardCard;