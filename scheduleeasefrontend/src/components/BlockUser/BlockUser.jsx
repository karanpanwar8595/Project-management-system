import React, { useState } from "react";
import './BlockUser.css'
import profilepic from './profile.png'
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';



const UserCard = ({ user,picture }) => {
    const handleBlockUser = (userId) => {
        // Implement logic to block/unblock user based on the userId
        console.log(`Block/Unblock user with ID ${userId}`);
    };


    return (
        
        <div key={user.id} className={`user-card ${user.blocked ? 'blocked' : ''}`}>
            <div className="userprofilepic"><img src={picture} alt="" /></div>
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
  const profilepic = [ pic2,pic1, pic3, pic4, pic6];

    const users = [
        { id: 1, name: 'Pravatik Pandaya', designation: 'Manager', mail_id: 'pravatik@gmail.com', blocked: false },
        { id: 2, name: 'Vikas Jaiswal', designation: 'Team Member', mail_id: 'vikas@gmail.com', blocked: false },
        { id: 3, name: 'Sunil Srivastava', designation: 'Team Member', mail_id: 'sunil@gmail.com', blocked: false },
        { id: 4, name: 'Amit Gupta', designation: 'Team Member', mail_id: 'amit@gmail.com', blocked: false },
        { id: 5, name: 'Akash Jaiswal', designation: 'Client', mail_id: 'akash@gmail.com', blocked: false },

        // Add more users as needed
    ];


    return (
        <div className="block-user-container">

        <h2 style={{paddingLeft:"30px"}}>Users</h2>

            {users.map((user, index) => (
                <UserCard user={user} 
                picture={profilepic[index % profilepic.length]}
                
                
                
                
                />
            ))}
        </div>
    );
};

export default BlockUser;

