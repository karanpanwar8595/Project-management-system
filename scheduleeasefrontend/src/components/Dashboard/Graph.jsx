import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Import this line to include all chart types

// -------------Graph ke liye ye install karna----------------
// npm install react-chartjs-2 chart.js
// -----------------------------------------------------------

const Graph = () => {
    const data = {
        labels : [ 'August', 'September', 'October', 'November', 'December','January'],

        datasets: [
            {
                label: 'Tasks Given',
                data: [15, 19, 18, 11, 15, 15, 14],
                backgroundColor: 'rgba(173, 216, 230, 0.7)', // Light Blue with 20% opacity
                borderColor: 'rgba(173, 216, 230, 1)',       // Light Blue with 100% opacity
                borderWidth: 1,
            },
            {
                label: 'Tasks Completed',
                data: [14, 12, 15, 11, 13, 14, 12],
                backgroundColor: 'rgba(173, 216, 100, 0.7)', // Light Blue with 20% opacity
                borderColor: 'rgba(173, 216, 100, 1)',       // Light Blue with 100% opacity
                borderWidth: 1,
            },
        ],

    };

    const options = {
        scales: {
            x: {
                type: 'category', // Use category scale for X-axis
                title: {
                    display: true,
                    text: 'Days',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Tasks',
                },
            },
        },
    };

    return (
        <div style={{ maxWidth: '10000%', margin: '30px  auto auto 40px' }}>
            <div style={{ marginTop: '10%',maxHeight:'1000px', maxWidth: '900px', margin: 'auto' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Graph;