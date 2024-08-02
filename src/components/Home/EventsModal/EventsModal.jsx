import React from 'react';
import './EventsModal.css';

const EventsModal = ({ onClose }) => {
  // Aquí deberías hacer la llamada a la API para obtener los eventos

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Últimos Eventos</h2>
        {/* Aquí deberías mapear los eventos obtenidos */}
        <div className="events-list">
          <p>Evento 1</p>
          <p>Evento 2</p>
          <p>Evento 3</p>
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
