import React, { useState, useEffect } from 'react';
import './PlaceCard.css';
import ReviewStars from '../ReviewStars/ReviewStars'; '../ReviewStars/ReviewStars.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const PlaceCard = ({ place }) => {
  const [rating, setRating] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const daysOfWeek = [
    'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
  ];

  function areTodayHoursEmpty(schedule) {
    // Obtener el día actual de la semana
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
  
    // Obtener los horarios de apertura y cierre para el día actual
    const openTime = schedule[currentDay].open;
    const closeTime = schedule[currentDay].close;
  
    // Verificar si las horas están en blanco
    return openTime === '' && closeTime === '';
  }
  
  function isPlaceOpen(schedule) {
    // Obtener el día actual de la semana y la hora actual
    const now = new Date();
    const currentDay = daysOfWeek[now.getDay()];
    const currentTime = now.toTimeString().slice(0, 5); // 'HH:MM' format
  
    // Obtener los horarios de apertura y cierre para el día actual
    const openTime = schedule[currentDay].open;
    const closeTime = schedule[currentDay].close;
  
    // Verificar si el lugar está abierto las 24 horas
    if (openTime === '24/7') {
      return true;
    }
  
    // Verificar si el lugar está cerrado todo el día
    if (openTime === 'Cerrado' || closeTime === 'Cerrado') {
      return false;
    }
  
    // Verificar si la hora de cierre es el día siguiente
    if (closeTime < openTime) {
      // Si es después de la medianoche pero antes de la hora de cierre
      return currentTime >= openTime || currentTime < closeTime;
    } else {
      // Si la hora de cierre es el mismo día
      return currentTime >= openTime && currentTime < closeTime;
    }
  }

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigation
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if(isPlaceOpen(place.placeDetails.schedule)){
      setIsOpen(true);
    }
  },[])

  return (
    <a href={`/places/${place._id}`} className="place-card">
    <div className="place-card-subContainer">
    <div className="favorite-icon" onClick={toggleFavorite}>
    <FontAwesomeIcon className={`${isFavorite ? 'heart-active' : ''}`} color='#48D1B2' icon={faHeart} />
     </div>
     <div className={`status-label ${
      isOpen ? 'open' : 
      (areTodayHoursEmpty(place.placeDetails.schedule) ? 
          'unknown' : 'closed')}`
      }>
          {isOpen ? 'Abierto ahora' : 
          (areTodayHoursEmpty(place.placeDetails.schedule) ? 
          'Horario desconocido' : 'Cerrado')}
      </div>
      <img src={place.images[place.images.length - 1]} alt={place.name} className="place-image" />
      <div className="place-details">
        <h2 className="place-name">{`${place.name.slice(0,34)}${ place.name.length > 34 ? '...' : ''}`}</h2>
        <p className="place-description">
          {place.description.length == 0 && place.placeDetails.type[0]}
          {`${place.description.slice(0,93)}${ place.description.length > 93 ? '...' : ''}`}
          </p>
        <span className="place-rating">Calificacion: <ReviewStars readOnly={true} ratingScore={place.rating} 
        rating={rating} setRating={setRating}/></span>
      </div>
    </div>
    </a>
  );
};

export default PlaceCard;