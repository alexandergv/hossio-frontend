import React from 'react';
import './Navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/"><h1 className="navbar-title">Hoss<span className='highlight-text'>i</span>o</h1></a>
      </div>
      <div className="navbar-center">
        <input type="text" className="navbar-search" placeholder="Buscar lugares de ocio..." />
      </div>
      <div className="navbar-right">
        <a href="owners" className="btn-reverse">Para propietarios</a>
        <a href="#login" className="navbar-link">Iniciar sesión</a>
        <a href="#register" className="navbar-link">Registrarse</a>
      </div>
    </nav>
  );
};

export default NavBar;