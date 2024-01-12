import React, { useEffect,useState } from 'react';
import './Modifytask.css';
import { useLocation } from 'react-router-dom';



const Modifytask = () => {
    const location = useLocation();
    const taskkey = location.state.task_id;
    console.log("modify");

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [teamMemberValue, setteamMemberValue] = useState('');
    const [dropdownInput, setDropdownInput] = useState('');
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [inputValue, setInputValue] = useState('');
    const teamMemberListItemsConst = ['Apple', 'Banana', 'Orange'];
    const [teamMemberListItems, setTeamMemberListItems] = useState(['Apple', 'Banana', 'Orange']);
    const [isListVisible, setListVisible] = useState(false);
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);



    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmissionMessage('Form submitted successfully!');
    };

    const handleteammemberChange = (e) => {
        const value = e.target.value;
        setteamMemberValue(value);
        // Filter the list based on the input value
        const filteredItems = teamMemberListItemsConst.filter((item) =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        // Update the list with the filtered items
        setTeamMemberListItems(filteredItems);
    };

    const handleTeamMemberItemClick = (itemName) => {
        setteamMemberValue(itemName);
    };
    const handleTeamMemberInputFocus = () => {
        setListVisible(true);
    };

    const handleTeamMemberInputBlur = () => {
        // Adding a slight delay to prevent the list from disappearing before the click on list item is registered
        setTimeout(() => setListVisible(false), 200);
    };
    const handleFileChange = (e, type) => {
        const newFiles = Array.from(e.target.files);
        if (type === 'attachment') {
            setSelectedAttachments(old => [...old, ...newFiles]);
        } else {
            setSelectedDocuments(old => [...old, ...newFiles]);
        }
    };
    
    return (
        <div id="addtask-form-container">
            <form onSubmit={handleSubmit}>
                <div className='task-title'>
                    <label className='form-label'>Title:</label>
                    <input type="text" className='form-input' value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='task-description'>
                    <label className='form-label'>Description:</label>
                    <textarea className='form-input' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='task-startdate'>
                    <label className='form-label'>Start Date:</label>
                    <input type="date" className='form-input' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className='task-enddate'>
                    <label className='form-label'>End Date:</label>
                    <input type="date" className='form-input' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>

                <div className="attach-container">
                    <label htmlFor="taskattachment" className='form-label'>Attachment:</label>
                    <input
                        className="in-txtarea"
                        type="file"
                        id="taskattachment"
                        name="taskattachment"
                        onChange={(e) => handleFileChange(e, 'taskattachment')}
                    />
                    <div>
                        {selectedAttachments.map((file, index) => (
                            <div key={index}>{file.name}</div>
                        ))}
                    </div>
                </div>

                <div className='listofteammember'>
                    <input
                        type="text"
                        value={teamMemberValue}
                        onChange={handleteammemberChange}
                        onFocus={handleTeamMemberInputFocus}
                        onBlur={handleTeamMemberInputBlur}
                        placeholder="Enter team member"
                        className='form-input'
                    />

                    {isListVisible && (
                        <div className='teammemberlist'>
                            {teamMemberListItems.map((item, index) => (
                                <div
                                    className="teammemberlistitem"
                                    key={index}
                                    onClick={() => handleTeamMemberItemClick(item)}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className='submit-button' type="submit">Submit</button>
            </form>
            {submissionMessage && <div className='submission-message'>{submissionMessage}</div>}
        </div>
    );
};

export default Modifytask;
