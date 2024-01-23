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
    const project = location.state.projects;
    console.log(13,project)  ;
    const isTeamMember=location.state.isTeamMember;
 
    const attachments= ['/project-plan.pdf'];
    const documents= ['/Aadhar.jpg', '/4th sem result.pdf'];

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
                {isTeamMember ? (
                    <>
                        <button className="edit-button">
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                </button>
               
                  </>

                ) : (<>
                </>
                    
               
                )}
                
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
            {isTeamMember ? (
                    <>
                        <div className="section">
                <div className="section-title">Company Details</div>
                <div className="section-content">
                    <div className="start">
                        <div className="company-name">Company Name</div>
                        <div className="client-name">{project.client.gst_no.name}</div>
                    </div>
                    <div className="start">
                        <div className="client-name">Client Name</div>
                        <div className="client-name">{project.client.name}</div>
                    </div>
                </div>
            </div>
            <div className="budget">Budget  {project.budget}</div>
               
                  </>

                ) : (<>
                </>
                    
               
                )}

            
            <div className="section">
                <div className="section-title">Attachments</div>
                <div className="attachments">
                    {attachments.map((attachment, index) => (
                        <a key={index} href={attachment} onClick={() => handleDocumentClick(attachment)} target="_blank" rel="noopener noreferrer">{attachment}</a>
                    ))}
                </div>
            </div>
            <div className="section">
                <div className="section-title">Documents</div>
                <div className="documents">
                    {documents.map((document, index) => (
                        <a key={index} href={document} onClick={() => handleDocumentClick(document)} target="_blank" rel="noopener noreferrer">{document}</a>
                    ))}
                </div>
            </div>

            
             
            
        </div>
    );
};

export default ProjectDetails