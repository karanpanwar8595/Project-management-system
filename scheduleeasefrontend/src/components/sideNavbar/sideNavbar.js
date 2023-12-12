import React from 'react';
import './SideNavbar.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';

const SideNavbar = () => {
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
        <Link to="/">Calender</Link>
        </li>
        <li>
        <Link to="/disscussion">Disccussion</Link>
        </li>
        <li>
        <Link to="/">History</Link>
        </li>
        <li>
        <Link to="/">Payment</Link>
        </li>
        <li>
        <Link to="/">Notification</Link>
        </li>
        <li>
          <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
