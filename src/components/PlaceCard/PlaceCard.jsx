import React from 'react';
import './PlaceCard.css';

const PlaceCard = ({ place }) => {
  return (
    <div className="place-card">
      <img src={place.image} alt={place.name} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{place.name}</h2>
        <p className="place-description">{place.description}</p>
        <span className="place-rating">Calificacion: {place.rating}/ 5</span>
      </div>
    </div>
  );
};

export default PlaceCard;