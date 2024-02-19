import React, { useState, useEffect } from 'react';
import './Tasklist.css'; // Import your custom CSS
import './Accordion.css';
import plus from './plus.png'
import { Link } from 'react-router-dom';
import editicon from './editicon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { faDownload } from '@fortawesome/free-solid-svg-icons';

const AccordionItem = ({ task_id, title, content, actstatus, duedate, owner, progress, done_key,completion_date }) => {
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
    const TaskCompleted = () => {
        axios.post('http://127.0.0.1:8000/api/taskcompleted/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ,taskid:task_id}).then((response) => {
            if (response.data.value) {
                console.log(response.data);
                setStatus("Completed")
                setIsComplete(true)
            }
        }, (error) => {
            console.log(error);
        });
    };
    const addButtonHandle = () => {

        console.log("add button click")
        TaskCompleted()

    };

    return (
        <div className="accordion-item" key={task_id}>
            <div className={`task-item `} >
                <div className="accordion-button" onClick={handleTaskboxToggle}>
                    {title}
                </div>

                <div className="accordion-download-button" onClick={(event) => event.stopPropagation()}>

                    <FontAwesomeIcon icon={faDownload} style={{ fontSize: '24px' }} />

                </div>

                {/* <div className='accordion-status'>{status}</div> */}
                <div className='accordion-duedate'>{duedate}</div>


                <div className='accordion-owner'>{owner}</div>
                <div
                    className={`accordion-add-button ${done_key} ${isComplete ? 'complete' : 'notcomplete'}`} key={done_key}
                    onClick={(event) => { event.stopPropagation(); addButtonHandle(); }}
                > {status}<br/>{completion_date}
                </div>
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="accordion-body">{content}</div>
            </div>
        </div>
    );
};



const Tasklist = () => {


    const [taskList, setTasklist] = useState(null);

    useEffect(() => {
        fetchalltaskofme();
    }, []);
    const fetchalltaskofme = (event) => {

        axios.post('http://127.0.0.1:8000/api/taskassigntome/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
            if (response) {
                console.log(response.data);
                setTasklist(response.data.data);
                console.log(taskList)
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
                    {/* <div className='accordion-status'></div> */}
                    <div className='accordion-status'></div>
                    <div className='accordion-duedate'>Due Date</div>
                    <div className='accordion-progress'>Manage By</div>
                    <div className='accordion-owner'>Status</div>
                </div>
                <div className='task-row'>
                    {taskList && Array.isArray(taskList) && taskList.map(task => (
                        <AccordionItem
                            title={task.task_title}
                            content={task.task_desc}
                            actstatus={task.completion_date === null ? "Complete" : "Completed"}
                            completion_date={task.completion_date}
                            startdate={task.start_date}
                            duedate={task.deadline}
                            owner={task.manager_id && task.manager_id.name}
                            task_id={task.task_id}
                        />
                    ))}
                </div>
            </div>
            {/* <Link to="/addtask"><img src={plus} class='plus-symbol' alt='not found' /></Link> */}
        </div>
    );
};

export default Tasklist;














