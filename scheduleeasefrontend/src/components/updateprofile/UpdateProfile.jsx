import React, { useState } from 'react';
import './UpdateProfile.css'; // Import CSS file

const UpdateProfile = () => {
  const [email, setEmail] = useState('bgaa@example.com');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');

  const handleEmailChange = (e) => {
    e.preventDefault();
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = () => {
    // Your form submission logic goes here
    // Access form fields using their respective IDs (e.g., document.getElementById('email').value)

    // Assuming the form submission is successful
    const isUpdateSuccessful = true;

    if (isUpdateSuccessful) {
      const confirmation = window.confirm("Update information successfully!");

      if (confirmation) {
        // Perform any additional action if the user clicks OK in the confirmation prompt
        // For example, redirect to another page or perform other actions
      }
    }
  };

  return (
    <div className="update-profile-container">
      <div className="profile-content">
        <form>
          <h2>Update User Details</h2>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            readOnly // Make the email field read-only
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

          <label htmlFor="image">Photo:</label>
          <input type="file" id="image" placeholder="Photo" />
          <br />

          <div className="name-column">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value="baburao" readOnly />

            <label htmlFor="middleName">Middle Name:</label>
            <input type="text" id="middleName" value="ganpatrao" readOnly />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value="aapte" readOnly />
          </div>

          <div className="beside">
            <label htmlFor="gender">Gender:</label>
            <select id="gender">
              <option>Choose gender</option>
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
              <label>
                <b>Company information</b>
              </label>
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" placeholder="Company name" />

              <label htmlFor="gstNumber">GST Number:</label>
              <input type="text" id="gstNumber" placeholder="GST number" />

              <label htmlFor="companyAddress">Company Address:</label>
              <input type="text" id="companyAddress" placeholder="Company address" />

              <label htmlFor="companyCity">Company Country:</label>
              <input type="text" id="companyCity" placeholder="Company country" />

              <label htmlFor="companyState">Company State:</label>
              <input type="text" id="companyState" placeholder="Company state" />

              <label htmlFor="companyCountry">Company City:</label>
              <input type="text" id="companyCountry" placeholder="Company city" />

              <label htmlFor="companyPhone">Company Phone:</label>
              <input type="tel" id="companyPhone" placeholder="Company phone" />
            </>
          )}

          <br />

          <button id="" type="button" onClick={handleSubmit}>
            Update information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
