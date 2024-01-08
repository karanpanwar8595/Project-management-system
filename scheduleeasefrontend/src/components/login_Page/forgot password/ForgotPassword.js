// ForgotPassword.js
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [inputemail, setEmail] = useState('');

  const handleSubmit = (event) => {

    event.preventDefault();
    const forgotpasswordemailcretentials = { forgotpasswordemail : inputemail }
    axios.post('http://127.0.0.1:8000/api/forgetpassword/', forgotpasswordemailcretentials).then((response) => {
      console.log(response)

    }, (error) => {
      console.log(error)
    });




  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
        <label htmlFor="email">Enter your Email:</label>
        <input
          type="email"
          id="email"
          value={inputemail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
