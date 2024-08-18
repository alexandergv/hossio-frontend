import React, { useState } from 'react';

const UserSideNav = ({ setSelectedSection }) => {
  return (
    <div className="user-sidenav">
      <ul>
        <li onClick={() => setSelectedSection('profile')}>Perfil</li>
        <li onClick={() => setSelectedSection('settings')}>Configuración</li>
        <li onClick={() => setSelectedSection('favorites')}>Lugares Destacados</li>
      </ul>
    </div>
  );
};

export default UserSideNav;
