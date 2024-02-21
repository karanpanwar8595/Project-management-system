import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Addtask.css';
import { useLocation,useNavigate } from 'react-router-dom';

const AddTask = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const projectno = location.state.selectedProjectId;
    const [taskname, setTaskName] = useState();
    const [taskDec, setTaskDesc] = useState();

    const [startDate, setStartDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [selectedTeamMember, setSelectedTeamMember] = useState();
    const [teammemberSearch, setTeamMemberSearch] = useState('');
    const [teammemberResults, setTeamMemberResults] = useState([]);

    // Multiple/Delete attachment and document
    const [selectedAttachments, setSelectedAttachments] = useState([]);



    // validation in form
    const [taskNameError, setTaskNameError] = useState('');
    const [taskDescriptionError, setTaskDescriptionError] = useState('');

    // not used : const [companyNameError, setCompanyNameError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [dueDateError, setDueDateError] = useState('');





    const [teammembers, setTeamMembers] = useState([

    ]);

    const handleTeamMemberSearchChange = (e) => {
        setTeamMemberSearch(e.target.value);
        if (selectedTeamMember) {
            return;
        }
        if (e.target.value) {
            const searchResults = teammembers.filter(teammember =>
                teammember.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setTeamMemberResults(searchResults);
        } else {
            setTeamMemberResults([]);
        }
    };

    const handleAddTeamMember = (teammember) => {
        setSelectedTeamMember(teammember);
        setTeamMemberResults([]);
        setTeamMemberSearch('');
    };

    const handleRemoveTeamMember = () => {
        setSelectedTeamMember(null);
    };




    // Form TeamMember searching and adding



    const FetchTeamMember = async () => {
        try {
            console.log(projectno)
            const response = await axios.post('http://127.0.0.1:8000/api/teammembers/', { project_no: projectno });

            // console.log('teamMember', response.data.data)
            if (response.data.value) {
                setTeamMembers(response.data.data)
                console.log(teammembers)
                console.log("fetch team member of a project", response.data.data)

            } else {
                console.log('teamMember failed');
            }

        } catch (error) {
            console.error(error);
        }

    };


    const AddTaskDetails = async () => {
        try {
            const taskDetails = {
                username: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email,
                title: taskname,
                description: taskDec,
                taskstartdate: startDate,
                taskDueDate: dueDate,
                teammemberid: selectedTeamMember.member.email,
                project_id:projectno,

            }
            const response = await axios.post('http://127.0.0.1:8000/api/addtaskdetails/', taskDetails);
            console.log("add task details",response.data.value);
            if (response.data.value) {
                alert("Task has been assigned")
                setTaskName("");
                setTaskDesc("");
                setStartDate(null);
                setDueDate(null);
                setSelectedTeamMember(null);
                navigate('/taskbyme')
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error(error);
            return false;

        }

    };


    useEffect(() => {//this help in seting authentication to false when we relode
        FetchTeamMember();

        try {
            const role_id = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;

            console.log(role_id);

        } catch (error) {
            console.log(error);
        }

        // TaskDetails();
        FetchTeamMember();


    }, []);




    const handleAttachmentUpload = async () => {

        const formData = new FormData();
        // const formData = new FormData();
        selectedAttachments.forEach((file, _index) => {
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








    const handleFileChange = (e, type) => {
        console.log(e.target.files[0]);
        console.log(e.target.files);
        const newFiles = Array.from(e.target.files);
        if (type === 'attachment') {
            setSelectedAttachments(old => [...old, ...newFiles]);
        }
    };

    const removeAttachment = (index) => {
        setSelectedAttachments(old => old.filter((_, i) => i !== index));
    };



    // validation function
    const validateTaskName = (name) => {
        if (!name.trim()) return 'Task name is required.';
        if (name.length < 4) return 'Task name must be at least 4 characters long.';

        // name = name.replace(/\s+/g, ' ').trim();

        const firstFourCharacters = name.slice(0, 4);
        if (!/^[a-zA-Z]+$/.test(firstFourCharacters)) {
            return 'First four characters must be alphabets.';
        }

        const restOfName = name.slice(4);
        if (restOfName && !/^[a-zA-Z0-9 ]*$/.test(restOfName)) {
            return 'Only alphabets, digits, and a single space are allowed.';
        }

        if (/\s{2,}/.test(name)) {
            return 'Only a single space is allowed between words.';
        }

        if (/^(.)\1+$/.test(name)) {
            return 'Repeated characters are not allowed.';
        }

        // if (/[^a-zA-Z0-9]/.test(name)) {
        //     return 'Special characters are not allowed.';
        // }
        return '';
    };

    const validateTaskDescription = (desc) => {
        desc = desc.trim();

        if (desc) {
            if (desc.length < 20) {
                return 'Description is too short. Please provide more detail.';
            }
            if (desc.length > 400) {
                return 'Description is too long. Please shorten it to under 400 characters.';
            }
            if (/^(.)\1+$/.test(desc)) {
                return 'Please provide a more meaningful description.';
            }
            if (/\s{2,}/.test(desc)) {
                return 'Only a single space is allowed between words.';
            }
            if (/(.)\1{3,}/.test(desc)) {
                return 'Please avoid long sequences of the same character.';
            }
            if (/[^a-zA-Z0-9\s]{2,}/.test(desc)) {
                return 'Please avoid repeated special characters.';
            }
            if (!/([a-zA-Z].*){10,}/.test(desc)) {
                return 'Description must contain at least 10 alphabet characters.';
            }
        }
        return '';
    };



    // not used : const validateCompanyName = (name) => {
    //     if (!name.trim()) return 'Company name is required.';
    //     return '';
    // };

    const validateStartDate = (date) => {
        const today = new Date().toISOString().split('T')[0];
        if (date < today) return 'Start date must be today or a future date.';
        return '';
    };

    const validateDueDate = (startDate, dueDate) => {
        if (dueDate <= startDate) return 'Due date must be greater than the start date.';
        return '';
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Perform final validation checks
        const taskName = event.target.taskName.value;

        const projDes = event.target.taskDescription.value
        // const companyName = event.target.companyName.value;

        const taskNameError = validateTaskName(taskName);
        const taskDescriptionError = validateTaskDescription(projDes);

        // const companyNameError = validateCompanyName(companyName);
        const startDateError = validateStartDate(startDate);
        const dueDateError = validateDueDate(startDate, dueDate);

        if (taskNameError || startDateError || dueDateError) {
            setTaskNameError(taskNameError);
            setTaskDescriptionError(taskDescriptionError);

            // setCompanyNameError(companyNameError);
            setStartDateError(startDateError);
            setDueDateError(dueDateError);
            return;
        }

        AddTaskDetails();
    };

    //------------------------------------------------------------------------------------------------------------------------

    return (
        <div className="tasks-container">

            <h3>Add Task</h3>

            <form onSubmit={handleFormSubmit}>

                <div className="form-row">
                    <label htmlFor="taskName">Task Name:</label>
                    <input
                        className="in-txtarea"
                        type="text"
                        id="taskName"
                        name="taskName"
                        onChange={(e) => {
                            // Validation function (replace with your own validation logic)
                            const validationError = validateTaskName(e.target.value);

                            // Update state with the input value and validation result
                            setTaskName(e.target.value);
                            setTaskNameError(validationError);
                        }}
                        value={taskname}

                    />
                    {taskNameError && <span className="error-message">{taskNameError}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        className="in-txtarea"
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={startDate}
                        onChange={(e) => {
                            setStartDateError(validateStartDate(e.target.value));
                            setStartDate(e.target.value);
                        }}
                    />
                    {startDateError && <span className="error-message">{startDateError}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        className="in-txtarea"
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={dueDate}
                        onChange={(e) => {
                            setDueDateError(validateDueDate(startDate, e.target.value));
                            setDueDate(e.target.value);
                        }}
                    />
                    {dueDateError && <span className="error-message">{dueDateError}</span>}
                </div>
                <div className="form-row">
                    <label htmlFor="taskDescription">Task Description:</label>
                    <textarea className="in-txtarea" id="taskDescription" name="taskDescription"
                        value={taskDec}
                        onChange={(e) => {
                            setTaskDescriptionError(validateTaskDescription(e.target.value))
                            setTaskDesc(e.target.value);
                        }}
                    />
                    {taskDescriptionError && <span className="error-message">{taskDescriptionError}</span>}
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
                            <div key={index} className="file-item">
                                {file.name}
                                <span className="remove-icon" onClick={() => removeAttachment(index)}>×</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-row teammember-search-row">
                    <label htmlFor="Add teammember">Add TeamMember:</label>
                    <input
                        className="in-txtarea"
                        type="text"
                        id="teammemberSearch"
                        value={teammemberSearch}
                        placeholder='Search Here...'
                        onChange={handleTeamMemberSearchChange}
                        // required={!selectedTeamMember}
                        onFocus={() => {
                            setTeamMemberResults(teammembers);  // Assuming 'teammembers' is the data you want to set
                        }}
                        disabled={!!selectedTeamMember} // Disable when teammember is selected
                    />
                    <div className='teammemberlist'>

                        {teammemberSearch && teammemberResults.length === 0 && !selectedTeamMember && (
                            <div className="no-match-message">
                                No matching teammembers found.
                            </div>
                        )}
                        {teammemberResults.map(teammember => (
                            <div key={teammember.member.email} className="teammember-result">
                                <div>{teammember.member.name} {teammember.member.email}</div>
                                
                                <button className="add-form-btn" type="button" onClick={() => handleAddTeamMember(teammember)}

                                >Add</button>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedTeamMember && (
                    <div className="selected-teammember">
                        {selectedTeamMember.member.name} ({selectedTeamMember.member.email})
                        <button className="add-form-btn" type="button" onClick={handleRemoveTeamMember}>Remove</button>
                    </div>
                )}
                <div className="form-row">
                    <button className="add-form-btn" type="submit">Submit</button>
                </div>

            </form>
        </div>
        //         )
        //     }
        // </div >
    );
};

export default AddTask;


