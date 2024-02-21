import React , {useState,useEffect} from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from './logo.png';
import profile from './Pravatik.jpeg';
import { Link ,useNavigate} from 'react-router-dom';
import logouticon from './logout.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';

const Navbar = () => {
const navigate = useNavigate();
const [name, setName] = useState(JSON.parse(sessionStorage.getItem('loginData')).profile_data.name)
const [email, setEmail] = useState(JSON.parse(sessionStorage.getItem('loginData')).profile_data.email)
  const handleLogout = () => {
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('profileData');
    // Navigating to the login page
    navigate('/');
    window.location.reload();
  };



  return (
    <nav className="navbar">

 
      <Link to="/profile" style={{ textDecoration: "none" }}>
        <div className="navbar-profile" >
          <img src={profile} alt="User Profile Photo" className="profile-photo" />
          <div className="profile-info">
            <span className="profile-name">{name}</span>
            <span className="profile-email">{email}</span>
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