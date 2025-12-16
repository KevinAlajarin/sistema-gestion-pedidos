import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersByStatusChart = ({ data }) => {
    const labels = data.map(d => d.Status);
    const counts = data.map(d => d.Count);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: '# of Orders',
                data: counts,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)', 
                    'rgba(54, 162, 235, 0.6)', 
                    'rgba(75, 192, 192, 0.6)', 
                    'rgba(255, 99, 132, 0.6)', 
                    'rgba(153, 102, 255, 0.6)', 
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow h-64 flex justify-center items-center">
            <div className="w-full h-full">
                <h3 className="text-gray-500 font-bold mb-2 text-center">Órdenes por Estado</h3>
                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
        </div>
    );
};

export default OrdersByStatusChart;