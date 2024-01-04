import './App.css';
import React, { useState, useEffect } from 'react'
import Navbar from './components/navbar/Navbar';
import SideNavbar from './components/sideNavbar/sideNavbar';
import Manage_team from './components/manage_team/Manage_team'
import Project from './components/Projects/Projects';
import Tasklist from './components/Tasks/Tasklist';
import Notification from './components/Notification/Notification';
import Modal from './components/modal_form/Modal';
import Cal from './components/calendar/Cal';
import FileUpload from './components/file_upload/FileUpload';
import DisscussionBox from './components/Disscussion/Disscussion'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login_Page/Login'
import ForgotPassword from './components/login_Page/forgot password/ForgotPassword';
import Registration from './components/registration/SignupForm'

function App() {
  const [authenticated, setAuthenticated] = useState('false');
  const handleLoginDataFromChild = (data) => {

    setAuthenticated(data);
  };
  useEffect(() => {//this help in seting authentication to false when we relode
    try {
      setAuthenticated(localStorage.getItem('mySessionVariable'))
    } catch (error) {
      setAuthenticated('false')
    }
  }, []);


  if (!authenticated) {
    return (
      <>
        <Router>
          <Routes>
            {/* first route goes to test container */}
            <Route exact path='' element=
              {
                <>
                  <Login onDataFromChild={handleLoginDataFromChild} />

                </>
              } />

            <Route exact path='forgotpassword' element=
              {
                <>
                  <ForgotPassword />

                </>
              }>
            </Route>
          </Routes>
        </Router>

      </>
    );
  }
  else {
    return (
      <>
        <Router>
          <div className='bodycontainer'>


            <Navbar />
            <SideNavbar />


            <div className="container">
              <Routes>
                {/* first route goes to test container */}
                <Route exact path='tasks' element=
                  {
                    <>
                      <Tasklist />
                    </>
                  }>
                </Route>
                <Route exact path='disscussion' element={
                  <>
                    < DisscussionBox />


                  </>
                }>
                </Route>
                <Route exact path='registration' element={
                  <>
                    < Registration />
                  </>
                }>
                </Route>
                {/*Manage team component route */}
                <Route exact path='manage_team' element=
                  {
                    <div className="maincomponentcontainer">
                      <Manage_team />
                      <Modal />
                    </div>
                  }>
                </Route>

                <Route exact path='project' element=
                  {

                    <Project />

                  }>
                </Route>

                <Route exact path='Notification' element=
                  {
                    <div className="maincomponentcontainer">
                      <Notification />
                    </div>
                  }>
                </Route>

                <Route exact path='calendar' element=
                  {

                    <Cal />

                  }>
                </Route>


              </Routes>
            </div>
          </div>
        </Router >
      </>
    );
  }
}

export default App;

