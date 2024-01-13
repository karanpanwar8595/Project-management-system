import React from 'react';
import './SideNavbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  const role = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
  if (role === 0) { //for admin
    return (
      <div className="side-navbar">
        <ul>
          <li>
            <Link to="/" >Dashboard</Link>
          </li>
          <li>
            <Link to="/project">Projects</Link>
          </li>
          
          <li>
            <Link to="/">Payments</Link>
          </li>
          <hr></hr>
           <h4>Accounts</h4>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/"> Block/Unblock User </Link>
          </li>
        </ul>
      </div>
    );
  }
  else if (role === 1) {//for manager
    return (
      <div className="side-navbar">
        <ul>
          <li>
            <Link to="/" >Dashboard</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
          <li>
            <Link to="/manage_team">Manage Team</Link>
          </li>
          <li>
            <Link to="/calendar">Calender</Link>
          </li>
          <li>
            <Link to="/disscussion">Disccussion</Link>
          </li>
          <li>
            <Link to="/">Payment</Link>
          </li>
          <li>
            <Link to="/Notification">Notification</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    );
  }
  else if (role === 2) {//for teammember
    return (
      <div className="side-navbar">
        <ul>
          <li>
            <Link to="/" >Dashboard</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
          <li>
            <Link to="/manage_team">Manage Team</Link>
          </li>
          <li>
            <Link to="/calendar">Calender</Link>
          </li>
          <li>
            <Link to="/disscussion">Disccussion</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/">Payment</Link>
          </li>
          <li>
            <Link to="/Notification">Notification</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    );
  }
  else if (role === 3) {//for manager
    return (
      <div className="side-navbar">
        <ul>
          <li>
            <Link to="/" >Dashboard</Link>
          </li>
          <li>
            <Link to="/project">Project</Link>
          </li>
          <li>
            <Link to="/manage_team">Manage Team</Link>
          </li>
          <li>
            <Link to="/disscussion">Disccussion</Link>
          </li>
          <li>
            <Link to="/registration">Registration</Link>
          </li>
          <li>
            <Link to="/">Payment</Link>
          </li>
          <li>
            <Link to="/Notification">Notification</Link>
          </li>
          <li>
            <Link to="/tasks">Tasks</Link>
          </li>
        </ul>
      </div>
    );
  }
  else { }


};

export default SideNavbar;
