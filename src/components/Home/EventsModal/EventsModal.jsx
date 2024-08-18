import React from 'react';
import './EventsModal.css';

const EventsModal = ({ onClose, events }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✕</button>
        <h2>Últimos Eventos</h2>
        <div className="events-list">
          {events.map((event, index) => (
            <a key={index} href={`/places/${event.placeId}`} className="event-card">
              <img src={event.image || "https://res.cloudinary.com/dq5xhipwo/image/upload/v1724005984/a4trmfvgcezaiibgpdjz.webp"} alt={event.title} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-place">Lugar: {event.placeName}</p> 
                <p className="event-summary">{event.summary}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsModal;
