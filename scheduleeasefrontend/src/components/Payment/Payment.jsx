import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Payment.css'; 

const Payment = () => {

    // Assuming 'payments' is an array
    const [payments, setPayments] = useState([
        // Sample data, replace it with your actual data
        { id: 1, name: 'Project 1', paymentdate: '2024-01-11', completion: 50 , amount: 200000},
        { id: 2, name: 'Project 2', paymentdate: '2024-01-12', completion: 75 , amount: 200000},
        // ... add more project objects as needed
    ]);


    // Function to get progress class based on completion percentage
    const getProgressClass = (completion) => {
        // Implement your logic to determine the appropriate class based on completion
        // For example, you might return 'low', 'medium', 'high' based on different ranges
        return completion < 30 ? 'low' : completion < 70 ? 'medium' : 'high';
    };

    return (
        <div>
            <div className="payment-header">
                <div className="payment-header-item">Project Name</div>
                <div className="payment-header-item">Payment Date</div>
                <div className="payment-header-item">Payment Amount</div>

                <div className="payment-header-item">Progress</div>
            </div>
            
            {/* Use map to iterate over 'payments' array */}
            {payments.map((project) => (
                <div key={project.id} className="payment-card" >
                    <div className="payment-details">
                        <div className="payment-detail-item">{project.name}</div>
                        <div className="payment-detail-item">{project.paymentdate}</div>
                        <div className="payment-detail-item">{project.amount}</div>

                        <div className="payment-detail-item">
                            <div className="project-progress-container">
                                <div
                                    className={`payment-progress-filler ${getProgressClass(project.completion)}`}
                                    style={{ width: `${project.completion}%` }}>
                                    <span className="payment-progress-label">{`${project.completion}%`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Payment;
