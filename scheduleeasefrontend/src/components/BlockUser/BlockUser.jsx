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
        { id: 1, name: 'John Doe', designation: 'Team member', mail_id: 'john.doe@example.com', blocked: false },
        { id: 2, name: 'Jane Smith', designation: 'Client', mail_id: 'jane.smith@example.com', blocked: true },
        { id: 3, name: 'Bob Johnson', designation: 'Manager', mail_id: 'bob.johnson@example.com', blocked: false },
        // Add more users as needed
    ];


    return (
        <div className="block-user-container">


            {users.map((user) => (
                <UserCard user={user} />
            ))}
        </div>
    );
};

export default BlockUser;

