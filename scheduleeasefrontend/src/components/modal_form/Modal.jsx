import React, { useState, useEffect } from 'react';
import './modal.css'; // Make sure to create a CSS file for your styles
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';

// Sample data representing persons
// const personsData = [
//     { id: 1, name: 'John Doe', email: 'john@example.com', image: 'url_to_image_1' },
//     { id: 2, name: 'Jane Doe', email: 'jane@example.com', image: 'url_to_image_2' },
//     // Add more persons as needed
// ];

const Modal = () => {
    const location = useLocation();
    // const project1 = JSON.stringify(location.state.project1);
    // const project = JSON.parse(project1).project
    const selectedproject = location.state.selectedProject
    console.log(13, selectedproject)
    const [personsData, setPersonsData] = useState([]);

    
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPersons, setSelectedPersons] = useState([]);



    const AllMembers = async () => {
        try {
            const Details = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email };
            const response = await axios.post('http://127.0.0.1:8000/api/allmember/', Details);
            // ye data request me jayega in views.py
            if (response.data['value']) {
                console.log(response.data);
                setPersonsData(response.data.data)
                // setOngoingProjects(response.data.projectdetails)
                console.log('Project component connected');
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };
    const AddTeamMember = async () => {
        try {
            
            const UserDetails = { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, selecteduser: selectedPersons, project_id: selectedproject };
            const response = await axios.post('http://127.0.0.1:8000/api/addteammembers/', UserDetails);
            // ye data request me jayega in views.py
            if (response.data['value']) {
                console.log(response.data.message);
                // setOngoingProjects(response.data.projectdetails)
                console.log('Project component connected');
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {

        AllMembers();
    }, []);
    const openModal = () => {
        setModalVisible(true);
        setSearchTerm('');
        setSearchResults([]);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSearch = () => {
        // Simulating a case-insensitive search based on the person's name
        const results = personsData.filter(person =>
            person.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
    };

    const handleAddPerson = person => {
        // Add the selected person to the list
        setSelectedPersons([...selectedPersons, person]);
    };

    const handleRemovePerson = (person) => {
        const updatedSelectedPersons = selectedPersons.filter(
            (selectedPerson) => selectedPerson.id !== person.id
        );
        setSelectedPersons(updatedSelectedPersons);
    };
    const handleAddMember = () => {
        // Your logic to handle the click event goes here
        console.log("Add members button clicked!");
        // You can call your function to handle the submission here
        AddTeamMember();
        if (selectedPersons == '')
        {
            alert("Please select the team member")
        } 
        else
        {
            alert("Team member added successfully")
        }
        setSelectedPersons([])
    };
    return (
        <div>
            {/* <button onClick={openModal} className='modal-button button'>Add person</button> */}




            <div className="teammember-modal">

                <div className="teammember-modal-content">
                    <h2>Add Team member</h2>
                    <input
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>

                    {searchResults.length > 0 ? (
                        <div className='addteammemberlistcard'>
                            {searchResults.map(person => (
                                <div key={person.email} className='person-item'>
                                    <img className='person-image' src={pic4} alt={person.name} />
                                    <div className='person-details'>
                                        <h3 className='person-name'>{person.name}</h3>
                                        <p className='person-email'>{person.email}</p>
                                    </div>
                                    {/* <button onClick={() => handleAddPerson(person)}>Select</button> */}
                                    <button
                                        onClick={() => handleAddPerson(person)}
                                        disabled={selectedPersons.some((selectedPerson) => selectedPerson.id === person.email)}
                                    >
                                        {selectedPersons.some((selectedPerson) => selectedPerson.id === person.email)
                                            ? 'Selected'
                                            : 'Select'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found.</p>
                    )}







                    <h2>Selected Persons</h2>
                    {selectedPersons.length > 0 ? (
                        <div className='addteammemberlistcard'>

                            {selectedPersons.map(person => (
                                <div key={person.email} className='person-item'>
                                    <img src={pic4} alt={person.name} className='person-image' />
                                    <div className='person-details'>
                                        <h3 className='person-name'>{person.name}</h3>
                                        <p className='person-email'>{person.email}</p>
                                    </div>

                                    <button onClick={() => handleRemovePerson(person)} >Remove</button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No persons selected.</p>
                    )}
                </div>
                <div className='addteammemberbutton' onClick={handleAddMember}>
                    Add members
                </div>
            </div>
        </div>


    );
};

export default Modal;
