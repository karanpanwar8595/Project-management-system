import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import axios from 'axios';


const Login = ({ onDataFromChild }) => {
  const [username, setUsername] = useState('');
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

      axios.post('http://127.0.0.1:8000/api/login/').then((response) => {
        console.log(response.data)
        sendLoginDataToParent(response.data)

      }, (error) => {
        sendLoginDataToParent(false)
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
            value={username}
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
