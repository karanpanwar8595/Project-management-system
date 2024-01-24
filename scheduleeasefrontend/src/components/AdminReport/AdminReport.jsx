import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './AdminReport.module.css'; // Assuming you have a separate CSS module for styling

const ManagerReport = () => {
  const projectOverviewData = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'Completed',
        data: [80, 60, 90, 75],
        backgroundColor: 'rgba(173, 216, 230, 0.7)',
        borderColor: 'rgba(173, 216, 230, 1)',
        borderWidth: 1,
      },
      {
        label: 'Delayed',
        data: [10, 20, 5, 15],
        backgroundColor: 'rgba(255, 99, 71, 0.7)', // Light red for delayed projects
        borderColor: 'rgba(255, 99, 71, 1)',
        borderWidth: 1,
      },
      {
        label: 'Started',
        data: [10, 20, 5, 10],
        backgroundColor: 'rgba(255, 255, 0, 0.7)', // Yellow for started projects
        borderColor: 'rgba(255, 255, 0, 1)',
        borderWidth: 1,
      },
    ],
  };

  const teamPerformanceData = {
    labels: ['Team 1', 'Team 2', 'Team 3'],
    datasets: [
        {
            label: 'Tasks Due',
            data: [30, 15, 20],
            backgroundColor: 'rgba(255, 99, 71, 0.7)', // Light red for tasks due
            borderColor: 'rgba(255, 99, 71, 1)',
            borderWidth: 1,
          },
      {
        label: 'Tasks Completed',
        data: [120, 85, 100],
        backgroundColor: 'rgba(173, 216, 100, 0.7)',
        borderColor: 'rgba(173, 216, 100, 1)',
        borderWidth: 1,
      },
    
    ],
};

const financialOverviewData = {
    labels: ['Budget', 'Expenses', 'Revenue'],
    datasets: [
      {
        data: [50000, 20000, 75000],
        backgroundColor: ['#e74c3c', '#f39c12', '#2ecc71'],
      },
    ],
  };

 
    const userActivityData = {
      labels: ['Manager A', 'Team Member 1', 'Team Member 2'],
      datasets: [
        {
          label: 'Daily Logins',
          data: [5, 8, 6],
          backgroundColor: 'rgba(155, 89, 182, 0.7)',
          borderColor: 'rgba(155, 89, 182, 1)',
          borderWidth: 1,
        },
        {
          label: 'Weekly Logins',
          data: [30, 25, 20],
          backgroundColor: 'rgba(52, 152, 219, 0.7)',
          borderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 1,
        },
        {
          label: 'Monthly Logins',
          data: [100, 80, 90],
          backgroundColor: 'rgba(46, 204, 113, 0.7)',
          borderColor: 'rgba(46, 204, 113, 1)',
          borderWidth: 1,
        },
      ],
    };

    return (
        <div className={styles.adminReports}>
          {/* Top Left: Project Overview Report */}
          <div className={styles.reportSection}>
            <h2>Project Overview</h2>
            <div className={styles.chartContainer}>
              <Bar data={projectOverviewData} />
            </div>
          </div>
    
          {/* Top Right: Team Performance Report */}
          <div className={styles.reportSection}>
            <h2>Team Performance</h2>
            <div className={styles.chartContainer}>
              <Bar data={teamPerformanceData} />
            </div>
          </div>
    
          {/* Bottom Left: User Activity Report */}
          <div className={styles.reportSection}>
            <h2>User Activity</h2>
            <div className={styles.chartContainer}>
              <Bar data={userActivityData} />
            </div>
          </div>
    
          {/* Bottom Right: Financial Overview Report */}
          <div className={styles.reportSection}>
            <h2>Financial Overview</h2>
            <div className={styles.chartContainer}>
              <Doughnut data={financialOverviewData} />
            </div>
          </div>
        </div>
      );
    };
    
    export default ManagerReport;
    