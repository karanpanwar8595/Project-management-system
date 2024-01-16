
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';


const Login = ({ onDataFromChild }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidEmail,setIsValidEmail]=useState(true)
  const sendLoginDataToParent = (authenticationcode) => {
    onDataFromChild(authenticationcode);
  };
const handleEmailInput=(e)=>{
  const inputValue = e.target.value;
    setUsername(inputValue);
    if (email == " "){
      setIsValidEmail(true)
    }
    setIsValidEmail(/\S+@\S+\.\S+/.test(inputValue));

  };





  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
  
      // Basic validation
      if (!email || !password || !isValidEmail) {
       
        setError('Please enter both email and password correctly.');
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
        setError('Email does not exists.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginFOrmContainer'>
      <div className="loginFOrm">
        <h2 className="loginName">Login</h2>
        <div className="inputGRoup">
          <i className="fa fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            className={"inputTExt"}
            autoComplete="off"
            value={email}
            onChange={handleEmailInput}
          />
        </div>
        {isValidEmail ? (
  <>
    
  </>
) : (
  <div className='emailnotvalid'>Enter a valid Email</div>
)}
        <div className="inputGRoup">
          <i className="fa fa-unlock-alt"></i>
          <input
            type="password"
            placeholder="Password"
            className="inputTExt"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
<br />
        <div className="buttonGroup">
      <button
        className="loginButton"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
    <br />
    <br />
      
        {error && <div className="error">{error}</div>}
        <div className="footer">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
