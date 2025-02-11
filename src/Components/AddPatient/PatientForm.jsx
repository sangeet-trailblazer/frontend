import { useState } from 'react';
// import './Patientstyle.css';
import React from 'react';
import { X } from 'lucide-react';

const PatientForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    age: '',
    gender: 'Male',
    occupation: '',
    symptoms: [],
    history: [],
    bloodReports: []
  });

  const [newSymptom, setNewSymptom] = useState('');
  const [newHistoryDate, setNewHistoryDate] = useState('');
  const [newHistoryDesc, setNewHistoryDesc] = useState('');
  const [newBloodReport, setNewBloodReport] = useState({
    test_name: '',
    value: '',
    status: 'normal',
    range: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSymptom = () => {
    if (newSymptom.trim()) {
      setFormData({
        ...formData,
        symptoms: [...(formData.symptoms || []), { description: newSymptom.trim() }]
      });
      setNewSymptom('');
    }
  };

  const addHistory = () => {
    if (newHistoryDate && newHistoryDesc) {
      setFormData({
        ...formData,
        history: [...(formData.history || []), {
          date: newHistoryDate,
          description: newHistoryDesc
        }]
      });
      setNewHistoryDate('');
      setNewHistoryDesc('');
    }
  };

  const addBloodReport = () => {
    if (newBloodReport.test_name && newBloodReport.value) {
      setFormData({
        ...formData,
        bloodReports: [...(formData.bloodReports || []), { ...newBloodReport }]
      });
      setNewBloodReport({
        test_name: '',
        value: '',
        status: 'normal',
        range: ''
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Patient' : 'Add New Patient'}</h2>
          <button className="close-button" onClick={onClose}>
            <X className="icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: parseInt(e.target.value)})}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender:</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                required
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Occupation:</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Symptoms */}
          <div className="form-section">
            <h3>Symptoms</h3>
            <div className="form-group">
              <div className="input-with-button">
                <input
                  type="text"
                  value={newSymptom}
                  onChange={(e) => setNewSymptom(e.target.value)}
                  placeholder="Enter symptom"
                />
                <button type="button" onClick={addSymptom}>Add</button>
              </div>
            </div>
            <ul className="edit-list">
              {formData.symptoms?.map((symptom, index) => (
                <li key={index}>
                  {symptom.description}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      symptoms: formData.symptoms.filter((_, i) => i !== index)
                    })}
                  >
                    <X className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Medical History */}
          <div className="form-section">
            <h3>Medical History</h3>
            <div className="form-group">
              <div className="history-inputs">
                <input
                  type="date"
                  value={newHistoryDate}
                  onChange={(e) => setNewHistoryDate(e.target.value)}
                />
                <input
                  type="text"
                  value={newHistoryDesc}
                  onChange={(e) => setNewHistoryDesc(e.target.value)}
                  placeholder="Description"
                />
                <button type="button" onClick={addHistory}>Add</button>
              </div>
            </div>
            <ul className="edit-list">
              {formData.history?.map((item, index) => (
                <li key={index}>
                  {item.date}: {item.description}
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      history: formData.history.filter((_, i) => i !== index)
                    })}
                  >
                    <X className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Blood Report */}
          <div className="form-section">
            <h3>Blood Report</h3>
            <div className="form-group">
              <div className="blood-form-inputs">
                <input
                  type="text"
                  value={newBloodReport.test_name}
                  onChange={(e) => setNewBloodReport({
                    ...newBloodReport,
                    test_name: e.target.value
                  })}
                  placeholder="Test name"
                />
                <input
                  type="text"
                  value={newBloodReport.value}
                  onChange={(e) => setNewBloodReport({
                    ...newBloodReport,
                    value: e.target.value
                  })}
                  placeholder="Value"
                />
                <input
                  type="text"
                  value={newBloodReport.range}
                  onChange={(e) => setNewBloodReport({
                    ...newBloodReport,
                    range: e.target.value
                  })}
                  placeholder="Normal range"
                />
                <select
                  value={newBloodReport.status}
                  onChange={(e) => setNewBloodReport({
                    ...newBloodReport,
                    status: e.target.value
                  })}
                >
                  <option value="normal">Normal</option>
                  <option value="deficient">Deficient</option>
                  <option value="high">High</option>
                </select>
                <button type="button" onClick={addBloodReport}>Add</button>
              </div>
            </div>
            <ul className="edit-list">
              {formData.bloodReports?.map((report, index) => (
                <li key={index}>
                  {report.test_name}: {report.value} ({report.status})
                  <button
                    type="button"
                    onClick={() => setFormData({
                      ...formData,
                      bloodReports: formData.bloodReports.filter((_, i) => i !== index)
                    })}
                  >
                    <X className="icon" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {initialData ? 'Save Changes' : 'Add Patient'}
            </button>
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;