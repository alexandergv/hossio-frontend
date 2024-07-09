import React from 'react';
import './Navbar.css';
import {placesData as places } from '../../data/places';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const filteredPlaces = places.filter(place => 
      place.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Redirigir a la página de resultados con los lugares filtrados
    // Puedes usar una redirección o una actualización de estado global para manejar los resultados
    window.location.href = `/SearchResults?query=${searchTerm}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/"><h1 className="navbar-title">Hoss<span className='highlight-text'>i</span>o</h1></a>
      </div>
      <div className="navbar-center">
        <form onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            className="navbar-search" 
            placeholder="Buscar lugares de ocio..." 
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="navbar-search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="navbar-right">
        <a href="/owners" className="btn-reverse">Para propietarios</a>
        <a href="/login" className="navbar-link">Iniciar sesión</a>
        <a href="/login" className="navbar-link">Registrarse</a>
      </div>
    </nav>
  );
};

export default NavBar;