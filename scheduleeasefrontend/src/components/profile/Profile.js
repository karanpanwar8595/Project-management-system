import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './pstyle.css'; 

const Profile = () => {
  const [uploadedImage, setUploadedImage] = useState('');
  const [showIconButton, setShowIconButton] = useState(false);

  const displayImage = (input) => {
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        setUploadedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    // Navigate to the registration page
    window.location.href = '/UpdateProfile';
  };

  const handleIconClick = () => {
    // For now, toggling the state to show/hide the icon button
    setShowIconButton(!showIconButton);
  };

  return (
    <div className="profile">
      {/* Navbar top */}
      <div className="profile-navbar-top">
        <div className="profile-title">
          <h1>Profile</h1>
        </div>

        {/* Navbar */}
        <ul>
          <li>
            <a href="#sign-out">
              <i className="fa fa-sign-out-alt fa-2x"></i>
            </a>
          </li>
          <li>
            <button onClick={handleEditClick}>Edit</button>
          </li>
          {showIconButton && (
            <li>
              {/* Link to the corresponding page for the icon button */}
              <Link to="/icon-page">
                <i className="fa fa-icon fa-2x"></i>
              </Link>
            </li>
          )}
        </ul>
        {/* End */}
      </div>
      {/* End */}

      <div className="profile-profile-main">
        <h2>PERSONAL INFORMATION</h2>
        <div className="profile-card">
          <div className="profile-car-body">
            <i className="fa fa-pen fa-xs profile-edit"></i>
            <table>
              <tbody>
                <tr>
                  <td>Full name</td>
                  <td>:</td>
                  <td>Karan panwar</td>
                </tr>
                <tr>
                  <td>Role</td>
                  <td>:</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>:</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>Date of birth</td>
                  <td>:</td>
                  <td>23-11-2002</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>:</td>
                  <td>401,abc motera</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>:</td>
                  <td>ahemdabad</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>:</td>
                  <td>gujarat</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>:</td>
                  <td>india</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
