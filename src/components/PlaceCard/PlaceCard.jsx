import React, { useState } from 'react';
import './PlaceCard.css';
import ReviewStars from '../ReviewStars/ReviewStars'; '../ReviewStars/ReviewStars.css';

const PlaceCard = ({ place }) => {
  const [rating, setRating] = useState([]);

  return (
    <a href={`/places/${place._id}`} className="place-card">
    <div className="place-card-subContainer">
      <img src={place.images[place.images.length - 1]} alt={place.name} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{place.name}</h2>
        <p className="place-description">{place.description}</p>
        <span className="place-rating">Calificacion: <ReviewStars readOnly={true} ratingScore={place.rating} 
        rating={rating} setRating={setRating}/></span>
      </div>
    </div>
    </a>
  );
};

export default PlaceCard;