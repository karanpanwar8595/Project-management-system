import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Payment.css'; 





const PaymentCard = ({ project }) => {
    const getProgressClass = (completion) => {
        // Implement your logic to determine the appropriate class based on completion
        // For example, you might return 'low', 'medium', 'high' based on different ranges
        return completion < 30 ? 'low' : completion < 70 ? 'medium' : 'high';
    };

  return (
    <div key={project.id} className="payment-card">
      <div className="payment-details">
        <div className="payment-detail-item">{project.name}</div>
        
        <div className="payment-detail-item">{project.amount}</div>

        <div className="payment-detail-item">
          <div className="project-progress-container">
            <div
              className={`payment-progress-filler ${getProgressClass(project.completion)}`}
              style={{ width: `${project.completion}%` }}
            >
              <span className="payment-progress-label">{`${project.completion}%`}</span>
            </div>

          </div>
        </div>
        <div className="payment-detail-item paybuttonbox">

        {project.paymentdone ? (
  <div className='paidinfo'>
    <div className='paid-text'>Paid</div>
    <div className='paid-date'>{project.paymentdate}</div>
  </div>
) : (
  <button className={`paybutton`} >
    Pay Now
  </button>
)}
      </div>

      </div>
    </div>
  );
};

// export default PaymentCard;





const Payment = () => {

    // Assuming 'payments' is an array
    const [payments, setPayments] = useState([
        // Sample data, replace it with your actual data
        { id: 1, name: 'Project 1', paymentdone:true,paymentdate: '2024-01-11', completion: 50 , amount: 200000},
        { id: 2, name: 'Project 2',paymentdone:false, paymentdate: 'NOT DONE', completion: 75 , amount: 200000},
       
        

        // ... add more project objects as needed
    ]);


    // Function to get progress class based on completion percentage


    return (
        <div className=" paymentlist">
            <div className="payment-header">
                <div className="payment-header-item">Project Name</div>
                
                <div className="payment-header-item">Payment Amount</div>

                <div className="payment-header-item">Progress</div>
  
                <div className="payment-header-item " style={{ textAlign: "end", paddingRight: "10px" }}

>Payment Date</div>
            </div>
            <div className='payment-card-list'>

            {/* Use map to iterate over 'payments' array */}
            {payments.map((project1) => (
                <PaymentCard  project={project1}/>
                
                ))}
                </div>
        </div>
    );
};

export default Payment;
