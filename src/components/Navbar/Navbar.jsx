import './Navbar.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSignOutAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from 'services/axiosConfig';
import hossioLogo from '../../Hossio_logo_truquoise_blank.svg';
import Cookies from 'js-cookie';
import UserMenu from './UserMenu/UserMenu';
import { setAuthStatus } from 'services/authService';

const NavBar = ({ userAuthenticated, user }) => {
  setAuthStatus(userAuthenticated);

  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if(isMenuOpen) {
      setIsSearchOpen(false);
    }
  },[isMenuOpen])

  
  useEffect(() => {
    if(isSearchOpen) {
      setIsMenuOpen(false);
    }
  },[isSearchOpen])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/SearchResults?query=${searchTerm}`;
  };

  const onLogout = () => {
    axiosInstance.post(`/auth/logout`, {}, { withCredentials: true }).then((response) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error(`Fallo a la hora de iniciar sesion : ${response.statusText}`);
      }

      // Set the token in a cookie
      Cookies.remove('auth_token');

      window.location.reload();
    });
  };

  return (
    <nav className="navbar">
      <div className={`navbar-left ${isSearchOpen ? 'search-open' : ''}`}>
        <a href="/">
          <img src={hossioLogo.src} alt="Hossio Logo" className="navbar-logo" />
          <h1 className="navbar-title">Hoss<span className='highlight-text'>i</span>o</h1>
        </a>
      </div>
      <div className={`navbar-center ${isSearchOpen ? 'search-open' : ''}`}>
        <form onSubmit={handleSearchSubmit} className={`search-form ${isSearchOpen ? 'open' : ''}`}>
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
        <button className="search-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)}>
          <FontAwesomeIcon icon={isSearchOpen ? faTimes : faSearch} />
        </button>
      </div>
      <div className={`navbar-right ${isSearchOpen ? 'search-open' : ''}`}>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
        <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
          {(user == null) && <a href="/loginOwners" className="btn-reverse">Para propietarios</a>}
          {!userAuthenticated && (
            <>
              <a href="/login" className="navbar-link">Iniciar sesión</a>
              <a href="/login?register" className="navbar-link">Registrarse</a>
            </>
          )}
          {userAuthenticated && <p>Bienvenido/a, {user.username}!</p>}
          <UserMenu userAuthenticated={userAuthenticated} onLogout={onLogout}/>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
