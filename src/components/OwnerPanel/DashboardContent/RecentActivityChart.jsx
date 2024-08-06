import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RecentActivityChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Array de fechas
    datasets: [
      {
        label: 'Número de Visitantes',
        data: data.visitors, // Array de números de visitantes
        fill: false,
        backgroundColor: '#00aaff',
        borderColor: '#00aaff',
      },
      {
        label: 'Número de Reseñas',
        data: data.reviews, // Array de números de reseñas
        fill: false,
        backgroundColor: '#ffaa00',
        borderColor: '#ffaa00',
      },
      {
        label: 'Calificación Promedio',
        data: data.ratings, // Array de calificaciones promedio
        fill: false,
        backgroundColor: '#ff0000',
        borderColor: '#ff0000',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Fecha',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cantidad',
        },
      },
    },
  };


  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RecentActivityChart;
