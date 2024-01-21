import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from './logo.png';
import profile from './profile.png';
import { Link ,useNavigate} from 'react-router-dom';
import logouticon from './logout.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('profileData');

    navigate('/');
    window.location.reload();
  };
  return (
    <nav className="navbar">


      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className="navbar-profile" >
          <img src={profile} alt="User Profile Photo" className="profile-photo" />
          <div className="profile-info">
            <span className="profile-name">Ujjwal</span>
            <span className="profile-email">john.doe@example.com</span>
          </div>
        </div></Link>



      <div id="logoutbutton" onClick={handleLogout}>
        <div className="logout-name">Log out</div>
        <FontAwesomeIcon icon={faDoorOpen} className="logouticon" />
      </div>

    </nav>
  );
};

export default Navbar;
