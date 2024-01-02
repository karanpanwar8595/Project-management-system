import React from 'react';
import './Notification.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Notification = () => {

    const notifications = [
        { id: 1, message: "'GreenTech Revamp' project phase 1 must be completed by 2024-09-05. Please ensure all related tasks are on track." },
        { id: 2, message: "Received a payment of $5,000 from 'EcoSolutions Ltd.' for the 'Urban Renewal' project." },
        { id: 3, message: "Alex Reynolds has completed the 'Market Analysis' task for the 'InnovateHub' project. " },
        { id: 4, message: "'User Interface Overhaul' for the 'Retail E-commerce' project was completed ahead of schedule." },
        { id: 5, message: "'Project Bluesky' must be completed by 2024-09-05." },
    ];

    return (
        <div className="notification-container">
            <h2 className='header'>Notifications</h2>
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