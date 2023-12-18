import React, { useState, useEffect } from 'react';
import './Tasklist.css'; // Import your custom CSS
import './Accordion.css';
const AccordionItem = ({ title, content, status, duedate, owner, progress }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div className={`task-item ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
                <button className="accordion-button" >
                    {title}
                </button>
                <div className='accordion-status'>{status}</div>
                <div className='accordion-duedate'>{duedate}</div>
                <div className='accordion-progress'>{progress}</div>
                <div className='accordion-owner'>{owner}</div>
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="accordion-body">{content}</div>
            </div>
        </div>
    );
};

const Tasklist = () => {

    const [taskList, setTasklist] = useState([{ title: "firsttask", content: "This is thehhis is the second item's accordion body. It is hidden by default, until the collapse pis is the second item's accordion body. It is hidden by default, until the collapse phis is the second item's accordion body. ", status: "Active", duedate: "", progress: "20%", owner: "Ujjwal" }]);
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:8000/");
                const tasklist1 = await res.json();
                setTasklist(tasklist1);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    }, []);


    return (
        // <div className="taskconcontainer">


        <div className="accordion taskconcontainer">
            <div className='tasklist'>


                <div className="onetask">
                    <div className='accordion-header-element'>Task</div>
                    <div className='accordion-status'>Active</div>
                    <div className='accordion-duedate'>Due Date</div>
                    <div className='accordion-progress'>Progress</div>
                    <div className='accordion-owner'>Owner</div>
                </div>
                <div className='task-row'>
                    {taskList.map(task => (
                        <AccordionItem
                            title={task.title}
                            content={task.content}
                            status={task.status}
                            duedate={task.duedate}
                            progress={task.progress}
                            owner={task.owner}
                        />
                    ))}
                </div>
            </div>

            <div className='taskinput'>
                <input type="text" className="textboxtoinput" id="tasktextbox" >
                    {/* <input type="text" className="textboxtoinput" id="messagetextbox" value={inputValueMessageTextBox} onChange={handleChangeInputTask}> */}

                </input>

                <button >
                    send
                </button>
            </div>
        </div>


        // </div>
    );
};

export default Tasklist;