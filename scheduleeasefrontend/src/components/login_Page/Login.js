
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';


const Login = ({ onDataFromChild }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendLoginDataToParent = (authenticationcode) => {
    onDataFromChild(authenticationcode);
  };




  const buttonStyles = {
    buttonGroup: { },
    loginButton: {
      
      padding: '6px 100px',
    fontSize: '16px',
    position: 'absolute',
    zIndex: 10,
    cursor: 'pointer',
    fontSize: '22px',
    letterSpacing: '2px',
    border: '2px solid black',
    borderRadius: '50px',
    backgroundColor: 'skyblue',
    display: 'flex',
    justifyContent: 'flex-end',  // Adjusted to move the button to the right
    alignItems: 'center',
      
    
      
      ':disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },
    },
  };



  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
  
      // Basic validation
      if (!email || !password) {
       
        setError('Please enter both email and password.');
        setLoading(false);
        return;
      }
  
      const loginCredentials = { loginemail: email, loginpassword: password };
      const response = await axios.post('http://127.0.0.1:8000/api/login/', loginCredentials);
  
      if (response.data['value']) {
        sendLoginDataToParent(response.data);
        console.log('true');
      } else {
        sendLoginDataToParent({ value: false });
        setUsername('');
        setPassword('');
        console.log('false');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginFOrmContainer}>
      <div className={styles.loginFOrm}>
        <h2 className={styles.loginName}>Login</h2>
        <div className={styles.inputGroup}>
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            className={styles.inputTExt}
            autoComplete="off"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGRoup}>
          <i className="fa fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            className={styles.inputTExt}
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
<br />



        <div style={buttonStyles.buttonGroup}>
      <button
        style={buttonStyles.loginButton}
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Submit'}
      </button>
    </div>
    <br />
    <br />
      
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.footer}>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
