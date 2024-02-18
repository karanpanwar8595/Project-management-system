import React, { useState, useEffect,useCallback } from 'react';
import './Manage_team.css';
import plus from './plus.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import pic from './profile.png';
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';




const UserProfileCard = ({ user,roleNo, picture, projectid, teammemberList, onTeamMemberListChange }) => {
  const [role, setRole] = useState('');
  // const RemoveTeamMember = async () => {
  //   try {
  //     const TeamDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, project_id: projectid, usertoremove: user.email };

  //     const response = await axios.post('http://127.0.0.1:8000/api/removeteammember/', TeamDetails);
  //     // ye data request me jayega in views.py
  //     let teamMemberList = teammemberList;
  //     if (response.data['value']) {
  //       for (let i = 0; i < teamMemberList.length; i++) {
  //         const persondata = teamMemberList[i];
  //         console.log(persondata.member.email, user.email);
  //         if (persondata.member.email == user.email) {
  //           console.log("if condition true")
  //           teamMemberList.splice(i, 1);
  //           console.log("parent state after change1", teamMemberList);

  //         }


  //       }
  //       onTeamMemberListChange(teamMemberList);
  //       console.log("parent state after change", teammemberList);
  //       console.log('Project component connected');
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }



  // }


  const RemoveTeamMember = async () => {
    try {
      const TeamDetails = {
        useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email,
        project_id: projectid,
        usertoremove: user.email
      };
  
      const response = await axios.post('http://127.0.0.1:8000/api/removeteammember/', TeamDetails);
  
      if (response.data['value']) {
        const updatedTeamMemberList = teammemberList.filter(persondata => persondata.member.email !== user.email);
  
        onTeamMemberListChange(updatedTeamMemberList);
        console.log("parent state after change", updatedTeamMemberList);
        console.log('Project component connected');
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
  useEffect(() => {
    if (roleNo === 0) {
      setRole('Team Member');
    } else if (roleNo === 1) {
      setRole('Manager');
    }
  }, [user.role]);

  return (
    <div className="team-profile-card">
      <img src={picture} alt="Profile" className="team-profile-image" />
      <div className="team-profile-info">
        <div className="team-profile-name">{user.name}</div>
        <div className="team-profile-role">{role}</div>
        <div className="team-profile-emal">
          {user.email}
        </div>
        {JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 2 ? (
          <></>
        ) : (
          <>

          {roleNo === 1 ? (
            <></>  // Render nothing if roleNo is 1
          ) : (
           
              <div className="removebutton" onClick={RemoveTeamMember}>
                Remove
              </div>
          )}
          </>
          
        )}

      </div>
    </div>
  );
};



const Manage_team = () => {
  const profilepic = [pic1, pic2, pic3, pic4, pic6];
  const isManager = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
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
    const selectedproject = event.target.value;
    console.log("eventvalue", event.target.value)
    setSelectedProject(event.target.value);
    setSelectedProjectId(event.target.value);

    console.log('selectedProject', selectedProjectId);
    projectMember(selectedproject);
  };






  const projectuserin = async () => {
    try {
      const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role };

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


  const handleTeamMemberListChange = useCallback((newValue) => {
    console.log(teammemberList);
    console.log("new value",newValue);
    setTeamMemberList(newValue);
    console.log("handleTeamMemberListChange")
  });

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

          <>
            {teammemberList.map((teamMember, index) => (
              <UserProfileCard
                user={teamMember.member}
                roleNo={teamMember.role}
                picture={profilepic[index % profilepic.length]} // Use modulo to cycle through profile pics
                projectid={selectedProjectId}
                teammemberList={teammemberList}
                onTeamMemberListChange={handleTeamMemberListChange}
                key={teamMember.email}
              />
            ))}
          </>


          // teammemberList.map((teamMember) => (
          //   <UserProfileCard user={teamMember['member'], picture } key={teamMember['email']} />
          // ))
        ) : (
          <p>No team members available</p>
        )}
      </div>

      {isManager ? (
        <><Link to="/add_team_member" state={{ selectedProject: selectedProject, teammember: teammemberList }}><img src={plus} className='plus-symbol' alt="Plus Symbol" /></Link></>
      ) : (
        <></>

      )}


    </div>

  )
}

export default Manage_team;
