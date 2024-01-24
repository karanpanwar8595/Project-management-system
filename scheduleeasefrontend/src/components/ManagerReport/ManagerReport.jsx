import React from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import styles from './ManagerReport.module.css';

const ManagerReport = () => {
  // Placeholder data for various charts
  const projectProgressData = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D'],
    datasets: [
      {
        label: 'Completion Status',
        data: [80, 60, 90, 75],
        backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12'],
        borderWidth: 1,
      },
    ],
  };

  const taskCompletionData = {
    labels: ['Team Member 1', 'Team Member 2', 'Team Member 3'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [30, 45, 25],
        backgroundColor: '#2ecc71',
        borderWidth: 1,
      },
      {
        label: 'Pending Tasks',
        data: [10, 5, 15],
        backgroundColor: '#e74c3c',
        borderWidth: 1,
      },
    ],
  };

  const teamProductivityData = {
    labels: ['Team Member 1', 'Team Member 2', 'Team Member 3'],
    datasets: [
      {
        label: 'Completed Tasks',
        data: [120, 85, 100],
        backgroundColor: '#2ecc71',
        borderWidth: 1,
      },
      {
        label: 'Average Completion Time',
        data: [3.5, 4.2, 3.0],
        backgroundColor: '#f39c12',
        borderWidth: 1,
      },
    ],
  };

  const timelineCalendarData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Project A',
        data: [2, 4, 1, 3],
        borderColor: '#3498db',
        fill: false,
      },
      {
        label: 'Project B',
        data: [3, 2, 5, 1],
        borderColor: '#2ecc71',
        fill: false,
      },
    ],
  };

  return (
    <div className={styles.managerReports}>
      {/* Upper Row */}
      <div className={styles.upperRow}>
        <div className={styles.reportBox}>
          <h2 className={styles.reportTitle}>Project Progress</h2>
          <div className={styles.chartContainer}>
            <Bar data={projectProgressData} />
          </div>
        </div>

        <div className={styles.reportBox}>
          <h2 className={styles.reportTitle}>Task Completion</h2>
          <div className={styles.chartContainer}>
            <Bar data={taskCompletionData} />
          </div>
        </div>
      </div>

      {/* Lower Row */}
      <div className={styles.lowerRow}>
        <div className={styles.reportBox}>
          <h2 className={styles.reportTitle}>Team Productivity</h2>
          <div className={styles.chartContainer}>
            <Bar data={teamProductivityData} />
          </div>
        </div>

        <div className={styles.reportBox}>
          <h2 className={styles.reportTitle}>Timeline Calendar</h2>
          <div className={styles.chartContainer}>
            <Line data={timelineCalendarData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerReport;
