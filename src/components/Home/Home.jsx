import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import axiosInstance from 'services/axiosConfig'
import './Home.css';

const Home = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [places, setPlaces] = useState([]);


  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axiosInstance.get('/places/nearby', {
        params: {
          latitude,
          longitude,
        },
      });
      setPlaces(response.data);
    } catch (error) {
      console.error("Error fetching nearby places", error);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          setLocation({ latitude, longitude });
          fetchNearbyPlaces(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // const fetchPlaces = async () => {
    //   try {
    //     const response = await axiosInstance.get(`/places/GetAll`);
    //     setPlaces(response.data);
    //   } catch (error) {
    //     console.error('Error fetching places:', error);
    //   }
    // };
  
    // fetchPlaces();
  }, []);

  return (
    <div className="home-container">
      <h1>Descubre donde <span className='highlight-text'>caer</span></h1>
      <div className="place-list">
        {places.map(place => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>
    </div>
  );
};

export default Home;