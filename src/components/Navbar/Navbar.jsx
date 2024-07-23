import './Navbar.css';
import {placesData as places } from '../../data/places';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from 'services/axiosConfig'
import config from '../../config';

const NavBar = ({userAuthenticated, user}) => {
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

  const onLogout = () => {
       // Elimina la cookie de autenticación
      axiosInstance.post(`/auth/logout`,{}, { withCredentials: true }).then((response) => {
       // Redirige al usuario a la página de inicio
          window.location.href = '/';
      })
  }

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
        {(user == null)  && <a href="/loginOwners" className="btn-reverse">Para propietarios</a>}
        {!userAuthenticated && (<><a href="/login" className="navbar-link">Iniciar sesión</a>
        <a href="/login" className="navbar-link">Registrarse</a></>)}
        {userAuthenticated && (<p>Bienvenido, {user.username}!</p>)}
        {userAuthenticated && (<button className="logout-button" onClick={onLogout}>
      <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
    </button>)}
      </div>
    </nav>
  );
};

export default NavBar;