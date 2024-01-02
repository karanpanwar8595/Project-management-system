import React, { useState } from 'react';
import '.SignupFormStyles.js'; // Import your CSS file

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="form-title">Registration form</h1>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Email" />

          <label htmlFor="password">Password:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="myInput"
              placeholder="Password"
            />
            <input
              type="checkbox"
              onClick={togglePassword}
              style={{ marginLeft: '5px' }}
            />
          </div>

          <label htmlFor="image">Photo:</label>
          <input type="file" id="image" placeholder="photo" />

          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" placeholder="First name" />

          <label htmlFor="middleName">Middle Name:</label>
          <input type="text" id="middleName" placeholder="Middle name" />

          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" placeholder="Last name" />

          <div className="beside">
            <label htmlFor="gender">Gender:</label>
            <select id="gender">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label htmlFor="role">Role:</label>
            <select id="role">
              <option>Admin</option>
              <option>Team member</option>
              <option>Manager</option>
              <option>Client</option>
            </select>
          </div>

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" />

          <label htmlFor="cityId">City ID:</label>
          <input type="text" id="cityId" placeholder="City id" />

          <label htmlFor="userStatus">User Status:</label>
          <input type="text" id="userStatus" placeholder="User status" />

          <label htmlFor="profileStatus">Profile Status:</label>
          <input type="text" id="profileStatus" placeholder="Profile Status" />

          <label htmlFor="gstNumber">GST Number:</label>
          <input type="text" id="gstNumber" placeholder="Gst number" />

          <button type="button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
