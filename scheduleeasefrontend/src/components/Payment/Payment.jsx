import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Payment.css';
// import { faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const PaymentCard = ({ project }) => {
  const [completion, setCompletion] = useState(0);
  const ProjectCompletion = async (projectNo) => {

    try {
      const ProjectDetails = { projectno: projectNo }
      const response = await axios.post('http://127.0.0.1:8000/api/projectcompletion/', ProjectDetails);
      // ye data request me jayega in views.py

      if (response.data['value']) {
        if (response.data.data.totaltask == 0) {
          setCompletion(0);
        }
        else {
          const percentage = response.data.data.taskdone / response.data.data.totaltask * 100
          setCompletion(Math.floor(percentage));
        }
      } else {
        console.log("error")
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  const [isClient, setIsClient] = useState(false);
  // useEffect(() => {
  //   if(JSON.parse(sessionStorage.getItem('loginData')).profile_data.role===3){
  //     setIsClient(true);

  //   }
  //   // const isclient=();
  // }, [])

  const [userrole, setUserRole] = useState(0);
  useEffect(() => {//this help in seting authentication to false when we relode
    try {
      setUserRole(JSON.parse(sessionStorage.getItem('loginData')).profile_data.role)
      console.log(JSON.parse(sessionStorage.getItem('loginData')).profile_data.role);

      setIsClient(userrole == 3);

    } catch (error) {
      console.log(error);
    }
    ProjectCompletion(project.project_id);
  }, []);
  const getProgressClass = (percentage) => {
    if (percentage < 25) return 'low';
    if (percentage < 50) return 'medium';
    if (percentage < 75) return 'high';
    return 'very-high';
};

  return (
    <div key={project.id} className="payment-card">
      <div className="payment-details">
        <div className="payment-detail-item">{project.project_name}</div>

        <div className="payment-detail-item">{project.budget}</div>

        <div className="payment-detail-item">
          
            <div className="progress-container">
              <div
                className={`progress-filler ${getProgressClass(completion)}`}
                style={{ width: `${completion}%` }}
              >
                <span className="progress-label">{`${completion}%`}</span>
              </div>
            </div>

          
        </div>
        <div className="payment-detail-item paybuttonbox">
          {project.payment_info ? (
            <div className='paidinfo'>
              <div className='paid-text'>Paid</div>
              <div className='paid-date'>{project.paymentdate}
                {/* <br/>{new Date(project.date_time).toLocaleDateString()} */}
              </div>
            </div>
          ) : (
            userrole == 3 ? (
              <>
                <button className={`paybutton`}>
                  Pay Now
                </button>
              </>
            ) : (
              <div className='paidinfo'>
                <div className='paid-text'>Not Paid</div>

              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

// export default PaymentCard;





const Payment = () => {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    PaymentDetails()
  }, [])
  const PaymentDetails = async () => {
    try {
      const paymentDetails = {
        username: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, role: JSON.parse(sessionStorage.getItem('loginData')).profile_data.role
      }
      const response = await axios.post('http://127.0.0.1:8000/api/viewpayment/', paymentDetails);

      if (response.data.value) {
        console.log("payments", response.data);

        setPayments(response.data.data);
        console.log(payments);

      }
    } catch (error) {
      console.error(error);
    }

  };


  // Assuming 'payments' is an array


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
        {payments && payments.map((project1) => (
          <PaymentCard project={project1} />
        ))}
      </div>
    </div>
  );
};

export default Payment;
