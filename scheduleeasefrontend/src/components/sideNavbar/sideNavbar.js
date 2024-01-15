import React, { useState } from 'react';
import './SideNavbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';
import logo from './logo.png';
// import   from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';


const SideNavbar = () => {
  const [activeLink, setActiveLink] = useState('');  // Set initial active link
  const [taskIsOpen, setTaskIsOpen] = useState(false);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  const taskToggleDropdown = () => {
    setTaskIsOpen((prevIsOpen) => !prevIsOpen);
  };


  const role = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
  if (role === 0) { //for admin
    return (
      <div className="side-navbar">
        <div href="#" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className='sidenavlist'>
          <Link to="/dashboard" onClick={() => handleLinkClick('/dashboard')}><div className={`sidenavitem ${activeLink === '/dashboard' ? 'active' : ''}`}>Dashboard</div></Link>


          <Link to="/project" onClick={() => handleLinkClick('/project')}><div className={`sidenavitem ${activeLink === '/project' ? 'active' : ''}`}>Project</div></Link>

          <Link to="/disscussion" onClick={() => handleLinkClick('/disscussion')}><div className={`sidenavitem ${activeLink === '/disscussion' ? 'active' : ''}`}>Disccussion</div></Link>

          <Link to="/payment" onClick={() => handleLinkClick('/payment')}><div className={`sidenavitem ${activeLink === '/payment' ? 'active' : ''}`}>Payment</div></Link>


          <div className=" task-dropdown-container">
            <div className={`sidenavitem task-dropdown-toggle ${taskIsOpen ? 'active' : ''}`} onClick={() => { taskToggleDropdown(); handleLinkClick('/accounts'); }}>
              <div className='task-name'>Accounts</div>
              <FontAwesomeIcon icon={taskIsOpen ? faChevronUp : faChevronDown} className="arrow-icon" />
            </div>

            {taskIsOpen && (

              <div className="task-dropdown-content">
                {/* Dropdown content goes here */}
                <Link to="/registration" onClick={() => handleLinkClick('/Registration')}><div className={`dropdown sidenavitem ${activeLink === '/Registration' ? 'active' : ''}`}>Registration</div></Link>
                <Link to="/blockuser" onClick={() => handleLinkClick('/blockuser')}><div className={`dropdown sidenavitem ${activeLink === '/blockuser' ? 'active' : ''}`}>Blockuser</div></Link>

              </div>

            )}
          </div>









        </div>
      </div>
    );
  }
  else if (role === 1) {//for manager
    return (
      <div className="side-navbar">
        <div href="#" className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className='sidenavlist'>
          <Link to="/dashboard" onClick={() => handleLinkClick('/dashboard')}><div className={`sidenavitem ${activeLink === '/dashboard' ? 'active' : ''}`}>Dashboard</div></Link>


          <Link to="/project" onClick={() => handleLinkClick('/project')}><div className={`sidenavitem ${activeLink === '/project' ? 'active' : ''}`}>Project</div></Link>


          <Link to="/manage_team" onClick={() => handleLinkClick('/manage_team')}><div className={`sidenavitem ${activeLink === '/manage_team' ? 'active' : ''}`}>Manage Team</div></Link>

          <Link to="/calendar" onClick={() => handleLinkClick('/calendar')}><div className={`sidenavitem ${activeLink === '/calendar' ? 'active' : ''}`}>Calender</div></Link>


          <Link to="/disscussion" onClick={() => handleLinkClick('/disscussion')}><div className={`sidenavitem ${activeLink === '/disscussion' ? 'active' : ''}`}>Disccussion</div></Link>

          <Link to="/payment" onClick={() => handleLinkClick('/payment')}><div className={`sidenavitem ${activeLink === '/payment' ? 'active' : ''}`}>Payment</div></Link>

          <Link to="/Notification" onClick={() => handleLinkClick('/Notification')}><div className={`sidenavitem ${activeLink === '/Notification' ? 'active' : ''}`}>Notification</div></Link>

          <div className=" task-dropdown-container">
            <div className={`sidenavitem task-dropdown-toggle ${taskIsOpen ? 'active' : ''}`} onClick={() => { taskToggleDropdown(); handleLinkClick('/tasks'); }}>
              <div className='task-name'>Task</div>
              <FontAwesomeIcon icon={taskIsOpen ? faChevronUp : faChevronDown} className="arrow-icon" />
            </div>

            {taskIsOpen && (

              <div className="task-dropdown-content">
                {/* Dropdown content goes here */}
                <Link to="/tasks" onClick={() => handleLinkClick('/tasks/me')}><div className={`dropdown sidenavitem ${activeLink === '/tasks/me' ? 'active' : ''}`}>Assign to me</div></Link>
                <Link to="/tasks" onClick={() => handleLinkClick('/tasks/other')}><div className={`dropdown sidenavitem ${activeLink === '/tasks/other' ? 'active' : ''}`}>Assign to Other</div></Link>
              </div>

            )}
          </div>

        </div>

      </div>
    );
  }
  else if (role === 2) {//for teammember
    <div className="side-navbar">
      <div href="#" className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className='sidenavlist'>
        <Link to="/dashboard" onClick={() => handleLinkClick('/dashboard')}><div className={`sidenavitem ${activeLink === '/dashboard' ? 'active' : ''}`}>Dashboard</div></Link>


        <Link to="/project" onClick={() => handleLinkClick('/project')}><div className={`sidenavitem ${activeLink === '/project' ? 'active' : ''}`}>Projects</div></Link>

        <Link to="/manage_team" onClick={() => handleLinkClick('/manage_team')}><div className={`sidenavitem ${activeLink === '/manage_team' ? 'active' : ''}`}>Team</div></Link>

        <Link to="/calendar" onClick={() => handleLinkClick('/calendar')}><div className={`sidenavitem ${activeLink === '/calendar' ? 'active' : ''}`}>Calender</div></Link>


        <Link to="/disscussion" onClick={() => handleLinkClick('/disscussion')}><div className={`sidenavitem ${activeLink === '/disscussion' ? 'active' : ''}`}>Disccussion</div></Link>

        <Link to="/Notification" onClick={() => handleLinkClick('/Notification')}><div className={`sidenavitem ${activeLink === '/Notification' ? 'active' : ''}`}>Notification</div></Link>

        <Link to="/tasks" onClick={() => handleLinkClick('/tasks/me')}><div className={`dropdown sidenavitem ${activeLink === '/tasks/me' ? 'active' : ''}`}>Tasks</div></Link>


      </div>

    </div>
  }
  else if (role === 3) {//for manager
    return (
      <div className="side-navbar">
      <div href="#" className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className='sidenavlist'>
        <Link to="/dashboard" onClick={() => handleLinkClick('/dashboard')}><div className={`sidenavitem ${activeLink === '/dashboard' ? 'active' : ''}`}>Dashboard</div></Link>

        <Link to="/project" onClick={() => handleLinkClick('/project')}><div className={`sidenavitem ${activeLink === '/project' ? 'active' : ''}`}>Projects</div></Link>

        <Link to="/disscussion" onClick={() => handleLinkClick('/disscussion')}><div className={`sidenavitem ${activeLink === '/disscussion' ? 'active' : ''}`}>Disccussion</div></Link>

        <Link to="/Notification" onClick={() => handleLinkClick('/Notification')}><div className={`sidenavitem ${activeLink === '/Notification' ? 'active' : ''}`}>Notification</div></Link>

        <Link to="/payment" onClick={() => handleLinkClick('/payment')}><div className={`sidenavitem ${activeLink === '/payment' ? 'active' : ''}`}>Payment</div></Link>

      </div>

    </div>
    );
  }
  else { }


};

export default SideNavbar;
