// Adding New patient to the physio department 
import axios from 'axios';
import { X } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import config from '../../Config';
import '../../styles/forms.css';

const AddOldPatients = ({ onClose }) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const [oldpatient, setData] = useState([]);
    const [formData, setFormData] = useState({
        Followup: '',
        RecentVisit:currentDate,
    });
    
    const handleSubmit = async(e) => {
        
        e.preventDefault();
       
        
        const patient=localStorage.getItem('CrNo');
        const url=`http://127.0.0.1:8000/api/visits/${patient}/`;

        try {
            console.log('we are fetching data');
            const fetchResponse = await axios.get(url); // Adjust the URL to your API endpoint
            if (fetchResponse.data) {
            
                    setData(fetchResponse.data);
                    localStorage.setItem('FollowUpCount',fetchResponse.data[0].Followup);
                    console.log('folow up is :', localStorage.getItem('FollowUpCount'));
                    console.log(fetchResponse.data[0].Followup);
                    console.log('Full fetch response:', fetchResponse.data)

                    let storedFollowUp = parseInt(localStorage.getItem('FollowUpCount'), 10);
                    storedFollowUp += 1;
                    console.log('hskfduhskdufhsduhfujhh',storedFollowUp);
                    localStorage.setItem('Count',storedFollowUp);
                    
                    const updatedFormData = {
                      ...formData,
                      Followup: storedFollowUp.toString(), // Store updated followup value
                    };
            
                    // Set updated form data
                    setFormData(updatedFormData);
            
                    const jsonData = JSON.stringify(updatedFormData);
                    console.log('Form Data to be sent:', jsonData);
                    
                    
                    
                    // setFormData({ ...formData, Followup: storedFollowUp });

                    // setFormData(prev => ({
                    //   ...prev,
                    //   Followup: '1232434', // make sure it's a string for input
                    // }));
                    // console.log('hererrerere inside fetch and patch');
                    // console.log('this si s a hdjsdjijfvnnn Form Data:', formData);
                
                    // const jsonData = JSON.stringify(formData);
                    // console.log('changing it to json data');
                    // console.log(jsonData);

                  try{
                    
                    const response = await axios.patch(`${config.API_BASE_URL}/visits/patch/${patient}/`, jsonData,{ headers: {
                        'Content-Type': 'application/json', // Ensure content type is JSON
                      },});
                      
                      // Check if the request was successful
                      if (response.status === 200) {
                        console.log('Patient added successfully:', response.data);
                        alert('Patient has been successfully added!');
                      } else {
                        console.error('Failed to add Patient');
                        alert('Failed to add Patient');
                        
                      }
                  }
                  catch(error){
                    alert('Something went wrong.Try again');
                   
                  }
    

              }
              
          // Send POST request with form data
        //   const response = await axios.post(`${config.API_BASE_URL}/visits/`, jsonData,{ headers: {
        //     'Content-Type': 'application/json', // Ensure content type is JSON
        //   },});
          
        //   // Check if the request was successful
        //   if (response.status === 201) {
        //     console.log('Patient added successfully:', response.data);
        //     alert('Patient has been successfully added!');
        //   } else {
        //     console.error('Failed to add Patient');
        //     alert('Failed to add Patient');
            
        //   }
        } catch (error) {

          
          if(error.response.data.error === "No recent visits found for this patient"){
            
              try{
                const FollowWillBeOne=1
                    const updatedFormData = {
                      ...formData,
                      Followup: FollowWillBeOne.toString(),
                      CrNo:patient // Store updated followup value
                    };
                    setFormData(updatedFormData);
                    const jsonData = JSON.stringify(updatedFormData);
                    console.log('Form Data to be sent:', jsonData);
                console.log("we are hwewerwerfjkdfj");
                 console.log(jsonData);
                const postresponse = await axios.post(`${config.API_BASE_URL}/visits/`, jsonData,{ headers: {
                      'Content-Type': 'application/json', // Ensure content type is JSON
                    },});
                    
                    // Check if the request was successful
                    if (postresponse.status === 201) {
                      console.log('Patient added successfully:', postresponse.data);
                      alert('Patient has been successfully added!');
                    } else {
                      console.error('Failed to add Patient');
                      alert('Failed to add Patient');
                      
                    }

              }
              catch(error){
                alert('Something went wrong.Try again wehn pposssst');
                console.error('Error during POST request:', error);
              }



          }
          else{
                alert('Something went wrong.Try again');
          }
          
        }
        
        onClose();
    };
    // useEffect(() => {
    //   // Optionally initialize Followup from localStorage when component mounts
    //   const storedFollowUp = localStorage.getItem('Count');
    //   if (storedFollowUp) {
    //     setFormData((prev) => ({ ...prev, Followup: storedFollowUp }));
    //   }
    // }, []);
    return (
      <div className="form-container admin-form">
        <div className="form-content">
          <div className="form-header">
            <h2 className="form-title">Add Old Patients</h2>
            <button className="close-button" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">CR Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.CrNo}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // setFormData({ ...formData, CrNo: newValue });
                    localStorage.setItem('CrNo',newValue);
                    console.log('local storage crno',localStorage.getItem('CrNo'));

                }}
                required
              />
            </div>
            <button type="submit" className="form-button">
              Add Old Patient
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  AddOldPatients.propTypes = {
    onClose: PropTypes.func.isRequired
  };
  
  export default AddOldPatients;