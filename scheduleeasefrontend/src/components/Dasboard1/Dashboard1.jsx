import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import ManagerDasboard from '../Dashboard/Dashboard'
import DasNewComp from '../DasNewComp/DasNewComp'
const Dashboard1 = () => {
    const role=JSON.parse(sessionStorage.getItem('loginData')).profile_data.role

if (role===0){
    return (
        <div className="main-dashboard-container">
            <DasNewComp></DasNewComp>
        </div>
    );
}else if (role===1)
{
    return (
        <div className="main-dashboard-container">
            <ManagerDasboard></ManagerDasboard>
        </div>
    );
}else if (role==2){
    return (
        <div className="dashboard-container">
            
        </div>
    );
}else if (role==3){
    return (
        <div className="dashboard-container">
            
        </div>
    );
}

}

export default Dashboard1;



