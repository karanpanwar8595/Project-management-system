import React, { useState, useEffect } from 'react';
import './Tasklist.css'; // Import your custom CSS
import './Accordion.css';
import plus from './plus.png'
import { Link } from 'react-router-dom';
import editicon from './editicon.png';
import { faPencilAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const AccordionItem = ({ task_key, title, content, actstatus, duedate, owner, progress, done_key ,startdate}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    console.log("sta", actstatus)
    const [status, setStatus] = useState(actstatus);
    // const [addButtonintask, setAddButtonInTask] = useState(false);
    console.log("status", status)
    useEffect(() => {
        if (status == 'Completed') {
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
                        <Link to="/modifytask" state={{tasks :{ task_key, title, content, actstatus, duedate, owner, progress, done_key }}}>
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
        fetchalltasktoother();
    }, []);

    const [taskList, setTasklist] = useState([{ title: "Customer entity front-end design", content: "It involves creating a visually appealing and user-friendly interface for managing customer records, including features such as listing, detailed views, and interactive forms, ensuring a seamless and intuitive user experience within the software application.", status: "Completed", duedate: "12/10/2023", startdate: "12-10-2023", progress: "20%", owner: "Vikas Jaiswal" }, 
    { title: "Feasibilty study", content: "It involves assessing the practicality and viability of a proposed project, evaluating factors such as economic, technical, and operational aspects to determine if the project is achievable and beneficial within given constraints", status: "Complete", duedate: "12-10-2023", startdate: "12/10/2023", progress: "20%", owner: "Sunil Srivastava" }]);

    const fetchalltasktoother = () => {
        axios.post('http://127.0.0.1:8000/api/taskassigntoother/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
            if (response) {
                console.log(response.data);

            }
        }, (error) => {
            console.log(error);
        });
    }


    return (



        <div className="accordion taskconcontainer">
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
                            title={task.title}
                            content={task.content}
                            actstatus={task.status}
                            duedate={task.duedate}
                            progress={task.progress}
                            owner={task.owner}
                        />
                    ))}
                </div>
            </div>
            <Link to="/addtask"><img src={plus} class='plus-symbol' alt='not found' /></Link>
        </div>
    );
};

export default Tasklist;














