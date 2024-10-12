
import axiosInstance from 'services/axiosConfig'
import { useEffect, useState } from 'react';
import PlaceCard from 'components/PlaceCard/PlaceCard';
import PlaceCardSkeleton from 'components/PlaceCard/PlaceCardSkeleton';

const UserFavorites = ({userId}) => {
  const [favoritePlaces, setFavoritePlaces ] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavoritePlaces = async (userId) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/favorite-places`);
      setFavoritePlaces(response.data); // Assuming you have a state called setFavoritePlaces
      setLoading(false);
    } catch (error) {
      console.error("Error fetching favorite places", error);
    }
  };

  useEffect(() => {
    fetchFavoritePlaces(userId);
  },[])

  return (
      <div>
        <h2>Lugares Destacados</h2>
        <div className="place-list">
        { loading ?
        (Array(10).fill(0).map((x,index) => <PlaceCardSkeleton key={index} />) )
        : (favoritePlaces.map(place => (
          <PlaceCard isFavorited={true} key={place._id} place={place} />
            )
          )
        )
        }
      </div> </div>
    );
  };
  
  export default UserFavorites;
  