import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from './logo.png';
import profile from './profile.png';
import { Link } from 'react-router-dom';
import logouticon from'./logout.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div href="#" className="navbar-logo">
        <img src= {logo} alt="Logo" />
      </div>
      <Link to="/profile" >      
      <div className="navbar-profile" >
        <img src={profile} alt="User Profile Photo" className="profile-photo" />
        <div className="profile-info">
          <span className="profile-name">John Doe</span>
          <span className="profile-email">john.doe@example.com</span>
        </div>
      </div></Link>

      <div id='logoutbutton'><img src={logouticon} alt="User Profile Photo" className="logouticon" /></div>

    </nav>
  );
};

export default Navbar;
