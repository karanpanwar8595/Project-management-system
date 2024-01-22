// Dashboard.jsx
import React from 'react';
import './DasNewComp.css';

const Dashboard = () => {
  const totalProjects = 200;
  const dueProjects = 20;
  const completeProjects = 180;

  const managerData = [
    { name: 'Managers', value: 10 },
    { name: 'Team Members', value: 20 },
    { name: 'Clients', value: 5 },
  ];

  const activeUsersData = [
    { id: 1, name: 'John Doe', role: 'Manager', project: 'Project A', activity: 'Online', time: '2 hours ago' },
    { id: 2, name: 'Jane Smith', role: 'Team Member', project: 'Project B', activity: 'Offline', time: '3 hours ago' },
    { id: 3, name: 'Alice Johnson', role: 'Manager', project: 'Project C', activity: 'Online', time: '1 hour ago' },
    { id: 4, name: 'Bob Wilson', role: 'Team Member', project: 'Project A', activity: 'Online', time: '4 hours ago' },
    { id: 5, name: 'Eva Martinez', role: 'Manager', project: 'Project B', activity: 'Offline', time: '5 hours ago' },
    { id: 6, name: 'Chris Lee', role: 'Team Member', project: 'Project C', activity: 'Online', time: '2 hours ago' },
    { id: 7, name: 'Grace Wang', role: 'Manager', project: 'Project A', activity: 'Online', time: '3 hours ago' },
    { id: 8, name: 'Daniel Brown', role: 'Team Member', project: 'Project B', activity: 'Offline', time: '1 hour ago' },
    { id: 9, name: 'Olivia Kim', role: 'Manager', project: 'Project C', activity: 'Online', time: '4 hours ago' },
    { id: 10, name: 'Liam Miller', role: 'Team Member', project: 'Project A', activity: 'Online', time: '5 hours ago' },
  ];

  const paymentData = [
    { id: 1, client: 'Client X', amount: 500, status: 'Pending' },
    { id: 2, client: 'Client Y', amount: 750, status: 'Pending' },
    { id: 3, client: 'Client Z', amount: 1200, status: 'Pending' },
    { id: 4, client: 'Client A', amount: 300, status: 'Pending' },
    { id: 5, client: 'Client B', amount: 900, status: 'Pending' },
    { id: 6, client: 'Client C', amount: 600, status: 'Pending' },
    { id: 7, client: 'Client D', amount: 850, status: 'Pending' },
    { id: 8, client: 'Client E', amount: 1100, status: 'Pending' },
    { id: 9, client: 'Client F', amount: 400, status: 'Pending' },
    { id: 10, client: 'Client G', amount: 950, status: 'Pending' },
  ];

  const getStatusDot = (status) => {
    const dotStyle = {
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      display: 'inline-block',
      marginRight: '5px',
    };

    if (status === 'Approved') {
      dotStyle.backgroundColor = 'green';
    } else if (status === 'Pending') {
      dotStyle.backgroundColor = 'red';
    }

    return <div style={dotStyle}></div>;
  };

  return (
    <div className="admin-dashboard-container">
      <div className="action-cards-container">
        <div className="action-card create-account" style={{ background: '#3498db' }}>
          <h3>Total projects</h3>
          <p style={{ color: 'white' }}>{totalProjects}</p>
        </div>

        <div className="action-card manage-accounts" style={{ background: '#e67e22' }}>
          <h3>Due projects</h3>
          <p style={{ color: 'white' }}>{dueProjects}</p>
        </div>

        <div className="action-card view-projects" style={{ background: '#2ecc71' }}>
          <h3>Complete Projects</h3>
          <p style={{ color: 'white' }}>{completeProjects}</p>
        </div>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-tables">
          {activeUsersData.length > 0 && (
            <div>
              <h3>Active user</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                 {activeUsersData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.project}</td>
                    {/* A<td>{getActivityDot(user.activity)}</td> */}
                    <td>{user.activity}</td>
                    <td>{user.time}</td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          )}

          {paymentData.length > 0 && (
            <div>
              <h3>Payments</h3>
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentData.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.client}</td>
                      <td>{payment.amount}</td>
                      <td>{getStatusDot(payment.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



