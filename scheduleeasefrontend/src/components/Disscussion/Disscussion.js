import "./Disscussion.css"
import "./Senderbox.css"


import axios from 'axios';


import React, { useState, useEffect } from 'react'


const Disscussion = () => {
  const [listitem, setListItem] = useState([]);
  const [activereciveruser, setactivereciveruser] = useState([]);
  const [inputValueMessageTextBox, setInputMessageTextBox] = useState('');

  const [messagelist, setMessageList] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/listofreciver/').then((response) => {
      setListItem(response.data);
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }, []);



  const onClickSendButton = (event) => {
    event.preventDefault();
    // ... do something with inputValue
    // var inputValueMessageTextBoxStatic = inputValueMessageTextBox
    axios.post('http://127.0.0.1:8000/api/messagesendertoreciver/', { sender: 'mudit', reciver: activereciveruser.email, textmessage: inputValueMessageTextBox }).then((response) => {
      if (response) {
        console.log(response);
        setMessageList(messagelist)
        var newMessage=[{'sendertype':1,'messagetxt': inputValueMessageTextBox}]
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


  const onListElementClick = (event) => {
    var email_id = event.target.closest('li').id;
    console.log(email_id);
    axios.post('http://127.0.0.1:8000/api/activereciveruser/', { email: email_id }).then((response) => {
      setactivereciveruser(response.data[0]);
    }, (error) => {
      console.log(error);
    });

    
     axios.post('http://127.0.0.1:8000/api/messagesofauser/', { email: email_id }).then((response) => {
      setMessageList(response.data);
      console.log(response)
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


              {listitem.map((litem) => (
                <li className="listelement" id={litem.email} onClick={onListElementClick} key={litem.email} >
                  <div className="nameandemail">
                    <div className="nametext">{litem.firstname}</div>
                    <div className='emailtext'>{litem.email}</div>
                  </div>
                </li>
              ))}

            </ol></div>

        </div>

      </div>



      <div className="writingandviewingarea ">
        <div className="activereciveruser">
          <div className="nametext">{activereciveruser.firstname}</div>
          <div className='emailtext'>{activereciveruser.email}</div>
        </div>

        <div className="allmessage ">


          {messagelist.map((message) => (
            message.sendertype === 0 ? (
              <div className="Recivedmessages roundedcorner" >
                {/* Content for receiver's message */}
                {message.messagetxt}
              </div>
            ) : (
              message.sendertype === 1 ? (
                <div className="sendedmessages roundedcorner" >
                  {/* Content for sender's message */}
                  {message.messagetxt}
                </div>
              ) : null
            )
          ))}






        </div>
        <div className="messagesendercontainer ">

          <div className="messagesender">

            <input type="text" className="textboxtoinput" id="messagetextbox" value={inputValueMessageTextBox} onChange={handleChangeInputMessageTextBox}>

            </input>

            <button onClick={onClickSendButton}>
              send
            </button>

          </div>


        </div>
      </div>

    </div>

  );

};

export default Disscussion;