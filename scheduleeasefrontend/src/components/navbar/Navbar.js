import React , {useState,useEffect} from 'react';
import './Navbar.css'; // Import the CSS file for styling
import logo from './logo.png';
import profile from './profile.png';
import { Link ,useNavigate} from 'react-router-dom';
import logouticon from './logout.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const navigate = useNavigate();
const [name, setName] = useState('')
const [email, setEmail] = useState('')
  const handleLogout = () => {
    sessionStorage.removeItem('loginData');
    sessionStorage.removeItem('profileData');
    
    // Navigating to the login page
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const role =JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
    if(role == 0){
      setName("Admin");
      setEmail("admin@mail.com");
    }else if(role == 1){
      setName("Manager");
      setEmail("manager@mail.com");
    }else if(role == 2){
      setName("TeamMember");
      setEmail("teammember@mail.com");
    }else if(role == 3){
      setName("Client");
      setEmail("client@mail.com");
    }
  }, [])

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