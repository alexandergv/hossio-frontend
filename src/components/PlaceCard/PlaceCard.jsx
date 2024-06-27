import React from 'react';
import './PlaceCard.css';

const PlaceCard = ({ place }) => {
  return (
    <a href={`/places/${place.id}`} className="place-card">
    <div className="place-card-subContainer">
      <img src={place.images[0]} alt={place.name} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{place.name}</h2>
        <p className="place-description">{place.description}</p>
        <span className="place-rating">Calificacion: {place.rating}/ 5</span>
      </div>
    </div>
    </a>
  );
};

export default PlaceCard;