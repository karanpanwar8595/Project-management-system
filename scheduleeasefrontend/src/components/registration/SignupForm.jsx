import React, { useState } from 'react';
import './SignupFormStyles.css'; // Import CSS file

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [firstName, setFirstName] = useState('');

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputValue));
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmit = () => {
    if (!isValidEmail || !selectedRole || !firstName) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    console.log('Form submitted successfully!');
  };

  return (
    <div className="signup-content">
      <div className="signup-title">
        <form className="signup-form">
          <label htmlFor="email" className="signup-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            className="signup-input"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

          <label htmlFor="image" className="signup-label">
            Photo:
          </label>
          <input type="file" id="image" className="signup-input" placeholder="photo" />
          <br />

          <div className="signup-name-column">
            <label htmlFor="firstName" className="signup-label"></label>
            <input type="text" id="firstName" className="signup-input" placeholder="First name" />

            <label htmlFor="middleName" className="signup-label"></label>
            <input type="text" id="middleName" className="signup-input" placeholder="Middle name" />

            <label htmlFor="lastName" className="signup-label"></label>
            <input type="text" id="lastName" className="signup-input" placeholder="Last name" />
          </div>
          <br />

          <div className="signup-beside">
            <label htmlFor="gender" className="signup-label">
              Gender:
            </label>
            <select id="gender" className="signup-select">
              <option>choose gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <label htmlFor="role" className="signup-label">
              Role:
            </label>
            <select
              id="role"
              className="signup-select"
              onChange={handleRoleChange}
              value={selectedRole}
            >
              <option value="">Choose role</option>
              <option value="Admin">Admin</option>
              <option value="Team member">Team member</option>
              <option value="Manager">Manager</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <label htmlFor="dob" className="signup-label">
            Date of Birth:
          </label>
          <input type="date" id="dob" className="signup-input" />

          <label htmlFor="cityId" className="signup-label">
            Country:
          </label>
          <input type="text" id="cityId" className="signup-input" placeholder="Enter your country" />

          <label htmlFor="userStatus" className="signup-label">
            State:
          </label>
          <input type="text" id="userStatus" className="signup-input" placeholder="Enter your state" />

          <label htmlFor="profileStatus" className="signup-label">
            City:
          </label>
          <input
            type="text"
            id="profileStatus"
            className="signup-input"
            placeholder="Enter your city"
          />

          {selectedRole === 'Client' && (
            <>
              <label className="signup-label">
                <b> Company information </b>{' '}
              </label>
              <label htmlFor="companyName" className="signup-label">
                Company Name:
              </label>
              <input type="text" id="companyName" className="signup-input" placeholder="Company name" />

              <label htmlFor="gstNumber" className="signup-label">
                GST Number:
              </label>
              <input type="text" id="gstNumber" className="signup-input" placeholder="Gst number" />

              <label htmlFor="companyAddress" className="signup-label">
                Company Address:
              </label>
              <input
                type="text"
                id="companyAddress"
                className="signup-input"
                placeholder="Company address"
              />

              <label htmlFor="companyCity" className="signup-label">
                Company country:
              </label>
              <input
                type="text"
                id="companyCity"
                className="signup-input"
                placeholder="Company country"
              />

              <label htmlFor="companyState" className="signup-label">
                Company State:
              </label>
              <input
                type="text"
                id="companyState"
                className="signup-input"
                placeholder="Company state"
              />

              <label htmlFor="companyCountry" className="signup-label">
                Company city:
              </label>
              <input
                type="text"
                id="companyCountry"
                className="signup-input"
                placeholder="Company city"
              />

              <label htmlFor="companyPhone" className="signup-label">
                Company Phone:
              </label>
              <input
                type="tel"
                id="companyPhone"
                className="signup-input"
                placeholder="Company phone"
              />
            </>
          )}

          <br />

          <a href="#">
            <button type="button" className="buttonsignup" onClick={handleSubmit}>
              Submit
            </button>
          </a>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;



// import React, { useState } from 'react';
// import './SignupFormStyles.css'; // Import CSS file

// const SignupForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState('');
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [firstName, setFirstName] = useState('');

//   const togglePassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleEmailChange = (e) => {
//     const inputValue = e.target.value;
//     setEmail(inputValue);

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(inputValue));
//   };

//   const handleRoleChange = (e) => {
//     setSelectedRole(e.target.value);
//   };

//   const handleSubmit = () => {
//     if (!isValidEmail || !selectedRole || !firstName) {
//       alert('Please fill out all required fields correctly.');
//       return;
//     }

//     console.log('Form submitted successfully!');
//   };

//   return (
//     <div className="form-container">
//       <div className="form-content">
//         <form>
//           <label htmlFor="email" className="form-label">
//             Email:
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="form-input"
//             placeholder="Email"
//             value={email}
//             onChange={handleEmailChange}
//           />
//           {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}

//           <label htmlFor="image" className="form-label">
//             Photo:
//           </label>
//           <input type="file" id="image" className="form-input" placeholder="photo" />
//           <br />

//           <div className="name-column">
//             <label htmlFor="firstName" className="form-label"></label>
//             <input type="text" id="firstName" className="form-input" placeholder="First name" />

//             <label htmlFor="middleName" className="form-label"></label>
//             <input type="text" id="middleName" className="form-input" placeholder="Middle name" />

//             <label htmlFor="lastName" className="form-label"></label>
//             <input type="text" id="lastName" className="form-input" placeholder="Last name" />
//           </div>
//           <br />

//           <div className="form-flex">
//             <label htmlFor="gender" className="form-label">
//               Gender:
//             </label>
//             <select id="gender" className="form-select">
//               <option>choose gender</option>
//               <option>Male</option>
//               <option>Female</option>
//               <option>Other</option>
//             </select>

//             <label htmlFor="role" className="form-label">
//               Role:
//             </label>
//             <select id="role" className="form-select" onChange={handleRoleChange} value={selectedRole}>
//               <option value="">Choose role</option>
//               <option value="Admin">Admin</option>
//               <option value="Team member">Team member</option>
//               <option value="Manager">Manager</option>
//               <option value="Client">Client</option>
//             </select>
//           </div>

//           <label htmlFor="dob" className="form-label">
//             Date of Birth:
//           </label>
//           <input type="date" id="dob" className="form-input" />

//           <label htmlFor="cityId" className="form-label">
//             Country:
//           </label>
//           <input type="text" id="cityId" className="form-input" placeholder="Enter your country" />

//           <label htmlFor="userStatus" className="form-label">
//             State:
//           </label>
//           <input type="text" id="userStatus" className="form-input" placeholder="Enter your state" />

//           <label htmlFor="profileStatus" className="form-label">
//             City:
//           </label>
//           <input type="text" id="profileStatus" className="form-input" placeholder="Enter your city" />

//           {selectedRole === 'Client' && (
//             <>
//               <label className="form-label">
//                 <b> Company information </b>{' '}
//               </label>
//               <label htmlFor="companyName" className="form-label">
//                 Company Name:
//               </label>
//               <input type="text" id="companyName" className="form-input" placeholder="Company name" />

//               <label htmlFor="gstNumber" className="form-label">
//                 GST Number:
//               </label>
//               <input type="text" id="gstNumber" className="form-input" placeholder="Gst number" />

//               <label htmlFor="companyAddress" className="form-label">
//                 Company Address:
//               </label>
//               <input type="text" id="companyAddress" className="form-input" placeholder="Company address" />

//               <label htmlFor="companyCity" className="form-label">
//                 Company country:
//               </label>
//               <input type="text" id="companyCity" className="form-input" placeholder="Company country" />

//               <label htmlFor="companyState" className="form-label">
//                 Company State:
//               </label>
//               <input type="text" id="companyState" className="form-input" placeholder="Company state" />

//               <label htmlFor="companyCountry" className="form-label">
//                 Company city:
//               </label>
//               <input type="text" id="companyCountry" className="form-input" placeholder="Company city" />

//               <label htmlFor="companyPhone" className="form-label">
//                 Company Phone:
//               </label>
//               <input type="tel" id="companyPhone" className="form-input" placeholder="Company phone" />
//             </>
//           )}

//           <br />

//           <a href="/Welcome">
//             <button type="button" className="form-button" onClick={handleSubmit}>
//               Submit
//             </button>
//           </a>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignupForm;
