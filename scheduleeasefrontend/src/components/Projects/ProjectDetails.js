import React from 'react';
import './ProjectDetails.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ProjectDetails = () => {

    const location = useLocation();
    // const project1 = JSON.stringify(location.state.project1);
    // const project = JSON.parse(project1).project
    const project = location.state.project
    console.log(project)

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
            {/* <div className="back-arrow" onClick={onClose}>&larr;</div> */}
            <div className="project-header-container">
                <h2 className="proj-header">{project.name}</h2>
                <button className="edit-button">
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                </button>
            </div>
            <p className="project-description">{project.projectDescription}</p>
            <span style={{ fontSize: '25px' }}> Progress </span>
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
        </div>
    );
};

export default ProjectDetails

