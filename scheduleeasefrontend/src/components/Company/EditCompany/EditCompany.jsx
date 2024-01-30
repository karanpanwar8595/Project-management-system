import React, { useState } from 'react';
import './EditCompany.css'
import { useLocation } from 'react-router-dom';
const AddCompany = () => {


const location = useLocation();

    const companydetails = location.state.companydetails
    console.log('company',companydetails);
  // State variables for each input field
  const [companyName, setCompanyName] = useState(companydetails.name);
  const [gstNumber, setGstNumber] = useState(companydetails.gstnumber);
  const [companyAddress, setCompanyAddress] = useState(companydetails.address);
  const [companyPhone, setCompanyPhone] = useState(companydetails.phonenumber);
  // State variables for validation
  const [isCompanyNameValid, setCompanyNameValid] = useState(true);
  const [isGstNumberValid, setGstNumberValid] = useState(true);
  const [isCompanyAddressValid, setCompanyAddressValid] = useState(true);
  const [isCompanyPhoneValid, setCompanyPhoneValid] = useState(true);

  // Event handlers for input changes and validation
  const handleCompanyNameChange = (event) => {
    const value = event.target.value;
    const containsOnlyDigits = /^\d+$/.test(value);
    const startsWithDigit = /^\d/.test(value);
    const repeated = /^(.)\1+$/.test(value);

    setCompanyName(value);
    setCompanyNameValid(!startsWithDigit && !repeated && !containsOnlyDigits && !!value); // Simple validation, ensuring it's not empty
  };

  const handleGstNumberChange = (event) => {
    const value = event.target.value;
    
    setGstNumber(value);

    setGstNumberValid( gstNumber.length === 14); 
  };

  const handleCompanyAddressChange = (event) => {
    const value = event.target.value;
    setCompanyAddress(value);
    
    const containsOnlyDigits = /^\d+$/.test(value);


    setCompanyAddressValid(!containsOnlyDigits && !!value); // Simple validation, ensuring it's not empty
  };

  const handleCompanyPhoneChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/\D/g, '');
    setCompanyPhone(numericValue);

    setCompanyPhoneValid(/^\d{10}$/.test(value)); // Validation for a 10-digit phone number
  };

  const handleSubmit = () => {
    // Perform additional validation or submit logic here
    // For example, you can check if all fields are valid before submitting
    if (companyName==''){
        setCompanyNameValid(false);

    }
    if (companyPhone==''){
        setCompanyPhoneValid(false);


    }
    if (companyAddress==''){
        setCompanyAddressValid(false);


    }
    if (gstNumber==''){
        setGstNumberValid(false);
    }
    if (isCompanyNameValid && isGstNumberValid && isCompanyAddressValid && isCompanyPhoneValid) {
      // Submit logic here
      console.log('Form submitted:', {
        companyName,
        gstNumber,
        companyAddress,
        companyPhone,
      });
    } else {
      // Display an error message or handle invalid form submission
      console.error('Form is not valid. Please check the fields.');
    }
  };

  return (
    <div className='company-container'>
      <label className="signup-label">
        <b> <h2>Edit Company Information</h2>  </b>{' '}
      </label>
      <div className="input-container">
        <label htmlFor="companyName" className="signup-label">
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          className={`signup-input ${!isCompanyNameValid ? 'invalid' : ''}`}
          placeholder="Company name"
          value={companyName}
          onChange={handleCompanyNameChange}
        />
        {!isCompanyNameValid && (
          <span className="error-message">Enter a valid Company Name</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="gstNumber" className="signup-label">
          GST Number:
        </label>
        <input
          type="text"
          id="gstNumber"
          className={`signup-input ${!isGstNumberValid ? 'invalid' : ''}`}
          placeholder="Gst number"
          value={gstNumber}
          onChange={handleGstNumberChange}
          disabled
        />
        {!isGstNumberValid && (
          <span className="error-message">Enter a valid GST Number</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="companyAddress" className="signup-label">
          Company Address:
        </label>
        <input
          type="text"
          id="companyAddress"
          className={`signup-input ${!isCompanyAddressValid ? 'invalid' : ''}`}
          placeholder="Company address"
          value={companyAddress}
          onChange={handleCompanyAddressChange}
        />
        {!isCompanyAddressValid && (
          <span className="error-message">Enter a Valid Company Address</span>
        )}
      </div>

      <div className="input-container">
        <label htmlFor="companyPhone" className="signup-label">
          Company Phone:
        </label>
        <input
          type="tel"
          id="companyPhone"
          className={`signup-input ${!isCompanyPhoneValid ? 'invalid' : ''}`}
          placeholder="Company phone"
          value={companyPhone}
          onChange={handleCompanyPhoneChange}
        />
        {!isCompanyPhoneValid && (
          <span className="error-message">
            Please enter a valid 10-digit phone number
          </span>
        )}
      </div>

      <div className='newcompanybutton' onClick={handleSubmit}>
        Submit
      </div>
    </div>
  );
};

export default AddCompany;
