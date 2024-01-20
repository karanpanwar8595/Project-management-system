import React, { useState } from 'react';
import './UpdateProfile.css'; // Updated CSS file name

const UserProfileForm = () => {
  const [userEmail, setUserEmail] = useState('bgaa@example.com');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedUserRole, setSelectedUserRole] = useState('Client');
  const [isFormValid, setIsFormValid] = useState(true);

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    // Basic email validation
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
  };

  const handleRoleChange = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form validation checks
    if (!isValidEmail || !userEmail) {
      setIsFormValid(false);
      return;
    }

    // Reset form validation state if it was previously invalid
    setIsFormValid(true);

    // Your form submission logic here
    // ...

    console.log('Form submitted successfully!');
  };

  return (
    <div className="user-profile-form-container">
      <div className="form-content">
        <form>
          <h2>Update Profile </h2>

          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            placeholder="Email"
            value={userEmail}
            onChange={handleEmailChange}
            readOnly // Make the email field read-only
            required // This field is required
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

          <label htmlFor="image">Photo:</label>
          <input type="file" id="image" placeholder="Photo" />
          <br />

          <div className="name-column">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" id="firstName" value="b" readOnly required />

            <label htmlFor="middleName">Middle Name:</label>
            <input type="text" id="middleName" value="g" readOnly />

            <label htmlFor="lastName">Last Name:</label>
            <input type="text" id="lastName" value="aa" readOnly required />
          </div>

          <div className="beside">
            <label htmlFor="gender">Gender:</label>
            <select id="gender" required>
              <option value="">Choose gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label htmlFor="user-role">Role:</label>
            <select id="user-role" onChange={handleRoleChange} value={selectedUserRole} required>
              <option value="">Choose role</option>
              <option value="Admin">Admin</option>
              <option value="Team member">Team member</option>
              <option value="Manager">Manager</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <label htmlFor="dob">Date of Birth:</label>
          <input type="date" id="dob" required />

          <label htmlFor="cityId">Country:</label>
          <input type="text" id="cityId" placeholder="Enter your country" required />

          <label htmlFor="userStatus">State:</label>
          <input type="text" id="userStatus" placeholder="Enter your state" required />

          <label htmlFor="profileStatus">City:</label>
          <input type="text" id="profileStatus" placeholder="Enter your city" required />

          {selectedUserRole === 'Client' && (
            <>
              <label>
                <b>Company information</b>
              </label>
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" placeholder="Company name" required />

              <label htmlFor="gstNumber">GST Number:</label>
              <input type="text" id="gstNumber" placeholder="GST number" required />

              <label htmlFor="companyAddress">Company Address:</label>
              <input type="text" id="companyAddress" placeholder="Company address" required />

              <label htmlFor="companyCity">Company Country:</label>
              <input type="text" id="companyCity" placeholder="Company country" required />

              <label htmlFor="companyState">Company State:</label>
              <input type="text" id="companyState" placeholder="Company state" required />

              <label htmlFor="companyCountry">Company City:</label>
              <input type="text" id="companyCountry" placeholder="Company city" required />

              <label htmlFor="companyPhone">Company Phone:</label>
              <input type="tel" id="companyPhone" placeholder="Company phone" required />
            </>
          )}

          <br />
          {!isFormValid && <p className="error-message">Please fill in all required fields correctly</p>}
          <br />
          <button id="update-profile-buttton" type="submit" onClick={handleSubmit}>
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfileForm;


  



// import React, { useState } from 'react';
// import './UpdateProfile.css'; // Updated CSS file name

// const UserProfileForm = () => {
//   const [userEmail, setUserEmail] = useState('bgaa@example.com');
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [selectedUserRole, setSelectedUserRole] = useState('');

//   const handleEmailChange = (e) => {
//     e.preventDefault();
//     // Add your email change logic if needed
//   };

//   const handleRoleChange = (e) => {
//     setSelectedUserRole(e.target.value);
//   };

//   const handleSubmit = () => {
//     // Your form submission logic goes here
//     // Access form fields using their respective IDs (e.g., document.getElementById('user-email').value)

//     // Assuming the form submission is successful
//     const isUpdateSuccessful = true;

//     if (isUpdateSuccessful) {
//       const confirmation = window.confirm("Update information successfully!");

//       if (confirmation) {
//         // Perform any additional action if the user clicks OK in the confirmation prompt
//         // For example, redirect to another page or perform other actions
//       }
//     }
//   };

//   return (
//     <div className="user-profile-form-container">
//       <div className="form-content">
//         <form>
//           <h2>Update Profile </h2>

//           <label  htmlFor="user-email">Email:</label>
//           <input
//             type="email"
//             id="user-email"
//             placeholder="Email"
//             value={userEmail}
//             onChange={handleEmailChange}
//             readOnly // Make the email field read-only
//           />
//           {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

//           <label htmlFor="image">Photo:</label>
//           <input type="file" id="image" placeholder="Photo" />
//           <br />

//           <div className="name-column">
//             <label htmlFor="firstName">First Name:</label>
//             <input type="text" id="firstName" value="baburao" readOnly />

//             <label htmlFor="middleName">Middle Name:</label>
//             <input type="text" id="middleName" value="ganpatrao" readOnly />

//             <label htmlFor="lastName">Last Name:</label>
//             <input type="text" id="lastName" value="aapte" readOnly />
//           </div>

//           <div className="beside">
//             <label htmlFor="gender">Gender:</label>
//             <select id="gender">
//               <option>Choose gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>

//             <label htmlFor="user-role">Role:</label>
//             <select id="user-role" onChange={handleRoleChange} value={selectedUserRole}>
//               <option value="">Choose role</option>
//               <option value="Admin">Admin</option>
//               <option value="Team member">Team member</option>
//               <option value="Manager">Manager</option>
//               <option value="Client">Client</option>
//             </select>
//           </div>

//           <label htmlFor="dob">Date of Birth:</label>
//           <input type="date" id="dob" />

//           <label htmlFor="cityId">Country:</label>
//           <input type="text" id="cityId" placeholder="Enter your country" />

//           <label htmlFor="userStatus">State:</label>
//           <input type="text" id="userStatus" placeholder="Enter your state" />

//           <label htmlFor="profileStatus">City:</label>
//           <input type="text" id="profileStatus" placeholder="Enter your city" />

//           {selectedUserRole === 'Client' && (
//             <>
//               <label>
//                 <b>Company information</b>
//               </label>
//               <label htmlFor="companyName">Company Name:</label>
//               <input type="text" id="companyName" placeholder="Company name" />

//               <label htmlFor="gstNumber">GST Number:</label>
//               <input type="text" id="gstNumber" placeholder="GST number" />

//               <label htmlFor="companyAddress">Company Address:</label>
//               <input type="text" id="companyAddress" placeholder="Company address" />

//               <label htmlFor="companyCity">Company Country:</label>
//               <input type="text" id="companyCity" placeholder="Company country" />

//               <label htmlFor="companyState">Company State:</label>
//               <input type="text" id="companyState" placeholder="Company state" />

//               <label htmlFor="companyCountry">Company City:</label>
//               <input type="text" id="companyCountry" placeholder="Company city" />

//               <label htmlFor="companyPhone">Company Phone:</label>
//               <input type="tel" id="companyPhone" placeholder="Company phone" />
//             </>
//           )}

//           <br />
// <br />
//           <button id="update-profile-button"type="button" onClick={handleSubmit}>
//             Update Information
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserProfileForm;



