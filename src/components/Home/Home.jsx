import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import axios from 'axios';
import config from '../../config';
import './Home.css';

const Home = () => {
  const [places, setPlaces] = useState([]);


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/places/GetAll`);
        setPlaces(response.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
  
    fetchPlaces();
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