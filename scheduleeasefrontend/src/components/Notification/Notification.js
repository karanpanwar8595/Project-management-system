import React from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {

    const notifications = [
        { id: 1, message: "'Health Care' project phase 1 must be completed by 2024-09-20. Please ensure all related tasks are on track." },
        { id: 2, message: "Received a payment of 67000 from 'EcoSolutions Ltd.' for the 'Urban Renewal' project." },
        { id: 3, message: "Sunil Srivastava has completed the 'Customer entity front-end design' task for the 'Sign Companion' project. " },
        { id: 4, message: "'Validation in edit form' task of 'Event manage app' must be completed by 2024-2-25." },
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
