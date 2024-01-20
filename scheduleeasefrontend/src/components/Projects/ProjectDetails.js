import React from 'react';
import './ProjectDetails.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'

const ProjectDetails = () => {

    const location = useLocation();
    // const project1 = JSON.stringify(location.state.project1);
    // const project = JSON.parse(project1).project
    const project = location.state.project
    console.log(project)

    //----------------------------Edit form--------------------------------------------------

    const clients = [
        { name: 'Mitul Pipaliya', email: 'pipaliya14@gmail.com' },
        { name: 'Ujjwal Bhansali', email: 'ujjwalbhansali10@gmail.com' },
        { name: 'Karan Panwar', email: 'karanp@gmail.com' },
        { name: 'Malhar Prajapati', email: 'malhar2160@gmail.com' },
        { name: 'Sushil Kumar', email: 'sushil1512@gmail.com' },
    ];

    //--------------------------------------------------------------------------------------

    const [showForm, setShowForm] = useState(false);

    // Form Project start date and due date
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    // Form Client searching and adding
    const [clientSearch, setClientSearch] = useState('');
    const [selectedClient, setSelectedClient] = useState(null);
    const [clientResults, setClientResults] = useState([]);

    // Multiple attachment and document
    const [selectedAttachments, setSelectedAttachments] = useState([]);
    const [selectedDocuments, setSelectedDocuments] = useState([]);

    // validation in form
    const [projectNameError, setProjectNameError] = useState('');
    const [budgetError, setBudgetError] = useState('');
    // const [companyNameError, setCompanyNameError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [dueDateError, setDueDateError] = useState('');

    //-------------------------------------------------------------------------

    const toggleForm = () => {
        setShowForm(!showForm);
        if (showForm) {
            // Reset selected client when closing the form
            setSelectedClient(null);
        }
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

    // validation function
    const validateProjectName = (name) => {
        if (!name.trim()) return 'Project name is required.';
        if (name.length < 4) return 'Project name must be at least 4 characters long.';
        return '';
    };

    const validateBudget = (budget) => {
        if (budget === '') return 'Budget is required.';
        if (isNaN(budget) || budget <= 0) return 'Please enter a valid budget amount.';
        return '';
    };

    // const validateCompanyName = (name) => {
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
        const projectName = event.target.projectName.value;
        const budget = event.target.budget.value;
        // const companyName = event.target.companyName.value;

        const projectNameError = validateProjectName(projectName);
        const budgetError = validateBudget(budget);
        // const companyNameError = validateCompanyName(companyName);
        const startDateError = validateStartDate(startDate);
        const dueDateError = validateDueDate(startDate, dueDate);

        if (projectNameError || budgetError || startDateError || dueDateError) {
            setProjectNameError(projectNameError);
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

        alert('Project has been added successfully');
        setShowForm(false);
        setSelectedClient(null);
    };

    //--------------------------------------------------------------------------------------------

    const handleDocumentClick = (path) => {
        window.open(path, '_blank');
    };

    const getProgressClass = (percentage) => {
        if (percentage < 25) return 'low';
        if (percentage < 50) return 'medium';
        if (percentage < 75) return 'high';
        return 'very-high';
    };

    if (!project) return null;

    return (
        <div className="project-details-container">
            <div className="project-header-container">
                <h2 className="proj-header">{project.name}</h2>
                <button className="edit-button" onClick={toggleForm}>
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                </button>
            </div>
            <p className="project-description">{project.projectDescription}</p>
            <span style={{ fontSize: '20px' }}> Progress </span>
            <div className="progress-cont">
                <div
                    className={`progress-filler ${getProgressClass(project.completion)}`}
                    style={{ width: `${project.completion}%` }}>
                    <span className="progress-label">{`${project.completion}%`}</span>
                </div>
            </div>
            <div className="section">
                <div className="section-title">Project Timeline</div>
                <div className="section-content">
                    <div className="start">
                        <div className="dates">Starting Date</div>
                        <div className="dates">{project.startDate}</div>
                    </div>
                    <div className="start">
                        <div className="dates">Deadline</div>
                        <div className="dates">{project.dueDate}</div>
                    </div>
                </div>
            </div>
            <div className="section">
                <div className="section-title">Company Details</div>
                <div className="section-content">
                    <div className="start">
                        <div className="company-name">Company Name</div>
                        <div className="client-name">{project.companyName}</div>
                    </div>
                    <div className="start">
                        <div className="client-name">Client Name</div>
                        <div className="client-name">{project.clientName}</div>
                    </div>
                </div>
            </div>
            <div className="budget">Budget  {project.budget}</div>
            <div className="section">
                <div className="section-title">Attachments</div>
                <div className="attachments">
                    {project.attachments.map((attachment, index) => (
                        <a key={index} href={attachment} onClick={() => handleDocumentClick(attachment)} target="_blank" rel="noopener noreferrer">{attachment}</a>
                    ))}
                </div>
            </div>
            <div className="section">
                <div className="section-title">Documents</div>
                <div className="documents">
                    {project.documents.map((document, index) => (
                        <a key={index} href={document} onClick={() => handleDocumentClick(document)} target="_blank" rel="noopener noreferrer">{document}</a>
                    ))}
                </div>
            </div>

            {/* ------------------------------------Edit button------------------------------------ */}
            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="form-header">
                            <span onClick={toggleForm}>Close</span>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-row">
                                <label htmlFor="projectName">Project Name:</label>
                                <input
                                    className="in-txtarea"
                                    type="text" id="projectName"
                                    name="projectName"
                                    onChange={(e) => setProjectNameError(validateProjectName(e.target.value))}
                                    value={project.name}
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
                                    value={project.startDate}
                                    onChange={(e) => {
                                        setStartDateError(validateStartDate(e.target.value));
                                        setStartDate(e.target.value);
                                    }}
                                    required
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
                                    value={project.dueDate}
                                    onChange={(e) => {
                                        setDueDateError(validateDueDate(startDate, e.target.value));
                                        setDueDate(e.target.value);
                                    }}
                                    required
                                />
                                {dueDateError && <span className="error-message">{dueDateError}</span>}
                            </div>
                            <div className="form-row">
                                <label htmlFor="projectDescription">Project Description:</label>
                                <textarea className="in-txtarea" id="projectDescription" name="projectDescription" value={project.projectDescription} />
                            </div>
                            <div className="form-row">
                                <label htmlFor="budget">Budget:</label>
                                <input
                                    className="in-txtarea"
                                    type="number"
                                    id="budget" name="budget"
                                    value={project.budget}
                                    onChange={(e) => setBudgetError(validateBudget(e.target.value))}
                                    required
                                />
                                {budgetError && <span className="error-message">{budgetError}</span>}
                            </div>
                            {/* <div className="form-row">
                                <label htmlFor="companyName">Company Name:</label>
                                <input
                                    className="in-txtarea"
                                    type="text"
                                    id="companyName" name="companyName"
                                    value={project.companyName}
                                    onChange={(e) => setCompanyNameError(validateCompanyName(e.target.value))}
                                    required
                                    disabled 
                                />
                                {companyNameError && <span className="error-message">{companyNameError}</span>}
                            </div> */}
                            <div className="form-row">
                                <label htmlFor="attachment">Attachment:</label>
                                <input
                                    className="in-txtarea"
                                    type="file"
                                    id="attachment"
                                    name="attachment"
                                    // value={project.attachments}
                                    onChange={(e) => handleFileChange(e, 'attachment')}
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
                                    value={project.clientName}
                                    placeholder='Search Here...'
                                    onChange={handleClientSearchChange}
                                    required={!selectedClient}
                                    disabled
                                    // disabled={!!selectedClient} 
                                    // Disabled when client is selected
                                />
                                {clientSearch && clientResults.length === 0 && !selectedClient && (
                                    <div className="no-match-message">
                                        No matching clients found.
                                    </div>
                                )}
                                {clientResults.map(client => (
                                    <div key={client.email} className="client-result">
                                        {client.name} ({client.email})
                                        <button className="add-form-btn" type="button" onClick={() => handleAddClient(client)}>Add</button>
                                    </div>
                                ))}
                            </div>
                            {selectedClient && (
                                <div className="selected-client">
                                    {selectedClient.name} ({selectedClient.email})
                                    <button className="add-form-btn" type="button" onClick={handleRemoveClient}>Remove</button>
                                </div>
                            )}
                            <div className="form-row">
                                <button className="add-form-btn" type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }
        </div>
    );
};

export default ProjectDetails