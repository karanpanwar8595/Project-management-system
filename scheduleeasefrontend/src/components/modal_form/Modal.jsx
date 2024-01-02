import React, { useState } from 'react';
import plus from '../manage_team/plus.png'
import './modal.css'; // Make sure to create a CSS file for your styles

// Sample data representing persons
const personsData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', image: 'url_to_image_1' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', image: 'url_to_image_2' },
    // Add more persons as needed
];

const Modal = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPersons, setSelectedPersons] = useState([]);

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

    return (
        <div>
            {/* <button onClick={openModal} className='modal-button button'>Add person</button> */}
            <img src={plus} className='plus-symbol' onClick={openModal}  alt="Plus Symbol" />

            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="modal-content">
                            <h2>Search and Add Persons</h2>
                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button onClick={handleSearch}>Search</button>

                            {searchResults.length > 0 ? (
                                <ul>
                                    {searchResults.map(person => (
                                        <li key={person.id} className='person-item'>
                                            <img className='person-image' src="https://randomuser.me/api/portraits/men/4.jpg" alt={person.name} />
                                            <div className='person-details'>
                                                <h3>{person.name}</h3>
                                                <p>{person.email}</p>
                                            </div>
                                            {/* <button onClick={() => handleAddPerson(person)}>Select</button> */}
                                            <button
                                                onClick={() => handleAddPerson(person)}
                                                disabled={selectedPersons.some((selectedPerson) => selectedPerson.id === person.id)}
                                            >
                                                {selectedPersons.some((selectedPerson) => selectedPerson.id === person.id)
                                                    ? 'Selected'
                                                    : 'Select'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No results found.</p>
                            )}

                            <h2>Selected Persons</h2>
                            {selectedPersons.length > 0 ? (
                                <ul>
                                    {selectedPersons.map(person => (
                                        <li key={person.id} className='person-item'>
                                            <img src="https://randomuser.me/api/portraits/men/4.jpg" alt={person.name} className='person-image' />
                                            <div className='person-details'>
                                                <h3>{person.name}</h3>
                                                <p>{person.email}</p>
                                            </div>

                                            <button onClick={() => handleRemovePerson(person)} >Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No persons selected.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
