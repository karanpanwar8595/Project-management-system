import React, { useEffect, useState } from "react";
import './BlockUser.css'
import profilepic from './profile.png'
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';
import axios from 'axios';




const UserCard = ({ user,picture }) => {
    const [Status, setStatus] = useState(1)
    useEffect(() => {
    if (user.role ===0){
        setRole("Admin")
    }else if (user.role ===1){
        setRole("Manger")
    }else if (user.role ===2){
        setRole("Team Member")
    }else if (user.role ===3){
        setRole("Client")
    }
    setStatus(user.user_status);
    }, [])

    const handleBlockUser = (userId,name,userstatus) => {
        axios.post('http://127.0.0.1:8000/api/blockuser/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ,email:userId,userstatus:userstatus}).then((response) => {
            if (response.data.value) {
                if (userstatus){
                    alert("You Have UnBlock "+name );
                    setStatus(0);
                }
                else{
                    alert("You Have Block "+name );
                    setStatus(1);
                }
            }
        }, (error) => {
            console.log(error);
        });
    };



    const [Role, setRole] = useState("");
    return (
        
        <div key={user.email} className={`user-card ${Status ? '' : 'blocked'}`}>
            <div className="userprofilepic"><img src={picture} alt="" /></div>
            <div className="userdetails">
                <div className="namedesg">

                    <span className="username">{user.name}</span>
                    <div className="designation">{Role}</div>
                </div>
                <p className="useremail">{user.email}</p>
            </div>
            <button className={`blockuserbutton ${Status ? 'block' : 'unblock'}`} onClick={() => handleBlockUser(user.email,user.name,Status)}>
                {Status ? 'Block' : 'Unblock'}
            </button>
        </div>
        
    );
};

const BlockUser = () => {
    useEffect(() => {
        AllUsers();
        console.log()
    }, [])
  const profilepic = [ pic2,pic1, pic3, pic4, pic6];

    const [users,setUsers] = useState(null);
    const AllUsers = () => {
        axios.post('http://127.0.0.1:8000/api/allusers/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
            if (response.data.value) {
                console.log(response.data);
                setUsers(response.data.data);
                // setIsComplete(true)
            }
        }, (error) => {
            console.log(error);
        });
    };

    return (
        <div className="block-user-container">

        <h2 style={{paddingLeft:"30px"}}>Users</h2>

            {users && users.map((user, index) => (
                <UserCard user={user} 
                picture={profilepic[index % profilepic.length]}
                
                
                
                
                />
            ))}
        </div>
    );
};

export default BlockUser;

