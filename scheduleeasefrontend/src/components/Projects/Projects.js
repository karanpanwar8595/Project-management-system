import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Projects.css'
import plus from './plus.png'
// import ProjectDetails from './ProjectDetails.js'
import { Link } from 'react-router-dom';
import { Switch, Case, Default } from 'react-router-dom';
import { faL } from '@fortawesome/free-solid-svg-icons';


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
                    const percentage = response.data.data.totaltask / response.data.data.taskdone
                    SetCompletion(percentage);
                    const updatedProject = {
                        ...projects,
                        completion: percentage,
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
            state={{ projects ,isTeamMember:true}}
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
    const [projects, setProjects] = useState(project);
    const [completion, SetCompletion] = useState(0);
    useEffect(() => {
        ProjectCompletion(project.id);
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
                    const percentage = response.data.data.totaltask / response.data.data.taskdone
                    SetCompletion(percentage);
                    const updatedProject = {
                        ...projects,
                        completion: percentage,
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
            state={{ projects ,isTeamMember:false}}
            style={{ textDecoration: 'none', color: 'black' }}
        >
            <div key={project.id} className="project-card">
                <div className="project-details">
                    <div className="detail-item">{project.name}</div>
                    <div className="detail-item">{project.dueDate}</div>
                    <div className="detail-item">{project.email.email.fname} {project.email.email.lname} </div>
                </div>
            </div>
        </Link>
    );
};


const Projects = () => {
    const [projectname, setProjectName] = useState(0);
    const [projectDec, setProjectDesc] = useState(0);
    const [budget, setBudget] = useState(0);

    const [userrole, setUserRole] = useState(0);
    const [isManager, setIsManager] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
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
    const [clients, setClients] = useState([]);

    // const clients = [
    //     { name: 'hello asdf', email: 'cl@mail.com' },
    //     { name: 'Ujjwal Bhansali', email: 'ujjwalbhansali@gmail.com' },
    //     { name: 'Karan Panwar', email: 'karanpanwar@gmail.com' },
    // ];
    //------------------------------------------------------------------------------------------------------------------------

    const [showForm, setShowForm] = useState(false);

    // Form Project start date and due date
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Form Client searching and adding
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientResults, setClientResults] = useState([]);

    // New project addition
    const [newProjects, setNewProjects] = useState([]);

    // Multiple attachment and document
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);


    const FetchClient = async () => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/fetchclient/');


            if (response.data.value) {
                setClients(response.data.data)
                console.log(clients)
                console.log(response.data.data)

            } else {
                console.log('client failed');
            }

        } catch (error) {
            console.error(error);
        }

    };

    const AddingProject = async (ProjectDetails) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/addingproject/', ProjectDetails);
            // ye data request me jayega in views.py

            if (response.data['value']) {
                console.log(response.data);
                console.log('Project component connected');
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const ProjectDetails = async () => {

        if (JSON.parse(sessionStorage.getItem('loginData')).profile_data.role == 0) {


            try {
                console.log("admin");
                const response = await axios.post('http://127.0.0.1:8000/api/projectdetailsadmin/');
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

        }
        else {
            try {
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


    };

    useEffect(() => {//this help in seting authentication to false when we relode

        try {
            const role_id = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
            setUserRole(role_id);
            console.log(role_id);



            if (role_id == "1") {
                setIsManager(true);
            }
            else if (role_id == "0") {
                setIsManager(false);
                setIsAdmin(true);


            }


        } catch (error) {
            console.log(error);
        }

        ProjectDetails();
        FetchClient();
    }, []);




    const handleAttachmentUpload = async () => {

        const formData = new FormData();
        // const formData = new FormData();
        selectedAttachments.forEach((file, index) => {
            formData.append(`attachment`, file);
        });

        try {
            await axios.post('http://127.0.0.1:8000/api/uploadattachments/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }

    };





    const toggleForm = () => {
        setShowForm(!showForm);
        if (showForm) {
            // Reset selected client when closing the form
            setSelectedClient(null);
        }
    };

    const handleClientSearchChange = (e) => {
        setClientSearch(e.target.value);
        if (selectedClient) {
            alert('client is already selected')
            return
        }
        if (e.target.value) {
            const searchResults = clients.filter(client =>
                client.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setClientResults(searchResults);
        } else {
            setClientResults([]);
        }
    };

    const handleAddClient = (client) => {
        setSelectedClient(client);
        setClientResults([]);
        setClientSearch('');
    };

    const handleRemoveClient = () => {
        setSelectedClient(null);
    };

    const handleFileChange = (e, type) => {
        console.log(e.target.files[0]);
        console.log(e.target.files);
        const newFiles = Array.from(e.target.files);
        if (type === 'attachment') {
            setSelectedAttachments(old => [...old, ...newFiles]);
        } else {
            setSelectedDocuments(old => [...old, ...newFiles]);
        }
    };

    const getProgressClass = (percentage) => {
        if (percentage < 25) return 'low';
        if (percentage < 50) return 'medium';
        if (percentage < 75) return 'high';
        return 'very-high';
    };



    const handleFormSubmit = (event) => {
        event.preventDefault();



        // const projectName = event.target.projectName.value;
        const today = new Date().toISOString().split('T')[0];
        if (startDate < today) {
            alert('Start date must be today or a future date.');
            return;
        }

        if (dueDate <= startDate) {
            alert('Due date must be greater than the start date.');
            return;
        }


        const email = JSON.parse(sessionStorage.getItem('loginData')).profile_data.email;
        const client_email = selectedClient['email'].replace(/'/g, '');


        const newProject = {
            projectname: projectname,
            projectdescription: projectDec,
            startdate: startDate,
            dueDate: dueDate,
            client_id: client_email,
            completion: 0,
            useremail: email,
            probudget: budget,
        };
        AddingProject(newProject);
        handleAttachmentUpload();
        // Add the new project to the newProjects state
        setNewProjects([...newProjects, newProject]);

        alert('Project has been added successfully');
        setShowForm(false);
        setSelectedClient(null);
    };

    //------------------------------------------------------------------------------------------------------------------------

    return (
        <div className="projects-container">



            {isManager ? (
                <>
                    <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Managed by me</h3>
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

                    <img src={plus} className='plus-symbol' alt='not found' onClick={toggleForm} />
                </>
            ) : (<>
                {isAdmin ? (
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
                    <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Assign to me</h3>
                    <div className="project-header">
                        <div className="header-item">Project Name</div>
                        <div className="header-item">Due Date</div>
                        <div className="header-item">Project Manager</div>
                    </div>
                    {assignedProjects.map((project) => (
                        <ProjectCardToMe key={project.id} project={project} />

                    ))}
                </>
                )}
            </>


            )


            }



            {/* ---------------------------------------------Add New Project Form------------------------------------------------ */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="form-header">
                            <span onClick={toggleForm}>Close</span>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-row">
                                <label htmlFor="projectName">Project Name:</label>
                                <input className="in-txtarea" type="text" id="projectName" name="projectName" required
                                    value={projectname}
                                    onChange={(e) => setProjectName(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="startDate">Start Date:</label>
                                <input
                                    className="in-txtarea"
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required

                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="dueDate">Due Date:</label>
                                <input
                                    className="in-txtarea"
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="projectDescription">Project Description:</label>
                                <textarea className="in-txtarea" id="projectDescription" name="projectDescription"
                                    value={projectDec}
                                    onChange={(e) => setProjectDesc(e.target.value)}
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="budget">Budget:</label>
                                <input className="in-txtarea" type="number" id="budget" name="budget" required
                                    value={budget}
                                    onChange={(e) => setBudget(e.target.value)}
                                />
                            </div>

                            <div className="form-row">
                                <label htmlFor="attachment">Attachment:</label>
                                <input
                                    className="in-txtarea"
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    onChange={(e) => handleFileChange(e, 'attachment')}
                                    multiple
                                />
                                <div>
                                    {selectedAttachments.map((file, index) => (
                                        <div key={index}>{file.name}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-row">
                                <label htmlFor="document">Document:</label>
                                <input
                                    className="in-txtarea"
                                    type="file"
                                    id="document"
                                    name="document"
                                    onChange={(e) => handleFileChange(e, 'document')}
                                />
                                <div>
                                    {selectedDocuments.map((file, index) => (
                                        <div key={index}>{file.name}</div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-row client-search-row">
                                <label htmlFor="Add client">Add Client:</label>
                                <input
                                    className="in-txtarea"
                                    type="text"
                                    id="clientSearch"
                                    value={clientSearch}
                                    placeholder='Search Here...'
                                    onChange={handleClientSearchChange}
                                    required={!selectedClient}
                                />
                                {clientResults.map(client => (
                                    <div key={client.email} className="client-result">
                                        {client.name} ({client.email})
                                        <button className="add-form-btn" type="button" onClick={() => handleAddClient(client)}>Add</button>
                                    </div>
                                ))}
                            </div>
                            {selectedClient && (
                                <div className="selected-client">
                                    {selectedClient.name} ({selectedClient.email})
                                    <button className="add-form-btn" type="button" onClick={handleRemoveClient}>Remove</button>
                                </div>
                            )}
                            <div className="form-row">
                                <button className="add-form-btn" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div>
        //         )
        //     }
        // </div >
    );
};

export default Projects;
