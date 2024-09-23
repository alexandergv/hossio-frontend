import React, { useState, useEffect } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import axiosInstance from 'services/axiosConfig'
import './Home.css';
import PlaceCardSkeleton from 'components/PlaceCard/PlaceCardSkeleton';
import EventsModal from './EventsModal/EventsModal';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = ({userId = ""}) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastEvents, setLastEvents] = useState([]);


  const fetchLastEvents = async () => {
    const lastEvents = (await axiosInstance.get('/events/latest')).data;
    setLastEvents(lastEvents);
  }

  const openModal = async () => {
    await fetchLastEvents();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const fetchNearbyPlaces = async (latitude, longitude, userId) => {
    try {
      const response = await axiosInstance.get('/places/nearby', {
        params: {
          latitude,
          longitude,
          userId
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
    if (navigator.geolocation && false) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position);
          setLocation({ latitude, longitude });
          // fetchNearbyPlaces(latitude, longitude);
          fetchPlaces();
        },
        (error) => {
          fetchPlaces();
          console.error("Error getting location", error);
        }
      );
    } else {
      fetchNearbyPlaces(18.48781363306469, -69.87735249800618,userId);
    }
  }, []);

  return (
    <div className="home-container">
      <h1>Descubre donde <span className='highlight-text'>caer</span></h1>
      <div className="action-buttons-container">
        {!loading ?
        (<button className="events-button" onClick={openModal}>
        <FontAwesomeIcon color='#48D1B2' icon={faCalendarAlt} />
        <span> Eventos</span>
      </button>)
      : (
        <button className="events-button">
          <span>...</span>
        </button>
      ) 
        }

      </div>
      <hr />
      <div className="place-list">
        { loading ?
        (Array(10).fill(0).map((x,index) => <PlaceCardSkeleton key={index} />) )
        : (places.map(place => (
          <PlaceCard isFavorited={place.isFavorite} userId={userId} key={place._id} place={place} />
            )
          )
        )
        }
      </div>
      {isModalOpen && <EventsModal  events={lastEvents} onClose={closeModal} />}
    </div>
  );
};

export default Home;