import React, { useState ,useEffect} from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import plus from './plus.png'
import './ViewCompany.css'
import axios from 'axios';


const CompanyList = ({  }) => {
useEffect(() => {
AllCompany();
}, [])

    const [CompanyDetails,setCompanyDetails] =useState( [
        {
          id: 1,
          name: 'Wipro Technologies limited',
          gstnumber: '32AAHCR7467M1Z5',
          address: '35 Main Street, Cityville, Delhi',
          phonenumber: '9585685455',
        },
        {
          id: 2,
          name: 'Tech Mahindra',
          gstnumber: '24AECZQ7019A9Z1',
          address: '96 Oak Avenue, Townsville',
          phonenumber: '9876543210',
        },
        {
          id: 3,
          name: 'RUV Corporation',
          gstnumber: '22BNORQ0012D0Z2',
          address: '55 Maple Street, Riverdale',
          phonenumber: '9023126728',
        },
        // Add more sample company details as needed
      ]);
      const AllCompany = () => {
        axios.post('http://127.0.0.1:8000/api/allcompanydata/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
            if (response.data.value) {
                console.log(response.data);
                setCompanyDetails(response.data.data);
            }
        }, (error) => {
            console.log(error);
        });
    };
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
            <div className="detail-item">{companydetails.gst_no}</div>
            <div className="detail-item">{companydetails.address}</div>
            <div className="detail-item">{companydetails.phone}</div>
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
