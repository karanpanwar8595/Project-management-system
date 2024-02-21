import React, { useState, useEffect } from 'react';
import './Tasklist.css'; // Import your custom CSS
import './Accordion.css';
import plus from './plus.png'
import { Link } from 'react-router-dom';
import editicon from './editicon.png';
import { faPencilAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const AccordionItem = ({ task_id,task_key, title, content, actstatus, duedate, owner, progress, done_key,startdate}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    console.log("sta", actstatus)
    const [status, setStatus] = useState(actstatus);
    // const [addButtonintask, setAddButtonInTask] = useState(false);
    // console.log("status", status)
    useEffect(() => {

        if (status === 'Completed') {
            setIsComplete(true)
        }
    }, [])
    const handleTaskboxToggle = () => {
        setIsOpen(!isOpen);
    };
    const addButtonHandle = () => {
        setStatus("Completed")
        setIsComplete(true)
        console.log("add button click")

    };

    return (
        <div className="accordion-item" key={task_key}>
            <div className={`task-item `} >
                <div className="accordion-button" onClick={handleTaskboxToggle}>
                    {title}
                </div>

                <div className="accordion-edit-button" onClick={(event) => event.stopPropagation()}>
                    {isComplete ? (

                        <></>

                    ) : (
                        <Link to="/modifytask" state={{ tasks: { task_id,task_key, title, content, actstatus, duedate, owner, progress, done_key,startdate } }}>
                            <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: '24px' }} />
                        </Link>
                    )}

                </div>

                <div className="accordion-download-button" onClick={(event) => event.stopPropagation()}>
                    {/* <Link to="/" state={{ task_id: { task_key } }}> */}
                    <FontAwesomeIcon icon={faDownload} style={{ fontSize: '24px' }} />

                </div>

                {/* <div className='accordion-status'>{status}</div> */}
                <div className='accordion-duedate'>{duedate}</div>

                <div className='accordion-owner'>{owner}</div>
                <div
                    className={`accordion-add-button ${done_key} ${isComplete ? 'complete' : 'bymenotcomplete'}`} key={done_key}
                    onClick={(event) => { event.stopPropagation(); }}
                > {status}
                </div>
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="accordion-body">{content}</div>
            </div>
        </div>
    );
};


const Tasklist = () => {
    useEffect(() => {
        projectuserin();
    }, []);

    const [taskList, setTasklist] = useState([
    ]);

    const fetchalltasktoother = (project_id) => {
        axios.post('http://127.0.0.1:8000/api/taskassigntoother/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email,projectid:project_id }).then((response) => {
            if (response) {
                console.log(response.data.data);
                setTasklist(response.data.data);

            }
        }, (error) => {
            console.log(error);
        });
    }
    const [selectedProject, setSelectedProject] = useState();
    const [selectedProjectId, setSelectedProjectId] = useState(0);
    const [projects, setProjects] = useState([

    ]);

    const handleProjectChange = (event) => {
        const selectedproject = event.target.value;
        console.log("eventvalue", event.target.value);
        setSelectedProject(event.target.value);
        setSelectedProjectId(selectedproject);
    
        console.log('selectedProject', selectedProjectId);
        fetchalltasktoother(selectedproject);
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

    return (



        <div className="accordion taskconcontainer">
            <select className='select-project' value={selectedProject} onChange={(event) => handleProjectChange(event)}>
                <option key="0"value="">Select a Project</option>
                {projects && projects.map((project) => (
                    <option key={project.projects.id} value={project.projects.id}>{project.projects.name}</option>
                ))}
            </select>
            
            <div className='tasklist'>
                <div className="task-title-bar">
                    <div className='accordion-header-element'>Task</div>
                    <div className='accordion-status'></div>
                    <div className='accordion-status'></div>
                    <div className='accordion-duedate'>Due Date</div>
                    <div className='accordion-progress'>Assign To</div>
                    <div className='accordion-owner'>Status</div>
                </div>
                <div className='task-row'>
                    {taskList.map(task => (
                        <AccordionItem
                            title={task.task_title}
                            content={task.task_desc}
                            actstatus={task.completion_date === null ? "Complete" : "Completed"}
                            startdate={task.start_date}
                            duedate={task.deadline}
                            owner={task.team_member_id && task.team_member_id.name}
                            task_id={task.task_id}
                        />
                    ))}
                </div>
            </div>
            <Link to="/addtask" state={{selectedProjectId}}><img src={plus} class='plus-symbol' alt='not found' /></Link>
        </div>
    );
};

export default Tasklist;














