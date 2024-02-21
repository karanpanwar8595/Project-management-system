import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Projects.css'
import plus from './plus.png'
// import ProjectDetails from './ProjectDetails.js'
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const [projects, setProjects] = useState(project);
    const [completion, SetCompletion] = useState(0);
    useEffect(() => {
        ProjectCompletion(project.id);
    }, []);
    const getProgressClass = (percentage) => {
        if (percentage < 25) return 'low';
        if (percentage < 50) return 'medium';
        if (percentage < 75) return 'high';
        return 'very-high';
    };
    const ProjectCompletion = async (projectNo) => {

        try {
            const ProjectDetails = { projectno: projectNo }
            const response = await axios.post('http://127.0.0.1:8000/api/projectcompletion/', ProjectDetails);
            // ye data request me jayega in views.py

            if (response.data['value']) {
                if (response.data.data.totaltask == 0) {
                    SetCompletion(0);
                    // console.log(completion);
                    const updatedProject = {
                        ...projects,
                        completion: 0,
                    };
                    setProjects(updatedProject);


                }
                else {
                    const percentage = response.data.data.taskdone / response.data.data.totaltask * 100
                    console.log(percentage)
                    SetCompletion(Math.floor(percentage));
                    const updatedProject = {
                        ...projects,
                        completion: Math.floor(percentage),
                    };
                    setProjects(updatedProject);

                }
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    return (
        <Link
            to='/ProjectDetails'
            state={{ projects, isManager: true }}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <div key={project.id} className="project-card">
                <div className="project-details">
                    <div className="detail-item">{project.name}</div>
                    <div className="detail-item">{project.dueDate}</div>
                    <div className="detail-item">
                        <div className="progress-container">
                            <div
                                className={`progress-filler ${getProgressClass(completion)}`}
                                style={{ width: `${completion}%` }}
                            >
                                <span className="progress-label">{`${completion}%`}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};




const ProjectCardToMe = ({ project }) => {
    const [managername, setManagername] = useState(" ")
    const [projects, setProjects] = useState(project);
    const [completion, SetCompletion] = useState(0);
    useEffect(() => {
        ProjectCompletion(project.id);
        ProjectManager(project.id);
    }, []);

    const ProjectCompletion = async (projectNo) => {

        try {
            const ProjectDetails = { projectno: projectNo }
            const response = await axios.post('http://127.0.0.1:8000/api/projectcompletion/', ProjectDetails);
            // ye data request me jayega in views.py

            if (response.data['value']) {
                if (response.data.data.totaltask == 0) {
                    SetCompletion(0);
                    // console.log(completion);
                    const updatedProject = {
                        ...projects,
                        completion: 0,
                    };
                    setProjects(updatedProject);


                }
                else {
                    const percentage = response.data.data.taskdone / response.data.data.totaltask * 100
                    SetCompletion(Math.floor(percentage));
                    const updatedProject = {
                        ...projects,
                        completion: (Math.floor(percentage)),
                    };
                    setProjects(updatedProject);

                }
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const ProjectManager = async (projectNo) => {

        try {
            const ProjectDetails = { projectno: projectNo }
            const response = await axios.post('http://127.0.0.1:8000/api/projectmanager/', ProjectDetails);
            // ye data request me jayega in views.py

            if (response.data['value']) {
                setManagername(response.data.data.data.member.name);
            } else {
                console.log("server response false error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    return (
        <Link
            to='/ProjectDetails'
            state={{ projects, isManager: false }}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <div key={project.id} className="project-card">
                <div className="project-details">
                    <div className="detail-item">{project.name}</div>
                    <div className="detail-item">{project.dueDate}</div>
                    <div className="detail-item">{managername}</div>
                </div>
            </div>
        </Link>
    );
};

const Projects = () => {
    const data = [{
        'budget': 50000,
        'client': {
            'name': 'Tech Mahindra',
            'email': 'akash@gmail.com',
            'phone': '2109876547',
            'address': '678 Maple Road, Downtown',
            'gst_no': 3210987653
        },

        'id': 5,
        'name': 'Health Care',
        'projectDescription': 'Health Care: Your comprehensive mobile solution for managing personal wellness and accessing medical resources on the go',
        'startDate': '2024-05-20',
        'dueDate': '2024-11-30',

        'email': {
            'email': {
                'id': 5,
                'email': 'pravatik@gmail.com',
                'photo': 'photo',
                'lname': 'Pandaya',
                'fname': 'Pravatik',
                'mname': ''
            }

        }
    }];


    const [isManager, setIsManager] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isTeamMember, setIsTeamMember] = useState(false);
    const [isClient, setIsClient] = useState(false)
    const [ongoingProjects, setOngoingProjects] = useState([
        {
            id: 1,
            name: 'InnovateHub',
            dueDate: '2024-08-18',
            startDate: '2024-01-12',
            completion: 72,
            projectDescription: 'InnovateHub is focused on developing innovative solutions.',
            budget: '80000',
            companyName: 'Innovate Inc.',
            clientName: 'karan Panwar',
            attachments: ['/project-plan.pdf'],
            documents: ['/Aadhar.jpg', '/4th sem result.pdf']
        },
    ]);

    const [assignedProjects, setAssignProjects] = useState([

    ]);




    const ProjectDetails = async () => {

        if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 0) {
            try {
                console.log("admin login connection ");
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsadmin/');
                // ye data request me jayega in views.py
                if (response.data['value']) {
                    console.log(response.data.projectdetails);
                    setOngoingProjects(response.data.projectdetails);
                    console.log('Project component connected');
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error during login:', error);
            }

        }
        else if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 1) {
            try {
                console.log("manager login connection ");

                const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role };
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsmanager/', ProjectDetails);
                // ye data request me jayega in views.py
                if (response.data['value']) {
                    console.log(response.data.projectdetails);
                    setOngoingProjects(response.data.projectdetails)
                    console.log('Project component connected');
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error during login:', error);
            }


            try {
                console.log("project assigned to Manager connection ");

                const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role };
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsteam/', ProjectDetails);
                // ye data request me jayega in views.py
                if (response.data['value']) {
                    console.log(response.data.projectdetails);
                    setAssignProjects(response.data.projectdetails);
                    // console.log(response.data.projectdetails[1].email);
                    console.log('Project to me component connected', assignedProjects);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error during login:', error);
            }

        }
        else if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 2) {
            try {
                console.log("Team Member login connection ");

                const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role };
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsteam/', ProjectDetails);
                // ye data request me jayega in views.py
                if (response.data['value']) {
                    console.log(response.data.projectdetails);
                    setAssignProjects(response.data.projectdetails);
                    // console.log(response.data.projectdetails[1].email);
                    console.log('Project to me component connected', assignedProjects);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error during login:', error);
            }

        }
        else if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 3) {
            try {
                console.log("Client login connection ");

                const ProjectDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role };
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsclient/', ProjectDetails);
                // ye data request me jayega in views.py
                if (response.data['value']) {
                    console.log(response.data.projectdetails);
                    setAssignProjects(response.data.projectdetails);
                    // console.log(response.data.projectdetails[1].email);
                    console.log('Project to me component connected', assignedProjects);
                } else {
                    console.log("error")
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }


    };

    useEffect(() => {//this help in seting authentication to false when we relode

        try {
            const role_id = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;




            if (role_id == "1") {
                setIsManager(true);
                setIsTeamMember(false);

                setIsAdmin(false);
                setIsClient(false);
            }
            else if (role_id == "0") {
                setIsManager(false);
                setIsTeamMember(false);

                setIsAdmin(true);
                setIsClient(false);

            }
            else if (role_id == "2") {
                setIsTeamMember(true);
                setIsManager(false);
                setIsAdmin(false);
                setIsClient(false)
            } else if (role_id == "3") {
                setIsTeamMember(false);
                setIsManager(false);
                setIsAdmin(false);
                setIsClient(true)
            }


        } catch (error) {
            console.log(error);
        }

        ProjectDetails();

    }, []);




    //------------------------------------------------------------------------------------------------------------------------

    return (
        <div className="projects-container">

            {isManager ? (
                // code for manager 
                <>
                    <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Manage by me</h3>
                    <div className="project-header">
                        <div className="header-item">Project Name</div>
                        <div className="header-item">Due Date</div>
                        <div className="header-item">Progress</div>
                    </div>
                    {ongoingProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Assign to me</h3>
                    <div className="project-header">
                        <div className="header-item">Project Name</div>
                        <div className="header-item">Due Date</div>
                        <div className="header-item">Project Manager</div>
                    </div>
                    {assignedProjects.map((project) => (
                        <ProjectCardToMe key={project.id} project={project} />

                    ))}
                    <Link to='/addproject'>
                        <img src={plus} className='plus-symbol' alt='not found' />
                    </Link>
                </>
            ) : (<>
                {isAdmin ? (
                    // code for Admin 
                    <>
                        <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Project</h3>
                        <div className="project-header">
                            <div className="header-item">Project Name</div>
                            <div className="header-item">Due Date</div>
                            <div className="header-item">Progress</div>
                        </div>
                        {ongoingProjects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </>
                ) : (<>
                    {isTeamMember ? (
                        // code for teammember
                        <>
                            <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Projects</h3>
                            <div className="project-header">
                                <div className="header-item">Project Name</div>
                                <div className="header-item">Due Date</div>
                                <div className="header-item">Project Manager</div>
                            </div>
                            {assignedProjects.map((project) => (
                                <ProjectCardToMe key={project.id} project={project} />

                            ))}
                        </>
                    ) : (
                        // condition for client
                        <>
                            <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Projects</h3>
                            <div className="project-header">
                                <div className="header-item">Project Name</div>
                                <div className="header-item">Due Date</div>
                                <div className="header-item">Project Manager</div>
                            </div>
                            {assignedProjects.length > 0 && assignedProjects.map((project) => (
    <ProjectCardToMe key={project.id} project={project} />
))}

                        </>
                    )}
                </>
                )}
            </>


            )


            }




        </div>

    );
};

export default Projects;
