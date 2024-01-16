import React, { useState,useEffect } from 'react'
import './Projects.css'
import plus from './plus.png'
// import ProjectDetails from './ProjectDetails.js'
import { Link } from 'react-router-dom';
import { Switch, Case, Default } from 'react-router-dom';


const Projects = () => {
    const [userrole,setUserRole]=useState(0);
    const [isManager,setIsManager]=useState(false);
    
    useEffect(() => {//this help in seting authentication to false when we relode

        try {
            const role_id=JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
            setUserRole(role_id);
            console.log(role_id);


            
            if (role_id == "1"){
                setIsManager(true); 
            }
            else{
                setIsManager(false);

            }

          
        } catch (error) {
console.log(error);
        }
      }, []);
    const ongoingProjects = [
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
        {
            id: 2,
            name: 'TechMinds Initiative',
            dueDate: '2024-05-12',
            startDate: '2024-01-12',
            completion: 45,
            projectDescription: 'TechMinds Initiative is developed for technical solutions.',
            budget: '120000',
            companyName: 'TechMind Pvt. Ltd.',
            clientName: 'Ujjwal bhansali',
            attachments: ['/project-plan.pdf'],
            documents: ['/Aadhar.jpg', '/4th sem result.pdf']
        },
        {
            id: 3,
            name: 'GreenScape Solutions',
            dueDate: '2025-01-28',
            startDate: '2024-01-05',
            completion: 23,
            projectDescription: 'GreenScape Solutions IT Project focuses on developing innovative and eco-friendly technology solutions.',
            budget: '70000',
            companyName: 'GreenScape Services',
            clientName: 'Malhar Prajapati',
            attachments: ['/project-plan.pdf'],
            documents: ['/Aadhar.jpg', '/4th sem result.pdf']
        },
        {
            id: 4,
            name: 'DataCrafters Project',
            dueDate: '2024-04-15',
            startDate: '2024-01-01',
            completion: 100,
            projectDescription: 'This project involves creating advanced data-driven solutions, combining analytics and technology expertise to optimize information processing and decision-making in various domains.',
            budget: '70000',
            companyName: 'Bloomberg Inc.',
            clientName: 'Mitul Pipaliya',
            attachments: ['/project-plan.pdf'],
            documents: ['/Aadhar.jpg', '/4th sem result.pdf']
        },
    ];

    const assignedProjects = [
        { id: 1, name: 'SmartCity Blueprint', dueDate: '2023-12-18', man: 'Alex Reynolds' },
        { id: 2, name: 'Zoho Projects', dueDate: '2021-01-12', man: 'Sarah Mitchell' },
        { id: 3, name: 'Project BlueSky', dueDate: '2021-01-28', man: 'Dakshay Sharma' },
        { id: 4, name: 'RenewaTech Ventures', dueDate: '2023-12-18', man: 'Nathan Walter' },
    ];

    const clients = [
        { name: 'Mitul Pipaliya', email: 'mitulpipaliya@gmail.com' },
        { name: 'Ujjwal Bhansali', email: 'ujjwalbhansali@gmail.com' },
        { name: 'Karan Panwar', email: 'karanpanwar@gmail.com' },
    ];
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

    // For projects detailed view component
    // const [selectedProject, setSelectedProject] = useState(null);
    // const [projectDetailsVisible, setProjectDetailsVisible] = useState(false);

    //------------------------------------------------------------------------------------------------------------------------

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
        const projectName = event.target.projectName.value;
        const today = new Date().toISOString().split('T')[0];
        if (startDate < today) {
            alert('Start date must be today or a future date.');
            return;
        }
        if (dueDate <= startDate) {
            alert('Due date must be greater than the start date.');
            return;
        }
        const newProject = {
            id: newProjects.length + 1, // Simple id assignment, consider using a more robust method
            name: projectName,
            dueDate: dueDate,
            completion: 0
        };

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
                        {[...ongoingProjects, ...newProjects].map((project) => (
                            <Link 
                                to='/ProjectDetails'
                                state={{project}}
                                style={{ textDecoration: 'none', color: 'black' }} 
                            >
                            <div key={project.id} className="project-card">

                                <div className="project-details">
                                    <div className="detail-item">{project.name}</div>
                                    <div className="detail-item">{project.dueDate}</div>
                                    <div className="detail-item">
                                        <div className="progress-container">
                                            <div
                                                className={`progress-filler ${getProgressClass(project.completion)}`}
                                                style={{ width: `${project.completion}%` }}>
                                                <span className="progress-label">{`${project.completion}%`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}

                        <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Assign to me</h3>
                        <div className="project-header">
                            <div className="header-item">Project Name</div>
                            <div className="header-item">Due Date</div>
                            <div className="header-item">Project Manager</div>
                        </div>
                        {assignedProjects.map((project) => (
                            <div key={project.id} className="project-card">
                                <div className="project-details">
                                    <div className="detail-item">{project.name}</div>
                                    <div className="detail-item">{project.dueDate}</div>
                                    <div className="detail-item">{project.man}</div>
                                </div>
                            </div>
                        ))}
                        <img src={plus} class='plus-symbol' alt='not found' onClick={toggleForm} />
    </> 
):(
     <>
    <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Project</h3>
                        <div className="project-header">
                            <div className="header-item">Project Name</div>
                            <div className="header-item">Due Date</div>
                            <div className="header-item">Progress</div>
                        </div>
                        {[...ongoingProjects, ...newProjects].map((project) => (
                            <Link 
                                to='/ProjectDetails'
                                state={{project}}
                                style={{ textDecoration: 'none', color: 'black' }} 
                            >
                            <div key={project.id} className="project-card">

                                <div className="project-details">
                                    <div className="detail-item">{project.name}</div>
                                    <div className="detail-item">{project.dueDate}</div>
                                    <div className="detail-item">
                                        <div className="progress-container">
                                            <div
                                                className={`progress-filler ${getProgressClass(project.completion)}`}
                                                style={{ width: `${project.completion}%` }}>
                                                <span className="progress-label">{`${project.completion}%`}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}
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
                                            <input className="in-txtarea" type="text" id="projectName" name="projectName" required />
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
                                            <textarea className="in-txtarea" id="projectDescription" name="projectDescription" />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="budget">Budget:</label>
                                            <input className="in-txtarea" type="number" id="budget" name="budget" required />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="companyName">Company Name:</label>
                                            <input className="in-txtarea" type="text" id="companyName" name="companyName" required />
                                        </div>
                                        <div className="form-row">
                                            <label htmlFor="attachment">Attachment:</label>
                                            <input
                                                className="in-txtarea"
                                                type="file"
                                                id="attachment"
                                                name="attachment"
                                                onChange={(e) => handleFileChange(e, 'attachment')}
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
