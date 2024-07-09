import './SearchResultsPage.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {placesData as searchResults } from '../../data/places';
import PlaceCard from '../PlaceCard/PlaceCard';


const SearchResultsPage = ({ query }) => {
    const [filteredPlaces, setFilteredPlaces] = useState([]);
  
    useEffect(() => {
        
    let filtered = searchResults.filter(place => 
        place.name.toLowerCase().includes(query.toLowerCase())
      );

     if(query == '') {
        filtered = [];
     }


      setFilteredPlaces(filtered);
    }, [query]);
  
    return (
      <div className="search-results-container">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
        {filteredPlaces.length == 0 && (
            <>No se encontraron lugares para esta busqueda.</>
        )
        }
      </div>
    );
  };

  export default SearchResultsPage;