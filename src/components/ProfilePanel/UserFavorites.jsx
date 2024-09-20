
import axiosInstance from 'services/axiosConfig'
import { useEffect, useState } from 'react';

const UserFavorites = () => {
  const [favoritePlaces, setFavoritePlaces ] = useState();

  const fetchFavoriteplaces = () => {

  }

  useEffect(() => {

  },[])

  const places = [];
  return (
      <div>
        <h2>Lugares Destacados</h2>
        <div className="place-list">
        { loading ?
        (Array(10).fill(0).map((x,index) => <PlaceCardSkeleton key={index} />) )
        : (places.map(place => (
          <PlaceCard key={place._id} place={place} />
            )
          )
        )
        }
      </div> </div>
    );
  };
  
  export default UserFavorites;
  