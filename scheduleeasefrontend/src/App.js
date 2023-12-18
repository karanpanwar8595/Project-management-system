import './App.css';
import Navbar from './components/navbar/Navbar';
import SideNavbar from './components/sideNavbar/sideNavbar';
import Footer from './components/Footer/Footer';
import Testcontainer from './components/testcontainer/testcontainer';
import Manage_team from './components/manage_team/Manage_team'
import Project from './components/Projects/Projects';
import Tasklist from './components/Tasks/Tasklist';


import DisscussionBox from './components/Disscussion/Disscussion'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


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
                  
                  <Tasklist/>
                
                </>
                }>
              </Route>




              <Route exact path='disscussion' element={
              <>
                < DisscussionBox/>
                
     
                </>
                }>
              </Route>

              {/*Manage team component route */}  
              <Route exact path='manage_team' element=
              {
                <div className="maincomponentcontainer">
                  <Manage_team/>
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


            </Routes>

         
          </div>

        </div>

      </Router >
    </>
  );
}

export default App;

