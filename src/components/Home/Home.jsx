import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import './Home.css';
import { placesData } from '../../data/places';

const Home = () => {
  const [places, setPlaces] = useState([]);



  useEffect(() => {

    setPlaces(placesData);
    // Llamada a la API para obtener los datos de los lugares
    // fetch('/api/places')
    //   .then(response => response.json())
    //   .then(data => setPlaces(data));
  }, []);

  return (
    <div className="home-container">
      <h1>Descubre donde <span className='highlight-text'>caer</span></h1>
      <div className="place-list">
        {places.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Home;