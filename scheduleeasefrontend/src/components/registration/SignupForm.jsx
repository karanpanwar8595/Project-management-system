import React, { useEffect, useState } from 'react';
import './SignupFormStyles.css'; // Import CSS file
import axios from 'axios';


const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [selectedRole, setSelectedRole] = useState('');
  const [firstName, setFirstName] = useState('');
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
  };

  const handleCountryInputFocus = () => {
    setcountryListVisible(true);
  };
  const statefetchData = async (country_id) => {
    console.log(country_id)
    try {
      const selcontry_id= {country_id : country_id}
      const response = await axios.post('http://127.0.0.1:8000/api/state/',selcontry_id);
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
    console.log("blur");
    
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
  for (const countryDetail in countryListItemsconst){

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
          />
          {!isValidEmail && <p className="error-message">Please enter a valid email address</p>}
          Name:
          <div className="signup-name-column">

            <label htmlFor="firstName" className="signup-label"></label>
            <input type="text" id="firstName" className="signup-input" placeholder="First name" />

            <label htmlFor="middleName" className="signup-label"></label>
            <input type="text" id="middleName" className="signup-input" placeholder="Middle name" />

            <label htmlFor="lastName" className="signup-label"></label>
            <input type="text" id="lastName" className="signup-input" placeholder="Last name" />
          </div>
          <label htmlFor="image" className="signup-label">
            Photo:
          </label>
          <input type="file" id="image" className="signup-input" placeholder="photo" />
          <br />


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




          {/* <input type="text" id="cityId" className="signup-input" placeholder="Enter your country" /> */}

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


