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

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      const logincretentials = { loginemail: email, loginpassword: password }
      axios.post('http://127.0.0.1:8000/api/login/', logincretentials).then((response) => {
        console.log(response)
        if (response.data['value']) {
          sendLoginDataToParent(response.data)
          console.log('true')
        }
        else{
          sendLoginDataToParent({value : false})
          setUsername('')
          setPassword('')
          console.log('false')
        }
      }, (error) => {
        console.log(error)
        sendLoginDataToParent({value : false})
      });

    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginForm}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            className={styles.inputText}
            autoComplete="off"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <i className="fa fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            className={styles.inputText}
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.buttonGroup} id="loginButton">
          <button onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.footer}>
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
