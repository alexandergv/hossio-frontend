import React from 'react';
import axios from 'axios';
import config from '../../config';

const SideNav = ({ setSelectedSection }) => {
  const onLogout = (e) => {
    e.preventDefault();
    console.log(e);
    // Elimina la cookie de autenticación
   axios.post(`${config.apiUrl}/auth/logout`,{}, { withCredentials: true }).then((response) => {
    // Redirige al usuario a la página de inicio
       window.location.href = '/';
   })
}


  return (
    <nav className="sidenav">
      <ul>
      <li><a href="#dashboard" onClick={() => setSelectedSection('dashboard')}>Dashboard</a></li>
      <li><a href="#profile" onClick={() => setSelectedSection('profile')}>Perfil del Negocio</a></li>
      <li><a href="#reviews" onClick={() => setSelectedSection('reviews')}>Gesti&oacute;n de Rese&ntilde;as</a></li>
      <li><a href="#events" onClick={() => setSelectedSection('events')}>Eventos y Promociones</a></li>
      <li><a href="#gallery" onClick={() => setSelectedSection('gallery')}>Galer&iacute;a de Im&aacute;genes</a></li>
      <li><a href="#messages" onClick={() => setSelectedSection('messages')}>Mensajes</a></li>
      <li><a href="#analytics" onClick={() => setSelectedSection('analytics')}>An&aacute;lisis y Reportes</a></li>
      <li><a href="#settings" onClick={() => setSelectedSection('settings')}>Configuraci&oacute;n de Cuenta</a></li>
      <li><a href="#help" onClick={() => setSelectedSection('help')}>Ayuda y Soporte</a></li>
      <li><a href="#" onClick={onLogout}>Cerrar Sesi&oacute;n</a></li>
      </ul>
    </nav>
  );
};

export default SideNav;