import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [inputEmail, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    // Regular expression for a simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateEmail(inputEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const forgotPasswordEmailCredentials = { forgotpasswordemail: inputEmail };

    axios.post('http://127.0.0.1:8000/api/forgetpassword/', forgotPasswordEmailCredentials)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    alert("Temporary password has been sent to the specified email")
  };

  const buttonStyle = {
    padding: '6px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    letterSpacing: '4px',
    borderRadius: '8px',
    backgroundColor: '#3498db',
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
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage('');
          }}
          required
        />
        <br />
        <br />
        <br />
        <button id="forgot-button" type="submit" style={buttonStyle}>
          Submit
        </button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
