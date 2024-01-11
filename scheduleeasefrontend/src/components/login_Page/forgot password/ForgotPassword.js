import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [inputemail, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const forgotpasswordemailcretentials = { forgotpasswordemail: inputemail };
    axios.post('http://127.0.0.1:8000/api/forgetpassword/', forgotpasswordemailcretentials).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  };

  // Inline CSS for the submit button
  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: 'blue',  // Change this to your desired color
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div className={styles.forgotPasswordContainer_aBcD}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm_aBcD}>
        <label htmlFor="email">Enter your Email:</label>
        <input
          type="email"
          id="email"
          value={inputemail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button id="forgot-button_aBcD" type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
