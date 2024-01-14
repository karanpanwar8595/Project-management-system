import React, { useState, useEffect } from 'react';
import './Manage_team.css'
import Modal from '../modal_form/Modal'
import pic from './profile.png'

const UserProfileCard = ({ user }) => {
  return (
    <div className="team-profile-card">
      <img src={pic} alt="Profile" className="team-profile-image" />
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
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    // Inside the render method of Manage_team.jsx

    setModalOpen(true);
    // Inside the render method of Manage_team.jsx

  };
  const [teammemberList, setTeamMemberList] = useState([
    {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      email: 'john.doe@example.com',
      profileImage: 'path/to/john-doe.jpg',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Designer',
      email: 'jane.smith@example.com',
      profileImage: 'path/to/jane-smith.jpg',
    },
    {
      id: 3,
      name: 'Jane Smith',
      role: 'Designer',
      email: 'jane.smith@example.com',
      profileImage: 'path/to/jane-smith.jpg',
    },
    {
      id: 4,
      name: 'Jane Smith',
      role: 'Designer',
      email: 'jane.smith@example.com',
      profileImage: 'path/to/jane-smith.jpg',
    },
    // Add more team members as needed
  ]);
  

  return (

    <div className='Manage-team-container'>
      {/* <h5>Select your project</h5> */}
      <select className='select-project'>
      <option disabled defaultValue="">Select a Project</option>
      <option>Project 1</option>
      <option>Project 2</option>
      <option>Project 3</option>
    </select>
      <div className="profile-grid">
      {teammemberList.map((teamMember) => (
                <UserProfileCard user= {teamMember} />
                
                ))}


      </div>
      {/* <img src={plus} className='plus-symbol'  alt="Plus Symbol" /> */}
    </div>
  )
}

export default Manage_team
