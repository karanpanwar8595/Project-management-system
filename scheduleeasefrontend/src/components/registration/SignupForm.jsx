
import React, { useState } from 'react';
import './SignupFormStyles.css'; // Import CSS file

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputValue));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = () => {
    // Your form submission logic goes here
    // You can access form fields using their respective IDs (e.g., document.getElementById('email').value)
  };

  return (
    <div className="sign-container">
      <div className="sign-content">
        <form>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

          <label htmlFor="image">Photo:</label>
          <input type="file" id="image" placeholder="photo" />
          <br />

          <div className="name-column">
            <label htmlFor="firstName"></label>
            <input type="text" id="firstName" placeholder="First name" />

            <label htmlFor="middleName"></label>
            <input type="text" id="middleName" placeholder="Middle name" />

            <label htmlFor="lastName"></label>
            <input type="text" id="lastName" placeholder="Last name" />
          </div>
          <br />

          <div className="beside">
            <label htmlFor="gender">Gender:</label>
            <select id="gender">
              <option>choose gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label htmlFor="role">Role:</label>
            <select id="role" onChange={handleRoleChange} value={selectedRole}>
              <option value="">Choose role</option>
              <option value="Admin">Admin</option>
              <option value="Team member">Team member</option>
              <option value="Manager">Manager</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" />

          <label htmlFor="cityId">Country :</label>
          <input type="text" id="cityId" placeholder="Enter your country" />

          <label htmlFor="userStatus">State:</label>
          <input type="text" id="userStatus" placeholder="Enter your state" />

          <label htmlFor="profileStatus">City:</label>
          <input type="text" id="profileStatus" placeholder="Enter your city" />

          {selectedRole === 'Client' && (
            <>
            <label> <b> Company information </b> </label>
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" placeholder="Company name" />

              <label htmlFor="gstNumber">GST Number:</label>
              <input type="text" id="gstNumber" placeholder="Gst number" />

              <label htmlFor="companyAddress">Company Address:</label>
              <input type="text" id="companyAddress" placeholder="Company address" />

              <label htmlFor="companyCity">Company country:</label>
              <input type="text" id="companyCity" placeholder="Company country" />

              <label htmlFor="companyState">Company State:</label>
              <input type="text" id="companyState" placeholder="Company state" />

              <label htmlFor="companyCountry">Company city:</label>
              <input type="text" id="companyCountry" placeholder="Company city" />

              <label htmlFor="companyPhone">Company Phone:</label>
              <input type="tel" id="companyPhone" placeholder="Company phone" />
            </>
          )}

          

          <br />

          <a href="/Welcome">
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;







