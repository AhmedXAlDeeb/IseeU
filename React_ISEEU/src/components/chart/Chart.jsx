import React from 'react';
import "./chart.css";
// LineChart.js
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


const Chart = (props) => {
    const data = {
        labels: props.labels,
        datasets: [
            {
                label: 'data',
                data: props.data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Hide the legend labels
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        // Optionally, customize or remove the label content here
                        let label = '';
                        if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default Chart
