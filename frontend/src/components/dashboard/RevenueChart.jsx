import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: false, text: 'Revenue' },
    },
    maintainAspectRatio: false,
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Ingresos 2024 (Mock)',
        data: [1200, 1900, 3000, 5000, 2300, 3400, 4500],
        borderColor: 'rgb(16, 185, 129)', 
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
      <div className="bg-white p-4 rounded-lg shadow h-64">
           <h3 className="text-gray-500 font-bold mb-2">Evolución de Ingresos</h3>
           <div className="h-52">
                <Line options={options} data={data} />
           </div>
      </div>
  );
};

export default RevenueChart;