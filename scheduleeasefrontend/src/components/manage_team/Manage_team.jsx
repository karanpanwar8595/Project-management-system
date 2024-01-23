import React, { useState,useEffect } from 'react';
import './Manage_team.css';
import plus from './plus.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pic from './profile.png';
import pic1 from './profile1.webp';
import pic2 from './profile2.jpg';
import pic3 from './profile3.jpg';

const UserProfileCard = ({ user }) => {
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user.role === 0) {
      setRole('Admin');
    } else if (user.role === 1) {
      setRole('Manager');
    } else if (user.role === 2) {
      setRole('Team Member');
    } else if (user.role === 3) {
      setRole('Client');
    }

  }, [user.role]);

  return (
    <div className="team-profile-card">
      <img src={pic} alt="Profile" className="team-profile-image" />
      <div className="team-profile-info">
        <div className="team-profile-name">{user.name}</div>
        <div className="team-profile-role">{role}</div>

        <div className="team-profile-emal">
          {user.email}
        </div>
        <div className="removebutton">Remove</div>
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
  const [teammemberList, setTeamMemberList] = useState([]);
  const [selectedProject, setSelectedProject] = useState();
  const [selectedProjectId, setSelectedProjectId] = useState(0);


  const [projects, setProjects] = useState([

  ]);

  const handleProjectChange = (event) => {
    const selectedproject=event.target.value;
    console.log("eventvalue",event.target.value)
    setSelectedProject(event.target.value);
    setSelectedProjectId(event.target.value);

    console.log('selectedProject', selectedProjectId);
    projectMember(selectedproject);
  };






  const projectuserin = async () => {
    try {
      const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email,role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role};

      const response = await axios.post('http://127.0.0.1:8000/api/userinproject/', ProjectDetails);
      // ye data request me jayega in views.py
      if (response.data['value']) {
        console.log("hello11", response.data.data);
        setProjects(response.data.data);
        console.log('Project component connected');
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log('Error during login:', error);
    }
  };

  const projectMember = async (projectid) => {
    try {
      const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, project_id: projectid };
      console.log(ProjectDetails);
      const response = await axios.post('http://127.0.0.1:8000/api/projectmembers/', ProjectDetails);
      // ye data request me jayega in views.py
      if (response.data['value']) {
        console.log("settemamember", response.data.data);
        setTeamMemberList(response.data.data);
        
        console.log('Project component connected');
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  useEffect(() => {
    projectuserin();
    console.log(projects);
  }, []);



  return (
    <div className='Manage-team-container'>
      {/* <h5>Select your project</h5> */}
      <select className='select-project' value={selectedProject} onChange={(event) => handleProjectChange(event)}>
        <option value="">Select a Project</option>
        {projects && projects.map((project) => (
          <option key={project.projects.id} value={project.projects.id}>{project.projects.name}</option>
        ))}
      </select>

      <div className="profile-grid">
        {Array.isArray(teammemberList) ? (
          teammemberList.map((teamMember) => (
            <UserProfileCard user={teamMember['member']} key={teamMember['email']} />
          ))
        ) : (
          <p>No team members available</p>
        )}
      </div>
      <Link to="/add_team_member" state={{ selectedProject }}><img src={plus} className='plus-symbol' alt="Plus Symbol" /></Link>

    </div>

  )
}

export default Manage_team;
