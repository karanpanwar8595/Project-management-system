// ForgotPassword.jsx

import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [inputEmail, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const forgotPasswordEmailCredentials = { forgotpasswordemail: inputEmail };
    axios.post('http://127.0.0.1:8000/api/forgetpassword/', forgotPasswordEmailCredentials)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buttonStyle = {
    padding: '6px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    letterSpacing: '4px',
    borderRadius: '8px',
    backgroundColor: '#0065fcff',
    border: 'none',
    color: 'white',
    marginLeft: '50px',
  };

  return (
    <div className={styles.forgotPasswordContainer}>
     
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
       
        <label htmlFor="email">Enter your Email:</label>
        <input
          type="email"
          id="email"
          value={inputEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />  <br />
        <br />
        <br />
        <button id="forgot-button" type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
