import React from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {

    const notifications = [
        // { id: 1, message: "'GreenTech Revamp' project phase 1 must be completed by 2024-09-05. Please ensure all related tasks are on track." },
        { "id": 2, "message": "Payment Reminder: The remaining payment for the 'Health Care' project is due." }
        // { id: 3, message: "Alex Reynolds has completed the 'Market Analysis' task for the 'InnovateHub' project. " },
        // { id: 4, message: "'Customer entity front-end design' for the 'Health Care' project was completed ahead of schedule." },
        // { id: 5, message: "'Validation in Edit form' must be completed by 2024-02-05." },
    ];

    return (
        <div className="notification-container">
            <h1 className='header'>Notifications</h1>
            {notifications.map(notification => (
                <div key={notification.id} className="notification">
                    <FontAwesomeIcon icon={faBell} />
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

export default Notification;
