import React, { useState } from 'react';

const YourFormComponent = () => {
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
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                    <label>End Date:</label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <div>
                    {/* <label>Dropdown:</label>
                    <select value={dropdownValue} onChange={(e) => setDropdownValue(e.target.value)}>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                    </select> */}
                    <div>
                        <input type="text" value={teamMemberValue}
                            onChange={handleteammemberChange}
                            onFocus={handleTeamMemberInputFocus}
                            onBlur={handleTeamMemberInputBlur}
                            placeholder="Enter team member" />

                        {isListVisible && (
                            <ul>
                                {teamMemberListItems.map((item, index) => (
                                    <li key={index} onClick={() => handleTeamMemberItemClick(item)}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}

                        {/* <ul>
                            {teamMemberListItems.map((item, index) => (
                                <li key={index} onClick={() => handleTeamMemberItemClick(item)}>{item}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
            {submissionMessage && <div>{submissionMessage}</div>}
        </div>
    );
};

export default YourFormComponent;
