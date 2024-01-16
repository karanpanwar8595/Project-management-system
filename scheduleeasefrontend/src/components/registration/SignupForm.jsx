import React, { useEffect, useState } from 'react';
import './SignupForm.css'; 
import axios from 'axios';


const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDOB] = useState('');





  // countrydata
  const [countryValue, setCountryValue] = useState('');
  const [countryListItems, setCountryListItems] = useState(["No item", "hello"]);
  const [countryListItemsconst, setCountryListItemsconst] = useState(["No item", "hello"]);
  const [countryisListVisible, setcountryListVisible] = useState(false);


  const [stateValue, setStateValue] = useState('');
  const [stateListItems, setStateListItems] = useState(["No item", "hello"]);
  const [stateListItemsconst, setStateListItemsconst] = useState(["No item", "hello"]);
  const [stateisListVisible, setStateListVisible] = useState(false);

  // const [stateValue, setStateValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [cityListItems, setCityListItems] = useState(["No item", "hello"]);
  const [cityListItemsconst, setCityListItemsconst] = useState(["No item", "hello"]);
  const [cityisListVisible, setCityListVisible] = useState(false);
  // const [cityValue, setCityValue] = useState('');

  // Country function
  const handleCountryChange = (e) => {
    const value = e.target.value;
    setCountryValue(value);
    // Filter the list based on the input value
    const filteredItems = countryListItemsconst.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    // Update the list with the filtered items
    setCountryListItems(filteredItems);
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
    const value = e.target.value;
    setStateValue(value);
    // Filter the list based on the input value
    const filteredItems = stateListItemsconst.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    // Update the list with the filtered items
    setStateListItems(filteredItems);
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
    const value = e.target.value;
    setCityValue(value);
    // Filter the list based on the input value
    const filteredItems = cityListItemsconst.filter((city) =>
      city.name.toLowerCase().includes(value.toLowerCase())
    );
    // Update the list with the filtered items
    setCityListItems(filteredItems);
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

  const submitButton = async () => {
    try {
      var cityId = 0;
      var role_id = 0;
var gender_id=0;
      for (const cityDetail in cityListItemsconst) {

        if (cityListItemsconst[cityDetail].name === cityValue) {
          // Assuming fetchData is a function that fetches data based on the country ID
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
      const regdata = { inputemail: email, firstname: firstName, middlename: middleName, lastname: lastName, userrole: role_id, usergender: gender_id, dateofbirth: dob, city: cityId }
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



  const handleSubmit = () => {
    if (!isValidEmail || !selectedRole || !firstName || !gender) {
      // alert('Please fill out all required fields correctly.');
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
            required
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}
   
          Name:
          <div className="signup-name-column">

            <label htmlFor="firstName" className="signup-label"></label>
            <input value={firstName} type="text" id="firstName" className="signup-input mgr" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} 
            required/>

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
                Gender:
              </label>
              <select value={gender} id="gender" className="signup-select" onChange={(e) => setGender(e.target.value)}
              required>
                <option>choose gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div style={{ width: '50%' }}>

              <label htmlFor="role" className="signup-label">
                Role:
              </label>
              <select
                id="role"
                className="signup-select"
                onChange={(e) => setSelectedRole(e.target.value)}
                value={selectedRole}
                required
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
            Date of Birth:
          </label>
          <input value={dob} type="date" id="dob" className="signup-input" onChange={(e) => setDOB(e.target.value)}
          required />
          <div id='addressitemlist'>
            <div className='addressitem'>

              <label className="signup-label">
                Country:
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
                  required
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
                State
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
                  required
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
                City
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
                  required
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


