import React from 'react';
import './ScheduleTable.css';

const ScheduleTable = ({ schedule }) => {
  return (
    <div className="schedule-table-container">
      <h3>Horario</h3>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Día</th>
            <th>Abierto</th>
            <th>Cerrado</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(schedule).map(([day, hours], index) => (
            <tr key={index}>
              <td>{day}</td>
              <td>{hours.open}</td>
              <td>{hours.close}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;
