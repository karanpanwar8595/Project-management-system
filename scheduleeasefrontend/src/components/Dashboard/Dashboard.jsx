import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ManagerCalendar from './ManagerCalendar';
import Graph from './Graph';

const Dashboard = () => {
    const projectSnapshot = {
        progress: 42,
        upcomingMilestone: 'Milestone Name',
        projectDeadline: '2-05-2024',
      };
    
      const progressStyle = {
        width: `${projectSnapshot.progress}%`,
      };
    return (
        <div className="dashboard-container">
            <div className="box card-box">
                <Link to='/notification' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="button-style icon-box bg-color-1">
                        <div className="icon first">
                            <FontAwesomeIcon icon={faBell} />
                        </div>
                        <div className="content">
                            <h3 className="title-box">Notification</h3>
                        </div>
                    </div>
                </Link>
                <Link to='/disscussion' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="button-style icon-box bg-color-2">
                        <div className="icon second">
                            <FontAwesomeIcon icon={faCommentDots} />
                        </div>
                        <div className="content">
                            <h3 className="title-box">Message</h3>
                        </div>
                    </div>
                </Link>
                <Link to='/calendar' style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="button-style icon-box bg-color-3">
                        <div className="icon third">
                            <FontAwesomeIcon icon={faCalendar} />
                        </div>
                        <div className="content">
                            <h3 className="title-box">Calendar</h3>
                        </div>
                    </div>
                </Link>
                <div className="button-style icon-box bg-color-4" >
                    <div className="icon forth" >
                        <p style={{ fontSize: 30, fontWeight: 900, color: 'red', marginTop: '22px' }}>+</p>
                    </div>
                    <div className="content1">
                        <p className="title-box1">Create New</p>
                        <p className="title-box1">Project</p>
                    </div>
                </div>
            </div>
            <div className="project-snapshot-section">
        <div style={{marginTop:"10px"}}>Mobile App</div>
         <p>
          
           <div className="progress-bar-container">
             <div className="progress-bar" style={progressStyle} ></div>
           </div>
        </p>
         {/* <p>Upcoming Milestone: {projectSnapshot.upcomingMilestone}</p> */}
         <p>Deadline: {projectSnapshot.projectDeadline}</p>
       </div>
            <div className='bottom-two'>
            <div className='right-das'>
                <div className='graphbox'>


                <Graph/>
                </div>

                </div>
                <div className='left-das'>
                <ManagerCalendar/>

                </div>
                

            </div>
      
        </div>
    );
}

export default Dashboard;



