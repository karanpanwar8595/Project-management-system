import "./Disscussion.css";
import "./Senderbox.css";
import "./test.css";

import axios from 'axios';
import profile from './profile.png';

import React, { useState, useEffect } from 'react'
import pic1 from './photos/1.jpg';
import pic2 from './photos/2.jpg';
import pic3 from './photos/3.jpg';
import pic4 from './photos/4.jpg';
import pic5 from './photos/5.jpg';
import pic6 from './photos/6.jpg';


const Disscussion = () => {

  const profilepic = [pic2, pic3, pic4, pic5, pic6];

  const [listitem, setListItem] = useState([]);
  const [activereciveruser, setactivereciveruser] = useState([]);
  const [inputValueMessageTextBox, setInputMessageTextBox] = useState('');

  const [messagelist, setMessageList] = useState([]);

  useEffect(() => {

    axios.post('http://127.0.0.1:8000/api/listofreciver/',{ useremail:JSON.parse(sessionStorage.getItem('loginData')).profile_data.email}).then((response) => {
      console.log(response.data.data);

      setListItem(response.data.data);
    }, (error) => {
      console.log(error);
    });
  }, []);



  const onClickSendButton = (event) => {
    event.preventDefault();
    if (inputValueMessageTextBox == '') {
      return;
    }
    if (activereciveruser.length === 0) {
      return;
    }
    // ... do something with inputValue
    // var inputValueMessageTextBoxStatic = inputValueMessageTextBox
    axios.post('http://127.0.0.1:8000/api/messagesendertoreciver/', { sender:JSON.parse(sessionStorage.getItem('loginData')).profile_data.email , reciver: activereciveruser.email, textmessage: inputValueMessageTextBox }).then((response) => {
      if (response) {
        console.log(response);
        setMessageList(messagelist);
        var newMessage = [{
          mesg:inputValueMessageTextBox, 
          message:{
            sender:{email:JSON.parse(sessionStorage.getItem('loginData')).profile_data.email},
            receiver:{email:activereciveruser.email}
        }}]
        setMessageList(messagelist => messagelist.concat(newMessage));
        setInputMessageTextBox("");
      }
    }, (error) => {
      console.log(error);
    });
  }


  const handleChangeInputMessageTextBox = (event) => {
    setInputMessageTextBox(event.target.value);
  }


  const onListElementClick = (email,name) => {
    console.log("value of  email and name",email,name);
    setactivereciveruser({name:name,email:email})
    axios.post('http://127.0.0.1:8000/api/messagesofauser/', {sender:JSON.parse(sessionStorage.getItem('loginData')).profile_data.email , reciver:email }).then((response) => {
      console.log(response.data.data)

      setMessageList(response.data.data);
      console.log(response.data)
      console.log(messagelist);
    }, (error) => {
      console.log(error);
    });
    // console.log(messagelist);
  };


  return (
    <div className="disscussionbox roundedcorner">

      <div className="sendernamedisplay ">

        <p className="chatword">Chats</p>

        <div className="senderbox">
          <div className='senderlistcontainer'>
            <ol className="listcontainer">


              {listitem.map((litem,index) => (
                <li
                className="listelement"
                id={litem.member.email}
                onClick={() => onListElementClick(litem.member.email, litem.member.name)}
                key={litem.member.email}
              >
                  <div><img src={profilepic[index % profilepic.length]} className="userprofileimage" /></div>
                  <div className="nameandemail">
                    <div className="nametext">{litem.member.name}</div>
                    <div className='emailtext'>{litem.member.email}</div>
                  </div>
                </li>
              ))}

            </ol></div>

        </div>

      </div>





      <div className="writingandviewingarea ">
        
      {activereciveruser.length === 0 ? (
       <></>
      ) : (<>
     
<div className="activereciveruser">
       <div className="image"><img src={pic2} className="userprofileimage" /></div>
       <div className="nameandemail">
         <div className="nametext">{activereciveruser.name}</div>
         <div className='emailtext'>{activereciveruser.email}</div>
       </div>
     </div>
            
      
        <div className="allmessage ">





          {messagelist.map((message) => (
            <div key={message.id}>
              { message.message.sender.email === JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ?(
                <>
                <div className="sendedmessages roundedcorner">
                  {/* Content for sender's message */}
                  <div className="messageContent">{message.mesg}</div>
                  <div className="messageTime">{(message.timestamp)}</div>
                </div>
                </>
              ) :(
                


<div className="Recivedmessages roundedcorner">
                  {/* Content for receiver's message */}
                  <div className="messageContent">{message.mesg}</div>
                  <div className="messageTime">{(message.timestamp)}</div>
                </div>
              )}
            </div>
          ))}


        </div>
        <div className="messagesendercontainer ">

          <div className="messagesender">

            <input type="text" className="textboxtoinput" id="messagetextbox" value={inputValueMessageTextBox} onChange={handleChangeInputMessageTextBox} placeholder="Type Here">

            </input>

            <button id="sendbuttonformessage" onClick={onClickSendButton}>
              send
            </button>

          </div>


        </div>
        </> )}
      </div>

    </div>

  );

};

export default Disscussion;