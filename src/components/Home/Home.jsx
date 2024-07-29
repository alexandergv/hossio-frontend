import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import axiosInstance from 'services/axiosConfig'
import './Home.css';
import PlaceCardSkeleton from 'components/PlaceCard/PlaceCardSkeleton';

const Home = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axiosInstance.get('/places/nearby', {
        params: {
          latitude,
          longitude,
        },
      });
      setPlaces(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching nearby places", error);
    }
  };

    const fetchPlaces = async () => {
      try {
        const response = await axiosInstance.get(`/places/GetAll`);
        setPlaces(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          setLocation({ latitude, longitude });
          // fetchNearbyPlaces(latitude, longitude);
          fetchPlaces();
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

  }, []);

  return (
    <div className="home-container">
      <h1>Descubre donde <span className='highlight-text'>caer</span></h1>
      <div className="place-list">
        { loading ?
        (Array(10).fill(0).map((x) => <PlaceCardSkeleton />) )
        : (places.map(place => (
          <PlaceCard key={place._id} place={place} />
            )
          )
        )
        }
      </div>
    </div>
  );
};

export default Home;