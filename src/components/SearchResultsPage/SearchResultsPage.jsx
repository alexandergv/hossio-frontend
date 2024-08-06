import './SearchResultsPage.css';
import React from 'react';
import { useEffect, useState } from 'react';
import PlaceCard from '../PlaceCard/PlaceCard';
import axiosInstance from 'services/axiosConfig';
import PlaceCardSkeleton from 'components/PlaceCard/PlaceCardSkeleton';
import { showErrorAlert } from 'utils/alerts';

const SearchResultsPage = ({ query }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const searchPlaces = async (query) => {
      try {
        const response = await axiosInstance.get(`/places/search?q=${query}`);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        showErrorAlert(error);
        console.error('Error searching for places:', error);
      }
    };

    useEffect(() => {
      searchPlaces(query) 
    }, [query]);
  
    return (
      <div className="search-results-container">
        { loading ?
        (Array(5).fill(0).map((x,index) => <PlaceCardSkeleton key={index} />) )
        :
          (searchResults.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))
        )}
        {searchResults.length == 0 && (
            <>No se encontraron lugares para esta busqueda.</>
        )
        }
      </div>
    );
  };

  export default SearchResultsPage;