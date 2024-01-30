import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './Addtask.css';
import { useLocation } from 'react-router-dom';

const AddTask = () => {

    const [taskname, setTaskName] = useState();
    const [taskDec, setTaskDesc] = useState();

    const [startDate, setStartDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [selectedTeamMember, setSelectedTeamMember] = useState([]);






    const [teammembers, setTeamMembers] = useState([
        { name: 'hello asdf', email: 'cl@mail.com' },
        { name: 'Ujjwal Bhansali', email: 'ujjwalbhansali@gmail.com' },
        { name: 'Karan Panwar', email: 'karanpanwar@gmail.com' },
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


    const FetchTeamMember = async () => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/fetchteamMember/');

            console.log('teamMember', response.data.data)
            if (response.data.value) {
                setTeamMembers(response.data.data)
                console.log(teammembers)
                console.log(response.data.data)

            } else {
                console.log('teamMember failed');
            }

        } catch (error) {
            console.error(error);
        }

    };

  
  

    useEffect(() => {//this help in seting authentication to false when we relode

        try {
            const role_id = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;
         
            console.log(role_id);






        } catch (error) {
            console.log(error);
        }

        // TaskDetails();
        FetchTeamMember();

        console.log("edit projeft open")
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

       
        setSelectedTeamMember(null);
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
                                        <div key={teammember.email} className="teammember-result">
                                            <div>{teammember.name} ({teammember.email}</div>
                                            )
                                            <button className="add-form-btn" type="button" onClick={() => handleAddTeamMember(teammember)}

                                            >Add</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {selectedTeamMember && (
                                <div className="selected-teammember">
                                    {selectedTeamMember.name} ({selectedTeamMember.email})
                                    <button className="add-form-btn" type="button" onClick={handleRemoveTeamMember}>Remove</button>
                                </div>
                            )}

                            
                        </form>
                        <div className="form-row">
                                <button className="add-form-btn" type="submit">Submit</button>
                            </div>
                 
            
            
        </div>
        //         )
        //     }
        // </div >
    );
};

export default AddTask;
































// import React, { useState } from 'react';
// import './Addtask.css';

// const YourFormComponent = () => {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     const [teamMemberValue, setteamMemberValue] = useState('');
//     const [dropdownInput, setDropdownInput] = useState('');
//     const [submissionMessage, setSubmissionMessage] = useState('');
//     const [inputValue, setInputValue] = useState('');
//     const teamMemberListItemsConst = ['Apple', 'Banana', 'Orange'];
//     const [teamMemberListItems, setTeamMemberListItems] = useState(['Apple', 'Banana', 'Orange']);
//     const [isListVisible, setListVisible] = useState(false);
//     const [selectedAttachments, setSelectedAttachments] = useState([]);


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         setSubmissionMessage('Form submitted successfully!');
//     };

//     const handleteammemberChange = (e) => {
//         const value = e.target.value;
//         setteamMemberValue(value);
//         // Filter the list based on the input value
//         const filteredItems = teamMemberListItems.filter((item) =>
//             item.toLowerCase().includes(value.toLowerCase())
//         );
//         // Update the list with the filtered items
//         setTeamMemberListItems(filteredItems);
//     };

//     const handleTeamMemberItemClick = (itemName) => {
//         setteamMemberValue(itemName);
//     };
//     const handleTeamMemberInputFocus = () => {
//         setListVisible(true);
//     };

//     const handleTeamMemberInputBlur = () => {
//         // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
//         setTimeout(() => setListVisible(false), 200);
//     };
//     const handleFileChange = (e, type) => {
//         const newFiles = Array.from(e.target.files);
//         if (type === 'attachment') {
//             setSelectedAttachments(old => [...old, ...newFiles]);
//         } else {
//             setSelectedDocuments(old => [...old, ...newFiles]);
//         }
//     };
//     return (
//         <div id="addtask-form-container">
//             <form onSubmit={handleSubmit}>
//                 <div className='task-title'>
//                     <label className='form-label'>Title:</label>
//                     <input type="text" className='form-input' value={title} onChange={(e) => setTitle(e.target.value)} />
//                 </div>
//                 <div className='task-description'>
//                     <label className='form-label'>Description:</label>
//                     <textarea className='form-input' value={description} onChange={(e) => setDescription(e.target.value)} />
//                 </div>
//                 <div className='task-startdate'>
//                     <label className='form-label'>Start Date:</label>
//                     <input type="date" className='form-input' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 </div>
//                 <div className='task-enddate'>
//                     <label className='form-label'>End Date:</label>
//                     <input type="date" className='form-input' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                 </div>

//                 <div className="attach-container">
//                     <label htmlFor="taskattachment" className='form-label'>Attachment:</label>
//                     <input
//                         className="in-txtarea"
//                         type="file"
//                         id="taskattachment"
//                         name="taskattachment"
//                         onChange={(e) => handleFileChange(e, 'taskattachment')}
//                     />
//                     <div>
//                         {selectedAttachments.map((file, index) => (
//                             <div key={index}>{file.name}</div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className='listofteammember'>
//                     <input
//                         type="text"
//                         value={teamMemberValue}
//                         onChange={handleteammemberChange}
//                         onFocus={handleTeamMemberInputFocus}
//                         onBlur={handleTeamMemberInputBlur}
//                         placeholder="Enter team member"
//                         className='form-input'
//                     />
//                     {isListVisible && (
//                         <div className='teammemberlist'>
//                             {teamMemberListItems.map((item, index) => (
//                                 <div
//                                     className="teammemberlistitem"
//                                     key={index}
//                                     onClick={() => handleTeamMemberItemClick(item)}
//                                 >
//                                     {item}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>

//                 <button className='submit-button' type="submit">Submit</button>
//             </form>
//             {submissionMessage && <div className='submission-message'>{submissionMessage}</div>}
//         </div>
//     );
// };

// export default YourFormComponent;
