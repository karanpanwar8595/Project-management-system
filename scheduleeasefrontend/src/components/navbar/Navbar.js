import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from './logo.png';
import profile from './profile.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <img src= {logo} alt="Logo" />
      </a>
      <Link to="/profile" >      
      <div className="navbar-profile" >
        <img src={profile} alt="User Profile Photo" className="profile-photo" />
        <div className="profile-info">
          <span className="profile-name">John Doe</span>
          <span className="profile-email">john.doe@example.com</span>
        </div>
      </div></Link>

    </nav>
  );
};

export default Navbar;
