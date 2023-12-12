import "./Disscussion.css"
import "./Senderbox.css"


import axios from 'axios';


import React, { useState, useEffect } from 'react'


const Disscussion = () => {
  const [listitem, setListItem] = useState([{ firstname: "mudit", email: 'mudit@gmail.com' }]);
  const [activeuser, setActiveUser] = useState([{ firstname: "mudit", email: 'mudit1@gmail.com' }]);



  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/listofreciver/').then((response) => {


      setListItem(response.data);
      console.log(response);
    }, (error) => {
      console.log("error");
    });


  }, []);



  const onListElementClick = (event) => {
    var email_id=event.target.closest('li').id;
    console.log(email_id);

    axios.post('http://127.0.0.1:8000/api/activeuser/',{ email : email_id}).then((response) => {


    setActiveUser(response.data[0]);
      // console.log();
      // console.log(activeuser[0].firstname);
      // console.log("activeuser");
    }, (error) => {
      console.log("error");
    });


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
        <div className="activeuser">
          <div className="nametext">{activeuser.firstname}</div>
          <div className='emailtext'>{activeuser.email}</div>
        </div>

        <div className="allmessage ">

          <div className="Recivedmessages roundedcorner">
            "hii how are you what are you doow are you what are you doow are you what are you doing"
          </div>
          <div className="sendedmessages roundedcorner">
            "hii how are yow are you what are you doow are you what are you doow are you what are you doou what are you doing"
          </div>



        </div>
        <div className="messagesendercontainer ">

          <div className="messagesender">

            <input type="text" className="textboxtoinput">

            </input>
            <button>
              send
            </button>

          </div>


        </div>
      </div>

    </div>

  );

};

export default Disscussion;