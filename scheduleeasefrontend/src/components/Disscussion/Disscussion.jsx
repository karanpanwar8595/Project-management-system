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
  async function fetchData(url, setData) {
    try {
      const response = await axios.post(url, { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email });
      setData((prevData) => [...prevData, ...response.data.data]);
    } catch (error) {
      console.error(`Error fetching data from ${url}`, error);
    }
  }

  const fetchDataAndUpdateList = async () => {
    await fetchData('http://127.0.0.1:8000/api/listofreciver/', setListItem);
    await fetchData('http://127.0.0.1:8000/api/listofreciverformanager/', (data) => {
      const clients = data.map((client) => ({ member: { email: client.email, name: client.name } }));
      setListItem((prevData) => [...prevData, ...clients]);
    });
  };

  useEffect(() => {

  }, []); // Empty dependency array to mimic componentDidMount behavior

  useEffect(() => {
    const role = JSON.parse(sessionStorage.getItem('loginData')).profile_data.role;








    if (role === 1) {
      var clients = [];
      var members = [];
      axios.post('http://127.0.0.1:8000/api/listofreciver/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {

        console.log('listofreciver', response.data.data);
        console.log("before adding", listitem);
        // console.log("clients",clients);
        members = response.data.data;
        // setListItem();
        const newData = [...members, ...clients];
        const uniqueData = newData.filter((item, index, self) =>
          index === self.findIndex((t) => (
            t.member && item.member && t.member.email === item.member.email
          ))
        );


        setListItem(uniqueData);



        console.log("manager")
        axios.post('http://127.0.0.1:8000/api/listofreciverformanager/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
          console.log("list for manager", response.data);
          for (const client of response.data.data) {
            // Access each 'client' object here
            console.log(client);
            clients.push({ member: { email: client.email, name: client.name } });
            // Your code for each client goes here
          }
          const newData = [...members, ...clients];
          const uniqueData = newData.filter((item, index, self) =>
            index === self.findIndex((t) => (
              t.member && item.member && t.member.email === item.member.email


            ))
          );
          const emailToDelete =JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ;

          const modifiedUniqueData = uniqueData.filter(item => {
            // Delete the entry if the email matches the one you want to remove
            return item.member && item.member.email !== emailToDelete;
          });

          setListItem(modifiedUniqueData);
          // setListItem(response.data.data);
        }, (error) => {
          console.log(error);
        });

      }, (error) => {
        console.log(error);
      });
      console.log(listitem)






    }
    else if (role === 2) {

      axios.post('http://127.0.0.1:8000/api/listofreciver/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {

        console.log('listofreciver', response.data.data);
        console.log("before adding", listitem);
        // console.log("clients",clients);
        const members = response.data.data;
        // setListItem();
        const emailToDelete =JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ;

        const modifiedUniqueData = members.filter(item => {
          // Delete the entry if the email matches the one you want to remove
          return item.member && item.member.email !== emailToDelete;
        });

        setListItem(modifiedUniqueData);
      }, (error) => {
        console.log(error);
      });
      // console.log(members,clients)




    }
    else if (
      role === 3
    ) {


      axios.post('http://127.0.0.1:8000/api/listofreciverforclient/', { useremail: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email }).then((response) => {
        console.log("list for manager", response.data);
        var clients = [];
        for (const client of response.data.data) {
          // Access each 'client' object here
          console.log(client);
          clients.push({ member: { email: client.email, name: client.name } });
          // Your code for each client goes here
        }

        setListItem(clients);
        console.log("updatedlist", listitem);
        // setListItem(response.data.data);
      }, (error) => {
        console.log(error);
      });



    }

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
    axios.post('http://127.0.0.1:8000/api/messagesendertoreciver/', { sender: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, reciver: activereciveruser.email, textmessage: inputValueMessageTextBox }).then((response) => {
      if (response) {
        console.log(response);
        setMessageList(messagelist);
        var newMessage = [{
          mesg: inputValueMessageTextBox,
          message: {
            sender: { email: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email },
            receiver: { email: activereciveruser.email }
          }
        }]
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


  const onListElementClick = (email, name) => {
    console.log("value of  email and name", email, name);
    setactivereciveruser({ name: name, email: email })
    axios.post('http://127.0.0.1:8000/api/messagesofauser/', { sender: JSON.parse(sessionStorage.getItem('loginData')).profile_data.email, reciver: email }).then((response) => {
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


              {listitem.map((litem, index) => (
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
                {message.message.sender.email === JSON.parse(sessionStorage.getItem('loginData')).profile_data.email ? (
                  <>
                    <div className="sendedmessages roundedcorner">
                      {/* Content for sender's message */}
                      <div className="messageContent">{message.mesg}</div>
                      <div className="messageTime">{(message.timestamp)}</div>
                    </div>
                  </>
                ) : (



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
        </>)}
      </div>

    </div>

  );

};

export default Disscussion;