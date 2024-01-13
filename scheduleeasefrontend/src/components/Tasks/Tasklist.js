import React, { useState, useEffect } from 'react';
import './Tasklist.css'; // Import your custom CSS
import './Accordion.css';
// import DateRangePickerComp from './DateRangePickerComp';

const AccordionItem = ({ task_key, title, content, status, duedate, owner, progress, done_key }) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [addButtonintask, setAddButtonInTask] = useState(false);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const addButtonHandle = () => {
        // if 
        console.log("add button click")

    };
    return (
        <div className="accordion-item" key={task_key}>
            <div className={`task-item ${isOpen ? 'active' : ''}`} onClick={handleToggle}>
                <button className="accordion-button" >
                    {title}
                </button>
                <div className='accordion-status'>{status}</div>
                <div className='accordion-duedate'>{duedate}</div>

                <div className='accordion-owner'>{owner}</div>
                <div
                    className='accordion-add-button ${done_key}' key={done_key}
                    onClick={(event) => { event.stopPropagation(); addButtonHandle(); }}
                > Add
                </div>
            </div>
            <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
                <div className="accordion-body">{content}</div>
            </div>
        </div>
    );
};



const Tasklist = () => {

    const [taskList, setTasklist] = useState([{ title: "firsttask", content: "This is thehhis is the second item's accordion body. It is hidden by default, until the collapse pis is the second item's accordion body. It is hidden by default, until the collapse phis is the second item's accordion body. ", status: "Active", duedate: "12/10/2023", progress: "20%", owner: "Ujjwal" }]);
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
                <div className='tasktitleandbutton'>
                    <label>

                        <input
                            type="text"
                            name="message"
                            placeholder='Title'
                        />
                    </label>
                    <label>
                        <textarea className='taskdescription'
                            name="description"
                            placeholder='Description'
                        />
                    </label>
                    {/* <DateRangePickerComp/> */}
                    <label>
                        Dropdown:
                        <select name="selectedOption" >
                            <option value="Option 1">Option 1</option>
                            <option value="Option 2">Option 2</option>
                            <option value="Option 3">Option 3</option>
                        </select>
                    </label>
                    <button >Send</button>


                </div>



            </div>


        </div>
    );
};

export default Tasklist;














