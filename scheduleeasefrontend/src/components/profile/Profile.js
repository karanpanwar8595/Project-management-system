import React, { useState } from 'react';
import './pstyle.css'; // Import  CSS file

const Profile = () => {
  const [uploadedImage, setUploadedImage] = useState('');

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

  return (
    <div>
      {/* Navbar top */}
      <div className="navbar-top">
        <div className="title">
          <h1>Profile</h1>
        </div>

        {/* Navbar */}
        <ul>
          <li>
            <a href="#sign-out">
              <i className="fa fa-sign-out-alt fa-2x"></i>
            </a>
          </li>
        </ul>
        {/* End */}
      </div>
      {/* End */}

      <div className="sidenav">
        <div className="profile">
          <div className="photo-upload">
            <input
              type="file"
              id="image"
              style={{ display: 'none' }}
              onChange={(e) => displayImage(e.target)}
            />
            <label htmlFor="image">
              <i className="fa fa-camera fa-2x"></i>
            </label>
            {uploadedImage && (
              <img
                id="uploaded-image"
                src={uploadedImage}
                alt="Uploaded Photo"
              />
            )}
          </div>
        </div>
        <div className="job"></div>
      </div>

      <div className="main">
        <h2>IDENTITY</h2>
        <div className="card">
          <div className="card-body">
            <i className="fa fa-pen fa-xs edit"></i>
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
                  <td>City id</td>
                  <td>:</td>
                  <td>12345</td>
                </tr>
                <tr>
                  <td>User status</td>
                  <td>:</td>
                  <td>Y</td>
                </tr>
                <tr>
                  <td>Profile status</td>
                  <td>:</td>
                  <td>Unblocked</td>
                </tr>
                <tr>
                  <td>Gst number</td>
                  <td>:</td>
                  <td>Kar1australia</td>
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
