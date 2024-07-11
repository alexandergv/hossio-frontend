import React, { useState,useEffect } from 'react';
import './DashboardContent.css';
import RecentActivityChart from './RecentActivityChart';



const DashboardContent = () => {
  
  const [activityData, setActivityData] = useState({
    labels: [],
    visitors: [],
    reviews: [],
    ratings: [],
  });
  
  useEffect(() => {
    // Simulación de datos
    const mockData = {
      labels: ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'],
      visitors: [10, 15, 12, 20, 25],
      reviews: [5, 8, 7, 10, 9],
      ratings: [4.5, 4.3, 4.6, 4.8, 4.7],
    };
  
    setActivityData(mockData);
  }, []);
  
  return(
  <section className="dashboard-content">
    <h2>Dashboard</h2>
    <div className="dashboard-stats">
      <div className="stat-card">
        <h3>Visitantes</h3>
        <p>1,234</p>
      </div>
      <div className="stat-card">
        <h3>Reseñas</h3>
        <p>567</p>
      </div>
      <div className="stat-card">
        <h3>Promociones Activas</h3>
        <p>3</p>
      </div>
    </div>
    <div className="dashboard-graph">
      <RecentActivityChart data={activityData} />
    </div>
    <div className="dashboard-recent-activities">
      <h3>Actividades Recientes</h3>
      <ul>
        <li>Reseña recibida de Juan</li>
        <li>Promoción "Descuento de Verano" activada</li>
        <li>Nuevo mensaje de Maria</li>
      </ul>
    </div>
  </section>
)};

export default DashboardContent;
