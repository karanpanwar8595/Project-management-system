import './App.css';
import Navbar from './components/navbar/Navbar';
import SideNavbar from './components/sideNavbar/sideNavbar';
import Footer from './components/Footer/Footer';
import Testcontainer from './components/testcontainer/testcontainer';
import Manage_team from './components/manage_team/Manage_team'
import Project from './components/Projects/Projects'
import Modal from './components/modal_form/Modal'
import Cal from './components/calendar/Cal'
// import Chatbox from './components/chatmessage/Chatmessage'

import DisscussionBox from './components/Disscussion/Disscussion'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Projects from './components/Projects/Projects';

function App() {
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
                  
                <div className='maincomponentcontainer'> 
                <Testcontainer />
                
                </div>
                <Footer/>
                
                </>
                }>
              </Route>


              <Route exact path='disscussion' element={
              <>
              
                {/* // {<div className='maincomponentcontainer'>  */}
                < DisscussionBox/>
                
                {/* </div> */}
                </>
                }>
              </Route>

              {/*Manage team component route */}  
              <Route exact path='manage_team' element=
              {
                <div className="maincomponentcontainer">
                  <Manage_team/>
                  <Modal/>
                </div>
              }>
            </Route>

            <Route exact path='project' element=
              {
                <div className="maincomponentcontainer">
                  <Project/>
                </div>
              }>
            </Route>

            <Route exact path='calendar' element=
              {
                <div className="maincomponentcontainer">
                  <Cal/>
                </div>
              }>
            </Route>


            </Routes>

         
          </div>

        </div>

      </Router >
    </>
  );
}

export default App;

