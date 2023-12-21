import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Authentication successful
        console.log('Login successful');
        // Redirect the user or update UI as needed
      } else {
        // Authentication failed
        const data = await response.json();
        setError(data.message || 'Login failed');
      }
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
          <a href="forgot-password">Forgot Password?</a>
          <a href="signup">SignUp</a>
                  </div>
      </div>
    </div>
  );
};

export default Login;
