import React, { useEffect, useState } from 'react';
import './SignupForm.css';
import axios from 'axios';


const SignupForm = () => {
  // const [showPassword, setShowPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidDob, setIsValidDob] = useState(false);
  const [errors, setErrors] = useState(false);

  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDOB] = useState('');
  const [message, setMessage] = useState('');
  const [gstno, setGstNo] = useState('');

  // const [address, setAddress] = useState('');
  const handleGstNoClick = (gstno) => {
    setGstNo(gstno);
  }
    ;
  // Event handler for updating the address state
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };




  // countrydata
  const [countryValue, setCountryValue] = useState('');
  const [countryListItems, setCountryListItems] = useState(["No item", "hello"]);
  const [countryListItemsconst, setCountryListItemsconst] = useState(["No item", "hello"]);
  const [countryisListVisible, setcountryListVisible] = useState(false);


  const [stateValue, setStateValue] = useState('');
  const [stateListItems, setStateListItems] = useState([]);
  const [stateListItemsconst, setStateListItemsconst] = useState([]);
  const [stateisListVisible, setStateListVisible] = useState(false);

  // const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [cityListItems, setCityListItems] = useState([]);
  const [cityListItemsconst, setCityListItemsconst] = useState([]);
  const [cityisListVisible, setCityListVisible] = useState(false);
  // const [cityValue, setCityValue] = useState('');
  const [GstValue, setGstValue] = useState('');
  const [gstListItems, setGstListItems] = useState(["No item", "hello"]);
  const [gstnumberListItemsconst, setGstListItemsconst] = useState([]);
  const [gstisListVisible, setGstListVisible] = useState(false);
  // const [cityValue, setCityValue] = useState('');



  // Country function
  const handleCountryChange = (e) => {

    const value = e.target.value;
    // Filter the list based on the input value
    const filteredItems = countryListItemsconst.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredItems.length == 0) {
      return;
    }
    // Update the list with the filtered items
    setCountryListItems(filteredItems);
    setCountryValue(value);

  };

  const handleCountryItemClick = (itemName) => {
    setCountryValue(itemName);
    setStateValue("");
    setCityValue("");

  };

  const handleCountryInputFocus = () => {
    setcountryListVisible(true);
  };
  const statefetchData = async (country_id) => {
    console.log(country_id)
    try {
      const selcontry_id = { country_id: country_id }
      const response = await axios.post('http://127.0.0.1:8000/api/state/', selcontry_id);
      if (response.data.value) {
        setStateListItemsconst(response.data.data);
        setStateListItems(response.data.data);
      } else {
        console.log('Country loading failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleCountryInputBlur = () => {
    // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
    setTimeout(() => setcountryListVisible(false), 200);

  };


  // State function 

  const handleStateChange = (e) => {
    if (stateListItemsconst.length == 0) {
      return;
    }
    const value = e.target.value;
    // Filter the list based on the input value
    const filteredItems = stateListItemsconst.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredItems.length == 0) {
      return;
    }
    // Update the list with the filtered items
    setStateListItems(filteredItems);
    setStateValue(value);

  };

  const handleStateItemClick = (itemName) => {
    setStateValue(itemName);

  };

  const handleStateInputFocus = () => {
    setStateListVisible(true);
    for (const countryDetail in countryListItemsconst) {

      if (countryListItemsconst[countryDetail].name === countryValue) {
        // Assuming fetchData is a function that fetches data based on the country ID
        console.log(countryListItemsconst[countryDetail].id);
        statefetchData(countryListItemsconst[countryDetail].id);

      }
    }
  };

  const handleStateInputBlur = () => {
    // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
    setTimeout(() => setStateListVisible(false), 200);

  };

  // city function 

  const handleCityChange = (e) => {
    if (cityListItemsconst.length == 1) {
      return;
    }
    const value = e.target.value;

    // Filter the list based on the input value
    const filteredItems = cityListItemsconst.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredItems.length == 0) {
      return;
    }
    // Update the list with the filtered items
    setCityListItems(filteredItems);
    setCityValue(value);

  };

  const handleCityItemClick = (itemName) => {
    setCityValue(itemName);
  };
  const cityfetchData = async (state_id) => {
    console.log(state_id)
    try {
      const selstate_id = { state_id: state_id }
      const response = await axios.post('http://127.0.0.1:8000/api/city/', selstate_id);
      if (response.data.value) {
        setCityListItemsconst(response.data.data);
        setCityListItems(response.data.data);
      } else {
        console.log('Country loading failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleCityInputFocus = () => {
    setCityListVisible(true);
    for (const stateDetail in stateListItemsconst) {

      if (stateListItemsconst[stateDetail].name === stateValue) {
        // Assuming fetchData is a function that fetches data based on the country ID
        console.log(stateListItemsconst[stateDetail].id);
        cityfetchData(stateListItemsconst[stateDetail].id);

      }
    }
  };

  const handleCityInputBlur = () => {
    // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
    setTimeout(() => setCityListVisible(false), 200);
    console.log("blur");

  };



  // gst


  const handleGstChange = (e) => {
    const value = e.target.value;
    console.log()
    // Filter the list based on the input value
    const filteredItems = gstnumberListItemsconst.filter((gstnumber) =>
      gstnumber.name.toLowerCase().includes(value.toLowerCase())

    );
    if (filteredItems.length == 0) {
      return;
    }
    // Update the list with the filtered items
    setGstListItems(filteredItems);
    setGstValue(value);

  };

  const handleGstItemClick = (itemName) => {
    setGstValue(itemName);
  };
  const gstfetchData = async () => {
    // console.log(state_id)
    try {
      // const selstate_id = { state_id: state_id }
      const response = await axios.post('http://127.0.0.1:8000/api/allcompanydata/');
      if (response.data.value) {
        console.log(response.data.data);
        setGstListItemsconst(response.data.data);
        setGstListItems(response.data.data);
      } else {
        console.log('Country loading failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  const handleGstInputFocus = () => {
    setGstListVisible(true);

    gstfetchData();


  };

  const handleGstInputBlur = () => {
    // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
    setTimeout(() => setGstListVisible(false), 200);
    console.log("blur");

  };

  const submitButton = async () => {
    try {
      var cityId = 0;
      var role_id = 0;
      var gender_id = 0;
      for (const cityDetail in cityListItemsconst) {

        if (cityListItemsconst[cityDetail].name === cityValue) {
          // Assuming fetchData is a function that fetches data based on the country ID
          console.log(cityValue);
          cityId = cityListItemsconst[cityDetail].id;

        }
      }
      switch (selectedRole) {
        case "Admin":
          role_id = 0
          break;
        case "Manager":
          role_id = 1
          break;
        case "Team member":
          role_id = 2
          break;
        case "Client":
          role_id = 3
          break;
      }
      switch (gender) {
        case "Male":
          gender_id = 0
          break;
        case "Female":
          gender_id = 1
          break;

      }
      const regdata = {
        inputemail: email,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        address: address,
        userrole: role_id,
        usergender: gender_id,
        dateofbirth: dob,
        gst_no: gstno,
        city: cityId
      }
      const response = await axios.post('http://127.0.0.1:8000/api/registration/', regdata);
      if (response.data.value) {
        setEmail('');
        setFirstName('');
        setMiddleName('');
        setLastName("");
        setGender("");
        setCountryValue("");
        setStateValue("");
        setCityValue("");
        setSelectedRole("");
        setDOB("");
        setGstValue('');
        setAddress('');

        alert('Registration is done for ' + firstName + " " + middleName + " " + lastName);

      } else {
        console.log('registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }


  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(inputValue));
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("role", selectedRole);
    const today = new Date();  // Get today's date
    const dobDate = new Date(dob)
    dobDate.setDate(dobDate.getDate() + 15);
    const isAllNumbers = (/\d/.test(firstName)) || (/\d/.test(middleName) || (/\d/.test(lastName)));
    if (firstName && !/^[a-zA-Z0-9 ]*$/.test(firstName)) {
      setMessage("special character are not allowed in name ")
      setErrors(true)
      return;
    }
    if (middleName && !/^[a-zA-Z0-9 ]*$/.test(middleName)) {
      setMessage("special character are not allowed in name ")
      setErrors(true)
      return;
    }
    if (lastName && !/^[a-zA-Z0-9 ]*$/.test(lastName)) {
      setMessage("special character are not allowed in name ")
      setErrors(true)
      return;
    }


    if (/^(.)\1+$/.test(firstName)) {

      setMessage("Digits or Repeated characters are not allowed in First Name")
      setErrors(true)
      return;
    }
    if (/^(.)\1+$/.test(middleName)) {
      setMessage("Digits or Repeated characters are not allowed in Middle Name")
      setErrors(true)
      return;
    }
    if (/^(.)\1+$/.test(lastName)) {
      setMessage("Digits or Repeated characters are not allowed in Last Name")
      setErrors(true)
      return;
    }
    if (/^(.)\1+$/.test(address)) {
      setMessage("Repeated characters are not allowed in Address")
      setErrors(true)
      return;
    }
    const hasMinTwoLetters = /^[a-zA-Z]{2,}$/.test(firstName);



    if (isAllNumbers) {
      setMessage("Numbers are not allowed in name ")
      setErrors(true)
      console.error("All characters can't be numbers or the name is too short");
      return;

      // You can also throw an error or handle it according to your needs
    }
    else if (!hasMinTwoLetters) {
      setMessage("First name should have atleast two letter")
      setErrors(true)
      return;

    }
    const isAllNumbersAdd = /^\d+$/.test(address);

    if (isAllNumbersAdd) {
      setMessage("All characters should not be number in Address")
      setErrors(true)
      console.error("All characters can't be numbers or the name is too short");
      return;

      // You can also throw an error or handle it according to your needs
    }
    // Calculate the minimum allowed date (15 years ago)
    const minAllowedDate = new Date();
    minAllowedDate.setFullYear(today.getFullYear() - 15);

    if (dobDate.getTime() >= today.getTime() || dobDate.getTime() >= minAllowedDate.getTime()) {
      setMessage("Person should be 15 years old");
      setErrors(true);
      setDOB('');
      return;
    }

    if (email == '' || firstName == "" || gender == "" || selectedRole == '' || dob == '' || address == '' || countryValue == '' || stateValue == '' || cityValue == '') {

      console.log("role", selectedRole);
      setMessage("Please enter all the required fields")
      setErrors(true)
      return;

    }
    if (selectedRole == "Client") {
      if (GstValue == '') {

        setMessage("Please enter all the required fields")
        setErrors(true)
        return;
      }
    }



    if (!isValidEmail || !selectedRole || !firstName || !gender) {

      return;
    }
    submitButton();

    console.log('Form submitted successfully!');
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/country/');
        if (response.data.value) {
          setCountryListItemsconst(response.data.data);
          setCountryListItems(response.data.data);
        } else {
          console.log('Country loading failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
    fetchData();  // Call the async function immediately
  }, []);

  useEffect(() => {
    // Check if myState has a specific value

    // Set a timeout to change the state after a certain time (e.g., 2000 milliseconds or 2 seconds)
    const timeoutId = setTimeout(() => {
      // Change the state after the specified time
      setErrors(false);
    }, 2000);

    // Clean up the timeout when the component unmounts or when myState changes
    return () => clearTimeout(timeoutId);

  }, [errors]);

  return (
    <div className="signup-content">
      <div className="signup-title">
        <form className="signup-form">
          {errors && (
            <div className='error-box' style={{}}>
              <div className='error-message' style={{ paddingLeft: '20px' }}>{message}</div>
              <div className='closeButton' style={{ paddingRight: '20px' }}
                onClick={() => setErrors(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="20"
                  height="20"
                  style={{ cursor: 'pointer' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          )}


          <label htmlFor="email" className="signup-label">
            Email: <span className='required_tag'>*required</span>
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

          <span>Name:</span><span className='required_tag'>*required</span>
          <div className="signup-name-column">

            <label htmlFor="firstName" className="signup-label"></label>

            <input value={firstName} type="text" id="firstName" className="signup-input mgr" placeholder="First name" onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="middleName" className="signup-label"></label>
            <input value={middleName} type="text" id="middleName" className="signup-input mgr" placeholder="Middle name" onChange={(e) => setMiddleName(e.target.value)} />

            <label htmlFor="lastName" className="signup-label"></label>
            <input value={lastName} type="text" id="lastName" className="signup-input " placeholder="Last name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <label htmlFor="image" className="signup-label">
            Photo:
          </label>
          <input type="file" id="image" className="signup-input" placeholder="photo" />



          <div className="signup-beside">
            <div style={{ width: '50%' }}>


              <label htmlFor="gender" className="signup-label">
                Gender:<span className='required_tag'>*required</span>
              </label>
              <select value={gender} id="gender" className="signup-select" onChange={(e) => setGender(e.target.value)}
              >
                <option>choose gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ width: '50%' }}>

              <label htmlFor="role" className="signup-label">
                Role:<span className='required_tag'>*required</span>
              </label>
              <select
                id="role"
                className="signup-select"
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}

              >
                <option value="">Choose role</option>
                <option value="Admin">Admin</option>
                <option value="Team member">Team member</option>
                <option value="Manager">Manager</option>
                <option value="Client">Client</option>
              </select>
            </div>
          </div>

          <label htmlFor="dob" className="signup-label">
            Date of Birth:<span className='required_tag'>*required</span>
          </label>
          <input value={dob} type="date" id="dob" className="signup-input" onChange={(e) => setDOB(e.target.value)}
          />

          <label htmlFor="addressline" className="signup-label">
            Address: <span className='required_tag'>*required</span>
          </label>
          <input
            type="addressline"
            id="addressline"
            className="signup-input"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
          />
          <div id='addressitemlist'>
            <div className='addressitem'>

              <label className="signup-label">
                Country:<span className='required_tag'>*required</span>
              </label>
              <div className='listofaddress'>
                <input
                  type="text"
                  value={countryValue}
                  onChange={handleCountryChange}
                  onFocus={handleCountryInputFocus}
                  onBlur={handleCountryInputBlur}
                  placeholder="Enter Country"
                  className='signup-input'
                />

                {countryisListVisible && (
                  <div className='addresslist'>
                    {countryListItems.map((country) => (
                      <div
                        className="addresslistitem"
                        key={country.id}
                        onClick={() => handleCountryItemClick(country.name)}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
            <div className='addressitem'>
              <label htmlFor="" className="signup-label">
                State:<span className='required_tag'>*required</span>
              </label>
              <div className='listofaddress'>
                <input
                  type="text"
                  value={stateValue}
                  onChange={handleStateChange}
                  onFocus={handleStateInputFocus}
                  onBlur={handleStateInputBlur}
                  placeholder="Enter State"
                  className='signup-input'

                />

                {stateisListVisible && (
                  <div className='addresslist'>
                    {stateListItems.map((state) => (
                      <div
                        className="addresslistitem"
                        key={state.id}
                        onClick={() => handleStateItemClick(state.name)}
                      >
                        {state.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            <div className='addressitem'>
              <label htmlFor="city" className="signup-label">
                City:<span className='required_tag'>*required</span>
              </label>
              <div className='listofaddress'>
                <input
                  type="text"
                  value={cityValue}
                  onChange={handleCityChange}
                  onFocus={handleCityInputFocus}
                  onBlur={handleCityInputBlur}
                  placeholder="Enter city"
                  className='signup-input'

                />

                {cityisListVisible && (
                  <div className='addresslist'>
                    {cityListItems.map((city) => (
                      <div
                        className="addresslistitem"
                        key={city.id}
                        onClick={() => handleCityItemClick(city.name)}
                      >
                        {city.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {selectedRole === 'Client' ? (
            <>
              <div className='addressitem'>

                <label className="signup-label">
                  Company Name:<span className='required_tag'>*required</span>
                </label>
                <div className='listofaddress'>
                  <input
                    type="text"
                    value={GstValue}
                    onChange={handleGstChange}
                    onFocus={handleGstInputFocus}
                    onBlur={handleGstInputBlur}
                    placeholder="Enter Company Name"
                    className='signup-input'
                  />

                  {gstisListVisible && (
                    <div className='addresslist'>
                      {gstListItems.map((gstnumber) => (
                        <div
                          className="addresslistitem"
                          key={gstnumber.gst_no}
                          onClick={() => {
                            handleGstItemClick(gstnumber.gst_no + " " + gstnumber.name);
                            handleGstNoClick(gstnumber.gst_no);
                          }}
                        >
                          {gstnumber.gst_no}   {gstnumber.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>


              </div>
            </>
          ) : (
            <>
              {/* Code for non-Client role */}
              <h3>Certificates</h3>
              <label htmlFor="image" className="signup-label">
                HSC Certificate:
              </label>
              <input type="file" id="image" className="signup-input" placeholder="photo" />
              <label htmlFor="image" className="signup-label">
                College Degree:
              </label>
              <input type="file" id="image" className="signup-input" placeholder="photo" />
              <label htmlFor="image" className="signup-label">
                Other Certificate:
              </label>
              <input type="file" id="image" className="signup-input" placeholder="photo" />
            </>
          )}


          <br />

          <a href="#">
            <button type="submit" className="buttonsignup" onClick={handleSubmit}>
              Submit
            </button>
          </a>
        </form>
      </div >
    </div >
  );
};

export default SignupForm;


