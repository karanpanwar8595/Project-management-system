import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import plus from './plus.png'
import './ViewCompany.css'


const CompanyList = ({  }) => {


    const CompanyDetails = [
        {
          id: 1,
          name: 'Innovate Inc.',
          gstnumber: 'GST546548324545',
          address: '123 Main Street, Cityville',
          phonenumber: '9585685455',
        },
        {
          id: 2,
          name: 'Westor',
          gstnumber: 'GST987654321223',
          address: '456 Oak Avenue, Townsville',
          phonenumber: '9876543210',
        },
        // Add more sample company details as needed
      ];

  return (
    <div className='companydetailss-container'>
      <h3 style={{ textAlign: 'left', fontFamily: 'Calibri light' }}>Company</h3>
      <div className="companydetails-header">
        <div className="header-item">Company Name</div>
        <div className="header-item">Gst Number</div>
        <div className="header-item">Address</div>
        <div className="header-item">Phone Number</div>
        <div className="header-item"></div>
      </div>
      {CompanyDetails.map((companydetails) => (
        <div key={companydetails.gstnumber} className="companydetails-card">
          <div className="companydetails-details">
            <div className="detail-item">{companydetails.name}</div>
            <div className="detail-item">{companydetails.gstnumber}</div>
            <div className="detail-item">{companydetails.address}</div>
            <div className="detail-item">{companydetails.phonenumber}</div>
            <div className="detail-item">
            <Link to='/editcompany'
            state={{companydetails}}
            style={{ textDecoration: 'none', color: 'black' }}
            >
            <div className={`CompanyEditbutton`}  >
              Edit
            </div>
            </Link>
            
            </div>
          </div>
        </div>
      ))}

      <Link to='/AddCompany'>
                    <img src={plus} className='plus-symbol' alt='not found'  />

                    </Link>


    </div>
  );
};

export default CompanyList;
