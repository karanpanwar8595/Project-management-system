import './App.css';
import Navbar from './components/navbar/Navbar';
import SideNavbar from './components/sideNavbar/sideNavbar';
import Footer from './components/Footer/footer/Footer';
import Testcontainer from './components/testcontainer/testcontainer';
import Manage_team from './components/manage_team/Manage_team'


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
                {<div className='maincomponentcontainer'> 
                <Testcontainer />
                
                </div>
                }>
              </Route>

              {/*Manage team component route */}  
              <Route exact path='manage_team' element=
              {
                <div className="container">
                  <Manage_team/>
                </div>
              }>
            </Route>


            </Routes>
            <Footer /> {/*footer for all the routes*/}
          </div>

        </div>

      </Router >
    </>
  );
}

export default App;

