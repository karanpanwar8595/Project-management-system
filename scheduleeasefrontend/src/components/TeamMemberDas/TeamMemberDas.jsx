// Dashboard.jsx
import React from 'react';
import TeamCalendar from './TeamCalendar';
import './TeamMemberDas.css';

const TeamMemberDas = () => {
  // Updated sample task data
  const tasks = [
    { id: 1, name: 'email', title: 'Task Title 1', dueDate: '2024-02-01', status: true },
    { id: 2, name: 'form', title: 'Task Title 2', dueDate: '2024-02-15', status: false },
    { id: 3, name: 'class', title: 'Task Title 3', dueDate: '2024-02-01', status: true },
    { id: 4, name: 'test', title: 'Task Title 4', dueDate: '2024-02-15', status: false },
    { id: 5, name: 'work', title: 'Task Title 5', dueDate: '2024-02-01', status: true },
    { id: 6, name: 'abc', title: 'Task Title 6', dueDate: '2024-02-15', status: false },
    // Add more tasks as needed
  ];

    // Sample project data
  const projectSnapshot = {
    progress: 75,
    upcomingMilestone: 'Milestone Name',
    projectDeadline: '2-05-2024',
  };

  const progressStyle = {
    width: `${projectSnapshot.progress}%`,
  };
  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="das-task-section">
          <h3>Tasks Overview</h3>
          <ul className="das-task-list">
            {/* Header row */}
            <li className="das-task-item header">
              <span className="das-task-name">Task ID</span>
              <span className="das-task-title">Task Name</span>
              <span className="due-date">Due Date</span>
              <span className="das-task-status">Task Status</span>
            </li>

            {/* Task items */}
            {tasks.map((task) => (
              <li key={task.id} className="das-task-item">
                <span className="das-task-title">{task.id}</span>
                <span className="das-task-title">{task.name}</span>
                <span className="due-date">{task.dueDate}</span>
                <span className={`das-task-status ${task.status ? 'completed' : 'not-completed'}`}>
                  {task.status ? 'Completed' : 'Not Completed'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="side-column">
          <TeamCalendar />
        </div>
      </div>

      <div className="project-snapshot-section">
        <h3>Project Snapshot</h3>
         <p>
           Project Progress: {projectSnapshot.progress}%
           <div className="progress-bar-container">
             <div className="progress-bar" style={progressStyle}></div>
           </div>
        </p>
         {/* <p>Upcoming Milestone: {projectSnapshot.upcomingMilestone}</p> */}
         <p>Deadline: {projectSnapshot.projectDeadline}</p>
       </div>


    </div>
  );
};

export default TeamMemberDas;







