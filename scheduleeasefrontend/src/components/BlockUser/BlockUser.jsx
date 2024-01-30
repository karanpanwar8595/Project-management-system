import React, { useState } from "react";
import './BlockUser.css'
import profilepic from './profile.png'



const UserCard = ({ user }) => {
    const handleBlockUser = (userId) => {
        // Implement logic to block/unblock user based on the userId
        console.log(`Block/Unblock user with ID ${userId}`);
    };


    return (
        
        <div key={user.id} className={`user-card ${user.blocked ? 'blocked' : ''}`}>
            <div className="userprofilepic"><img src={profilepic} alt="" /></div>
            <div className="userdetails">
                <div className="namedesg">

                    <span className="username">{user.name}</span>
                    <div className="designation">{user.designation}</div>
                </div>
                <p className="useremail">{user.mail_id}</p>
            </div>
            <button className={`blockuserbutton ${user.blocked ? 'unblock' : 'block'}`} onClick={() => handleBlockUser(user.id)}>
                {user.blocked ? 'Unblock' : 'Block'}
            </button>
        </div>
        
    );
};

const BlockUser = () => {
    const users = [
        { id: 1, name: 'Bhavesh singh', designation: 'Manager', mail_id: 'bhaveshkumar@gmail.com', blocked: false },
        { id: 2, name: 'Arjun Jaiswal', designation: 'Admin', mail_id: 'arjun@gmail.com', blocked: true },
        { id: 3, name: 'Rajan Sharma', designation: 'Team Member', mail_id: 'rajan@gmail.com', blocked: false },
        // Add more users as needed
    ];


    return (
        <div className="block-user-container">

        <h2 style={{paddingLeft:"30px"}}>Users</h2>

            {users.map((user) => (
                <UserCard user={user} />
            ))}
        </div>
    );
};

export default BlockUser;

