import React, { useState } from 'react';
import './Manage_team.css';
import pic from './profile.png';
import pic1 from './profile1.webp';
import pic2 from './profile2.jpg';
import pic3 from './profile3.jpg';

const UserProfileCard = ({ user }) => {
  return (
    <div className="team-profile-card">
      <img src={user.profileImage} alt="Profile" className="team-profile-image" />
      <div className="team-profile-info">
        <h2 className="team-profile-name">{user.name}</h2>
        <div className="team-profile-details">
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  );
};

const Manage_team = () => {
  const [teammemberList, setTeamMemberList] = useState([
    {
      id: 1,
      name: 'John Dev',
      role: 'Developer',
      email: 'john.dev@example.com',
      profileImage: pic,
    },
    {
      id: 2,
      name: 'Steve Smith',
      role: 'Designer',
      email: 'steve.smith@example.com',
      profileImage: pic1,
    },
    {
      id: 3,
      name: 'Adam smith',
      role: 'Designer',
      email: 'adam.smith@example.com',
      profileImage: pic2,
    },
    {
      id: 4,
      name: 'anthony',
      role: 'Designer',
      email: 'anthnoy@example.com',
      profileImage: pic3,
    },
    // Add more team members as needed
  ]);

  return (
    <div className='Manage-team-container'>
      <select className='select-project'>
        <option disabled defaultValue="">Select a Project</option>
        <option>Project 1</option>
        <option>Project 2</option>
        <option>Project 3</option>
      </select>
      <div className="profile-grid">
        {teammemberList.map((teamMember) => (
          <UserProfileCard key={teamMember.id} user={teamMember} />
        ))}
      </div>
    </div>
  );
};

export default Manage_team;
