# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
 STARTING THE frontend: npm run dev
1. Login Page(admin.css + admin.jsx)
    User Cannot Register Himself  only admin Has the authority to do so
    Login Page is designed inside Dashboard.css file also Admin.css
    if the Password and the Username Matches user can log in easily
full code:
    .admin-dashboard {
  background-color: #f8fafc;
}

.admin-card {
  border-left: 4px solid #4299e1;
  transition: all 0.3s ease;
  background-color: white;
  border-radius: 8px; /* Slightly smaller rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Slightly smaller shadow */
  padding: 16px; /* Reduced padding inside the card */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
  height: 250px; /* Added a fixed height to reduce vertical space */
  overflow: hidden; 
  width: 100%;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.admin-icon {
  color: #4299e1;
}

.admin-title {
  color: #2c5282;
}

.admin-description {
  color: #4a5568;
}

/* Admin form modal styles */
.admin-modal {
  background-color: rgba(0, 0, 0, 0.75);
}

.admin-modal-content {
  border-top: 4px solid #4299e1;
  max-width: 32rem;
}

.admin-modal-header {
  background-color: #ebf8ff;
}

.admin-button {
  background-color: #4299e1;
  color: white;
  transition: background-color 0.2s;
}

.admin-button:hover {
  background-color: #3182ce;
}



2. forget Password(page inspired from Dashboard design) inside Forgotpassword.jsx+ForgotPassword.css
    it has OTP system using twilio
    made using the Otp generate function in the backend which uses a 4 digit Otp generated using random
    data gets stored into the otp store database
    after the setting up of new password the otp gets deleted including the otp's which aren't verified as well
/* box in center  with background colour*/
  .forgot-password-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f8fafc;
    padding: 20px;
    box-sizing: border-box;
  }
  /*Style of box*/
  .forgot-password-container {
    border-left: 4px solid #4299e1;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 400px;
    transition: transform 0.3s ease;
  }
  /*Animation*/
  .forgot-password-container:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
  /*Heading style*/
  .forgot-password-container h2 {
    color: #2c5282;
    margin-bottom: 20px;
    text-align: center;
  }
  /*input taking box*/
  .forgot-password-container input {
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  .forgot-password-container input:focus {
    border-color: #4299e1;
    outline: none;
  }
  /*Submit Button*/
  .forgot-password-container button {
    width: 100%;
    padding: 10px;
    background-color: #4299e1;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  /*hover*/
  .forgot-password-container button:hover {
    background-color: #3182ce;
  }
  /*Error Messages and Successful */
  .message {
    text-align: center;
    margin-top: 10px;
    color: #d9534f;
    font-weight: bold;
  }
  /*hints for the user about number entering*/
  .hint {
    font-size: 0.85rem;
    color: #666;
    text-align: center;
    margin-top: 4px;
  }


3. Change Password inside Changepassword.jsx
    for verification it checks for the old password which the  user has to enter
    which has to match with the password in the database already set
    if it matches the user can set new Password
    /* box in center */
.change-password-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 20px;
  box-sizing: border-box;
}
/*BOX STYLE*/
.change-password-container {
  border-left: 4px solid #4299e1;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease;
}
/*HOVER effect*/
.change-password-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
/*Head styling*/
.change-password-container h2 {
  color: #2c5282;
  margin-bottom: 20px;
  text-align: center;
}

.change-password-container form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
/*input taking*/
.change-password-container input {
  margin-bottom: 15px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
/*Changing password box Border*/
.change-password-container input:focus {
  border-color: #4299e1;
  outline: none;
}
/*Change Password  Button*/
.change-password-container button {
  padding: 10px;
  background-color: #4299e1;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
/*hovering effect on the button*/
.change-password-container button:hover {
  background-color: #3182ce;
}
/* Succesful or error message*/
.message {
  text-align: center;
  margin-bottom: 15px;
  color: #d9534f;
  font-weight: bold;
}
/* if needed*/
.hint {
  font-size: 0.85rem;
  color: #666;
  margin-top: 4px;
  margin-bottom: 10px;
}