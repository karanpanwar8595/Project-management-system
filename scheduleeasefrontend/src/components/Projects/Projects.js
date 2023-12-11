import React from 'react'
import './Projects.css'

const Projects = () => {
    const ongoingProjects = [
        { id: 1, name: 'InnovateHub', dueDate: '2024-08-18' },
        { id: 2, name: 'TechMinds Initiative', dueDate: '2024-05-12' },
        { id: 3, name: 'GreenScape Solutions', dueDate: '2025-01-28' },
        { id: 4, name: 'DataCrafters Project', dueDate: '2024-12-20' },
    ];

    const assignedProjects = [
        { id: 1, name: 'SmartCity Blueprint', dueDate: '2023-12-18', man: 'Alex Reynolds' },
        { id: 2, name: 'Zoho Projects', dueDate: '2021-01-12', man: 'Sarah Mitchell' },
        { id: 3, name: 'Project BlueSky', dueDate: '2021-01-28', man: 'Dakshay Sharma' },
        { id: 4, name: 'RenewaTech Ventures', dueDate: '2023-12-18', man: 'Nathan Walter' },
    ];

    return (
        <div className="projects-container">
            <h3 style={{ textAlign: 'left' }}>Managed by me</h3>
            <div className="project-header">
                <div className="header-item">Project Name</div>
                <div className="header-item">Due Date</div>
                <div className="header-item">Add Team Member</div>
            </div>
            {ongoingProjects.map((project) => (
                <div key={project.id} className="project-card">
                    <div className="project-details">
                        <div className="detail-item">{project.name}</div>
                        <div className="detail-item">{project.dueDate}</div>
                        <div className="detail-item">
                            <a href={`/add-team/${project.id}`} className="add-team-link">
                                Add
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            <h3 style={{ textAlign: 'left' }}>Assigned to me</h3>
            <div className="project-header">
                <div className="header-item">Project Name</div>
                <div className="header-item">Due Date</div>
                <div className="header-item">Project Manager</div>
            </div>
            {assignedProjects.map((project) => (
                <div key={project.id} className="project-card">
                    <div className="project-details">
                        <div className="detail-item">{project.name}</div>
                        <div className="detail-item">{project.dueDate}</div>
                        <div className="detail-item">{project.man}</div>
                    </div>
                </div>
            ))}
            <button className="add-project-button">Add New Project</button>
        </div>
    );
};

export default Projects;
