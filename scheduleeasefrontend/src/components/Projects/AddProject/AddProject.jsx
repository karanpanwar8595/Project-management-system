import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './AddProject.css'
import { useNavigate} from 'react-router-dom';


const AddProject = () => {
  const navigate=useNavigate();

    useEffect(() => {//this help in seting authentication to false when we relode
        console.log("add project clicked");
        FetchClient();
    }, []);
    const [projectname, setProjectName] = useState('');
    const [projectDec, setProjectDesc] = useState('');
    const [budget, setBudget] = useState('');

    const [userrole, setUserRole] = useState(0);
    // Form Project start date and due date
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Form Client searching and adding
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientResults, setClientResults] = useState([]);

    // Multiple/Delete attachment and document
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    // New project addition
    const [newProjects, setNewProjects] = useState([]);

    // validation in form
    const [projectNameError, setProjectNameError] = useState('');
    const [projectDescriptionError, setProjectDescriptionError] = useState('');
    const [budgetError, setBudgetError] = useState('');
    // not used : const [companyNameError, setCompanyNameError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [dueDateError, setDueDateError] = useState('');

//all  clients
    const [clients, setClients] = useState([]);

    const FetchClient = async () => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/fetchclient/');

            console.log('client', response.data.data)
            if (response.data.value) {
                setClients(response.data.data)
                console.log(clients)
                console.log(response.data.data)

            } else {
                console.log('client failed');
            }

        } catch (error) {
            console.error(error);
        }

    };

    const AddingProject = async (ProjectDetails) => {
        try {

            const response = await axios.post('http://127.0.0.1:8000/api/addingproject/', ProjectDetails);
            // ye data request me jayega in views.py

            if (response.data['value']) {
                console.log('projecadded', response.data);
                console.log('Project component connected');
                handleAttachmentUpload(response.data.projectadded.project_id);
                handleDocumentUpload(response.data.projectadded.project_id);
                navigate('/project')
            } else {
                console.log("error")
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleAttachmentUpload = async (project_no) => {

        const formData = new FormData();
        // const formData = new FormData();
        selectedAttachments.forEach((file, _index) => {
            formData.append(`attachment`, file);
        });
        formData.append('project_no', project_no);
        formData.append('useremail', JSON.parse(sessionStorage.getItem('loginData')).profile_data.email );

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
    const handleDocumentUpload = async (project_no) => {

        const formData = new FormData();
        // const formData = new FormData();
        selectedDocuments.forEach((file, _index) => {
            formData.append(`attachment`, file);
        });
        formData.append('project_no', project_no);
        formData.append('useremail', JSON.parse(sessionStorage.getItem('loginData')).profile_data.email );

        try {
            await axios.post('http://127.0.0.1:8000/api/uploaddocument/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('File uploaded successfully');
        } catch (error) {
            console.error('Error uploading file:', error);
        }

    };


    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Perform final validation checks
        const projectName = event.target.projectName.value;
        const budget = event.target.budget.value;
        const projDes = event.target.projectDescription.value
        // const companyName = event.target.companyName.value;

        const projectNameError = validateProjectName(projectName);
        const projectDescriptionError = validateProjectDescription(projDes);
        const budgetError = validateBudget(budget);
        // const companyNameError = validateCompanyName(companyName);
        const startDateError = validateStartDate(startDate);
        const dueDateError = validateDueDate(startDate, dueDate);

        if (projectNameError || budgetError || startDateError || dueDateError) {
            setProjectNameError(projectNameError);
            setProjectDescriptionError(projectDescriptionError);
            setBudgetError(budgetError);
            // setCompanyNameError(companyNameError);
            setStartDateError(startDateError);
            setDueDateError(dueDateError);
            return;
        }

        if (!selectedClient) {
            alert('Please select a valid client');
            return;
        }
        const email = JSON.parse(sessionStorage.getItem('loginData')).profile_data.email;
        const client_email = selectedClient['email'].replace(/'/g, '');
        const newProject = {
            projectname: projectname,
            projectdescription: projectDec,
            startdate: startDate,
            dueDate: dueDate,
            client_id: client_email,
            completion: 0,
            useremail: email,
            probudget: budget,
        };
        AddingProject(newProject);
        
        // Add the new project to the newProjects state
        setNewProjects([...newProjects, newProject]);

        alert('Project has been added successfully');
        // setShowForm(false);
        setSelectedClient(null);
    };





    const handleClientSearchChange = (e) => {
        setClientSearch(e.target.value);
        if (selectedClient) {
            return;
        }
        if (e.target.value) {
            const searchResults = clients.filter(client =>
                client.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setClientResults(searchResults);
        } else {
            setClientResults([]);
        }
    };

    const handleAddClient = (client) => {
        setSelectedClient(client);
        setClientResults([]);
        setClientSearch('');
    };

    const handleRemoveClient = () => {
        setSelectedClient(null);
    };

    const handleFileChange = (e, type) => {
        console.log(e.target.files[0]);
        console.log(e.target.files);
        const newFiles = Array.from(e.target.files);
        if (type === 'attachment') {
            setSelectedAttachments(old => [...old, ...newFiles]);
        } else {
            setSelectedDocuments(old => [...old, ...newFiles]);
        }
    };

    const removeAttachment = (index) => {
        setSelectedAttachments(old => old.filter((_, i) => i !== index));
    };

    const removeDocument = (index) => {
        setSelectedDocuments(old => old.filter((_, i) => i !== index));
    };

    const getProgressClass = (percentage) => {
        if (percentage < 25) return 'low';
        if (percentage < 50) return 'medium';
        if (percentage < 75) return 'high';
        return 'very-high';
    };





    // validation function
    const validateProjectName = (name) => {
        if (!name.trim()) return 'Project name is required.';
        if (name.length < 4) return 'Project name must be at least 4 characters long.';

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

    const validateProjectDescription = (desc) => {
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

    const validateBudget = (budget) => {
        if (budget === '') return 'Budget is required.';
        if (isNaN(budget) || budget <= 0) return 'Please enter a valid budget amount.';
        if (budget < 5000) return `The budget must be at least ₹5000.`;
        if (budget > 10000000) return `The budget must be not more than ₹10000000.`;

        return '';
    };

    const validateStartDate = (date) => {
        const today = new Date().toISOString().split('T')[0];
        if (date < today) return 'Start date must be today or a future date.';
        return '';
    };

    const validateDueDate = (startDate, dueDate) => {
        if (dueDate <= startDate) return 'Due date must be greater than the start date.';
        return '';
    };


    return (

        <>

            <div className="projects-container">
    

                    <form onSubmit={handleFormSubmit}>

                        <div className="form-row">
                            <label htmlFor="projectName">Project Name:</label>
                            <input
                                className="in-txtarea"
                                type="text"
                                id="projectName"
                                name="projectName"
                                onChange={(e) => {
                                    // Validation function (replace with your own validation logic)
                                    const validationError = validateProjectName(e.target.value);

                                    // Update state with the input value and validation result
                                    setProjectName(e.target.value);
                                    setProjectNameError(validationError);
                                }}
                                value={projectname}
                                required
                            />
                            {projectNameError && <span className="error-message">{projectNameError}</span>}
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
                            <label htmlFor="projectDescription">Project Description:</label>
                            <textarea className="in-txtarea" id="projectDescription" name="projectDescription"
                                value={projectDec}
                                onChange={(e) => {
                                    setProjectDescriptionError(validateProjectDescription(e.target.value))
                                    setProjectDesc(e.target.value);
                                }}
                            />
                            {projectDescriptionError && <span className="error-message">{projectDescriptionError}</span>}
                        </div>
                        <div className="form-row">
                            <label htmlFor="budget">Budget:</label>
                            <input
                                className="in-txtarea"
                                type="number"
                                id="budget"
                                name="budget"
                                required
                                value={budget}
                                onChange={(e) => {
                                    setBudget(e.target.value);
                                    setBudgetError(validateBudget(e.target.value));
                                }}
                            />
                            {budgetError && <span className="error-message">{budgetError}</span>}
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

                        <div className="form-row">
                            <label htmlFor="document">Document:</label>
                            <input
                                className="in-txtarea"
                                type="file"
                                id="document"
                                name="document"
                                onChange={(e) => handleFileChange(e, 'document')}
                            />
                            <div>
                                {selectedDocuments.map((file, index) => (
                                    <div key={index} className="file-item">
                                        {file.name}
                                        <span className="remove-icon" onClick={() => removeDocument(index)}>×</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-row client-search-row">
                            <label htmlFor="Add client">Add Client:</label>
                            <input
                                className="in-txtarea"
                                type="text"
                                id="clientSearch"
                                value={clientSearch}
                                placeholder='Search Here...'
                                onChange={handleClientSearchChange}
                                // required={!selectedClient}
                                onFocus={() => {
                                    setClientResults(clients);  // Assuming 'clients' is the data you want to set
                                }}
                                disabled={!!selectedClient} // Disable when client is selected
                            />
                            <div className='clientlist'>

                                {clientSearch && clientResults.length === 0 && !selectedClient && (
                                    <div className="no-match-message">
                                        No matching clients found.
                                    </div>
                                )}
                                {clientResults.map(client => (
                                    <div key={client.email} className="client-result">
                                        <div>{client.name} ({client.email}</div>
                                        )
                                        <button className="add-form-btn" type="button" onClick={() => handleAddClient(client)}

                                        >Add</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {selectedClient && (
                            <div className="selected-client">
                                {selectedClient.name} ({selectedClient.email})
                                <button className="add-form-btn" type="button" onClick={handleRemoveClient}>Remove</button>
                            </div>
                        )}
                        <div className="form-row">
                            <button className="add-form-btn" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
     

        </>
    );

};

export default AddProject;