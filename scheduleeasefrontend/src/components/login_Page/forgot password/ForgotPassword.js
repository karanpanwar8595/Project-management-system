// ForgotPassword.js
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send a request to your backend to handle the password reset
    // fetch('/forgot-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert(data.message);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className={styles.forgotPasswordForm}>
        <label htmlFor="email">Enter your Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
