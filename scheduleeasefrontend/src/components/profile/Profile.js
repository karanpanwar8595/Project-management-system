import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import { useEffect } from 'react';
import axios from 'axios';


const Profile = () => {
  const [showCompanyInfo, setShowCompanyInfo] = useState(null);
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  useEffect(() => {
    fetchProfileData()
  }, []);
  const [profiledetails, setProfileDetails] = useState({});

  const fetchProfileData = async () => {
    try {
      const Useremail = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }
      const response = await axios.post('http://127.0.0.1:8000/api/profileinfo/', Useremail);

      if (response.data.value) {
        setProfileDetails(response.data.data);
        variableassign();
        // console.log(clients);
        console.log(response.data.data);
      } else {
        console.log('profile failed');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const variableassign=()=>{
    if (profiledetails.role === 0) {
      setRole("Admin");
    } else if (profiledetails.role === 1) {
      setRole("Manager");

    } else if (profiledetails.role === 2) {
      setRole("Team Member");

    } else if (profiledetails.role === 3) {
      setRole("Client");

    }
    else{
      setRole("Undefine");
    }
    
    if (profiledetails.gender === 0) {
      setGender("Male");
    } else if (profiledetails.gender === 1) {
      setGender("Female");
    }else{
      setRole("Undefine");
    }
    
    if (profiledetails.role === 3 ){
      setShowCompanyInfo("");
    }
    
  }


  return (
    <div className="profile">
      {/* Navbar top */}
      <div className="profile-navbar-top">
        <Link to="/updateProfile">
          <div id='profile-edit-button'>
            <FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
            EDIT
          </div>
        </Link>

        <Link to="/changepassword">
          <div id='profile-change-password-button'>
            <FontAwesomeIcon icon={faPencilAlt} className="edit-icon" />
            Change Password
          </div>
        </Link>
      </div>

      {/* End Navbar top */}

      {/* Personal Information */}
      <div className="profile-profile-main">
        <h2 id="profile-headingg">PERSONAL INFORMATION</h2>
        <div className="profile-card">
          <div className="profile-car-body">
            {/* Personal information table */}
            <table>
              <tbody>
                <tr>
                  <td>Full name</td>
                  <td>:</td>
                  <td>{profiledetails.fname}  {profiledetails.mname} {profiledetails.lname} </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{profiledetails.email}</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>:</td>
                  <td>{role}</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>:</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td>Date of birth</td>
                  <td>:</td>
                  <td>{profiledetails.dob}</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>401,abc motera</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>:</td>
                  <td>{profiledetails.city ? profiledetails.city.name : ''}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>:</td>
                  <td>{profiledetails.city ? profiledetails.city.state_id.name : ''}</td>

                </tr>
                <tr>
                  <td>Country</td>
                  <td>:</td>
                  <td>{profiledetails.city ? profiledetails.city.state_id.country_id.name : ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End Personal Information */}
      {showCompanyInfo !== null ? (
  /* Company Information */
  <div className="profile-profile-main">
    <h2>COMPANY INFORMATION</h2>
    <div className="profile-card">
      <div className="profile-car-body">
        {/* Company information table */}
        <table>
          <tbody>
            <tr>
              <td>Company Name</td>
              <td>:</td>
              <td>{profiledetails.gst_no ? profiledetails.gst_no.name : ''}</td>
            </tr>
            <tr>
              <td>GST Number</td>
              <td>:</td>
              <td>{profiledetails.gst_no ? profiledetails.gst_no.gst_no: ''}</td>
            </tr>
            <tr>
              <td>Company Address</td>
              <td>:</td>
              <td>{profiledetails.gst_no ? profiledetails.gst_no.address : ''}</td>
            </tr>
            <tr>
              <td>Company Phone</td>
              <td>:</td>
              <td>{profiledetails.gst_no ? profiledetails.gst_no.phone : ''}</td>
            </tr>
            {/* Add other company information rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
) : null}


      {/* End Company Information */}
    </div>
  );
};

export default Profile;



