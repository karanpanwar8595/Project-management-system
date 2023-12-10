import React from 'react'
import manage_team_css from './Manage_team.css'
import plus from './plus.png'
const Manage_team = () => {
  return (
    
    <div>
        {/* <h5>Select your project</h5> */}
        <select style={{ height: '40px', width: '150px', fontSize: '18px',borderRadius:'10px', marginTop:'20px'}}>
          <option disabled selected value="">Select a Project</option>
          <option>Project 1</option>
          <option>Project 2</option>
          <option>Project 3</option>
        </select>

        <div class="profile-grid">
    <div>
    <div class="profile-picture">
      <img src="https://randomuser.me/api/portraits/men/4.jpg" alt="Profile 1"/>
    </div>
    <p style={{textAlign:'center'}}>Mr. Abc</p>
    </div>

    <div>
    <div class="profile-picture">
      <img src="https://randomuser.me/api/portraits/men/9.jpg" alt="Profile 2"/>
    </div>
    <p style={{textAlign:'center'}}>Mr. Xyz</p>
    </div>

    <div>
    <div class="profile-picture">
      <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile 3"/>
    </div>
    <p style={{textAlign:'center'}}>Mr. Pqr</p>
    </div>

    <div>
    <div class="profile-picture">
      <img src="https://randomuser.me/api/portraits/men/10.jpg" alt="Profile 4"/>
    </div>
    <p style={{textAlign:'center'}}>Mr. Mno</p>
    </div>

  </div>
  <img src={plus} class='plus-symbol' />
    </div>
  )
}

export default Manage_team
