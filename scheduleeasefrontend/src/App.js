import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar/Navbar';
import SideNavbar from './components/sideNavbar/sideNavbar';
import Manage_team from './components/manage_team/Manage_team';
import Project from './components/Projects/Projects';
import TaskToMe from './components/Tasks/ToMe/Tasklist';
import TaskBYMe from './components/Tasks/ByMe/Tasklist';
import EditCompany from './components/Company/EditCompany/EditCompany';
import Notification from './components/Notification/Notification';
import Modal from './components/modal_form/Modal';
import Cal from './components/calendar/Cal';
import FileUpload from './components/file_upload/FileUpload';
import Home from './components/home/Home';
import Registration from './components/registration/SignupForm';
import Profile from './components/profile/Profile';
import UpdateProfile from './components/updateprofile/UpdateProfile';
import DisscussionBox from './components/Disscussion/Disscussion';

import ProjectDetails from './components/Projects/ProjectDetails';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login_Page/Login';
import ForgotPassword from './components/login_Page/forgot password/ForgotPassword';
import AddCompany from './components/Company/AddCompany/AddCompany';
import ViewCompany from './components/Company/ViewCompany/ViewCompany';
// import Registration from './components/registration/SignupForm';
import Addtask from './components/addtask/Addtask';
import ModifyTask from './components/modifytask/Modifytask';
import Payment from './components/Payment/Payment';
// import Dashboard from './components/Dashboard/Dashboard';
import BlockUser from './components/BlockUser/BlockUser';
import TeamMemberDas from './components/TeamMemberDas/TeamMemberDas';
import DasNewComp from './components/DasNewComp/DasNewComp';

import ChangePassword from './components/changepassword/ChangePassword';

import Dashboard from './components/Dasboard1/Dashboard1';

 import AdminReport from './components/AdminReport/AdminReport';

import ManagerReport from './components/ManagerReport/ManagerReport';
import EditProject from './components/Projects/EditProject/EditProject';
function App() {
  const [authenticateddata, setAuthenticateddata] = useState({ 'value': false });

  const handleLoginDataFromChild = (userLoginData) => {
    const userLoginDataToJson = JSON.stringify(userLoginData)
    // console.log(userLoginDataToJson)
    setAuthenticateddata(JSON.parse(userLoginDataToJson));
    sessionStorage.setItem('loginData', userLoginDataToJson);
    sessionStorage.setItem('profileData', userLoginDataToJson.profile_data);

  };


  useEffect(() => {//this help in seting authentication to false when we relode
    try {
      setAuthenticateddata(JSON.parse(sessionStorage.getItem('loginData')))
    } catch (error) {
      setAuthenticateddata({ 'value': false })
      // console.log("hello")
    }
  }, []);

  console.log(authenticateddata?.value);
  if (!(authenticateddata?.value)) {
    return (
      <>
        <Router>
          <Routes>
            {/* first route goes to test container */}
            <Route exact path='' element=
              {
                <>
                  <div className='login-container'>
                    <Login onDataFromChild={handleLoginDataFromChild} />
                  </div>
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
                {/* <Route exact path='tasks' element=
                  {
                    <>
                      <Tasklist />
                    </>
                  }>
                </Route> */}
                <Route exact path='disscussion' element={
                  <>
                    < DisscussionBox />


                  </>
                }>
                </Route>
                <Route exact path='managerreport' element={
                  <>
                    
                   <ManagerReport />
                   


                  </>
                }>
                </Route>
                <Route exact path='adminreport' element={
                  <>
                    
                   <AdminReport /> 
                   


                  </>
                }>
                </Route>
                <Route
                  exact
                  path='/modifytask'
                  element={<ModifyTask />}
                />
                {/* <Route exact path='modifytask' element={
                  <>
                    < ModifyTask />


                  </>
                }>
                </Route> */}
                <Route exact path='dashnew' element={
                  <>

                    < DasNewComp />


                  </>
                }>
                </Route>
                <Route exact path='dashboard1' element={
                  <>

                    < Dashboard />


                  </>
                }>
                </Route>
                <Route exact path='newdashboard' element={
                  <>

                    < TeamMemberDas />


                  </>
                }>
                </Route>
                <Route exact path='addtask' element={
                  <>

                    < Addtask />


                  </>
                }>
                </Route>
                <Route exact path='addcompany' element={
                  <>

                    < AddCompany />


                  </>
                }>
                </Route>
                <Route exact path='editcompany' element={
                  <>

                    < EditCompany />


                  </>
                }>
                </Route>
                <Route exact path='viewcompany' element={
                  <>

                    < ViewCompany />


                  </>
                }>
                </Route>

                <Route exact path='payment' element={
                  <>

                    < Payment />


                  </>
                }>
                </Route>

                <Route exact path='blockuser' element={
                  <>

                    < BlockUser />


                  </>
                }>
                </Route>

                <Route exact path='updateprofile' element={
                  <>

                    < UpdateProfile />


                  </>
                }>
                </Route>
                <Route exact path='registration' element={
                  <>
                    < Registration />
                  </>
                }>
                </Route>

                <Route exact path='tasktome' element={
                  <>
                    < TaskToMe />
                  </>
                }>
                </Route>
                <Route exact path='taskbyme' element={
                  <>
                   <TaskBYMe/>
                  </>
                }>
                </Route>

                {/*Manage team component route */}
                <Route exact path='manage_team' element=
                  {
             
                      <Manage_team />
                      
                 
                  }>
                </Route>
                <Route exact path='add_team_member' element=
                  {
                    <div className="maincomponentcontainer">
                      <Modal /> 
                      
                    </div>
                  }>
                </Route>

                <Route exact path='project' element=
                  {

                    <Project />

                  }>
                </Route>

                <Route exact path='ProjectDetails' element=
                  {

                    <ProjectDetails />

                  }>
                </Route>
                <Route exact path='editproject' element=
                  {

                    <EditProject />

                  }>
                </Route>

                <Route exact path='Notification' element=
                  {
                    <div className="maincomponentcontainer">
                      <Notification />
                    </div>
                  }>
                </Route>


                <Route exact path='changepassword' element=
                  {
                    
                      <ChangePassword />
                  
                  }>
                </Route>
                

                <Route exact path='calendar' element=
                  {

                    <Cal />

                  }>
                </Route>
                <Route exact path='profile' element=
                  {

                    <Profile />

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
