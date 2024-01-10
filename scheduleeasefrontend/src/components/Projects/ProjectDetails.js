import React from 'react';
import './ProjectDetails.css';

const ProjectDetails = ({ project, onClose, progressBar }) => {

    const handleDocumentClick = (path) => {
        window.open(path, '_blank');
    };

    if (!project) return null;

    return (
        <div className="project-details-container">
            <div className="back-arrow" onClick={onClose}>&larr;</div>
            <h2>{project.name}</h2>
            <p className="project-description">{project.projectDescription}</p>
            <div className="progress-cont">
                <div
                    className={`progress-filler ${progressBar(project.completion)}`}
                    style={{ width: `${project.completion}%` }}>
                    <span className="progress-label">{`${project.completion}%`}</span>
                </div>
            </div>
            <div className="dates">StartDate - {project.startDate}</div>
            <div className="dates">DueDate - {project.dueDate}</div>
            <div className="budget">Budget: {project.budget}</div>
            <div className="attachments">
                Attachments: {project.attachments.map((attachment, index) => (
                    <a key={index} href={attachment} onClick={() => handleDocumentClick(attachment)} target="_blank" rel="noopener noreferrer">{attachment}</a>
                ))}
            </div>
            <div className="documents">
                Documents: {project.documents.map((document, index) => (
                    <a key={index} href={document} onClick={() => handleDocumentClick(document)} target="_blank" rel="noopener noreferrer">{document}</a>
                ))}
            </div>
            <div className="company-name">Company: {project.companyName}</div>
            <div className="client-name">Client: {project.clientName}</div>
        </div>
    );
};

export default ProjectDetails