import React, { useState } from 'react';
import './PlaceCard.css';
import ReviewStars from '../ReviewStars/ReviewStars'; '../ReviewStars/ReviewStars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PlaceCard = ({ place }) => {
  const [rating, setRating] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsFavorite(!isFavorite);
  };
  const isOpen = place.isOpen; //place.isOpen;

  return (
    <a href={`/places/${place._id}`} className="place-card">
    <div className="place-card-subContainer">
    <div className="favorite-icon" onClick={toggleFavorite}>
    <FontAwesomeIcon className={`${isFavorite ? 'heart-active' : ''}`} color='#48D1B2' icon={faHeart} />
     </div>
     <div className={`status-label ${isOpen ? 'open' : 'closed'}`}>
          {isOpen ? 'Abierto ahora' : 'Cerrado'}
      </div>
      <img src={place.images[place.images.length - 1]} alt={place.name} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{`${place.name.slice(0,34)}${ place.name.length > 34 ? '...' : ''}`}</h2>
        <p className="place-description">{place.description}</p>
        <span className="place-rating">Calificacion: <ReviewStars readOnly={true} ratingScore={place.rating} 
        rating={rating} setRating={setRating}/></span>
      </div>
    </div>
    </a>
  );
};

export default PlaceCard;