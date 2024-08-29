import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { Menu, Dropdown, Button,Space } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';


const UserProfile = ({ userAuthenticated, onLogout }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  
  const handleMenuClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    setIsDropdownVisible(false);
    onLogout();
  };
  const items = [
    {
      key: 'perfil',
      label: (
        <a href='/profile'>
          <FontAwesomeIcon icon={faUser} /> Perfil
        </a>
      ),
    },
    {
      key: 'logout',
      label: (
        <div onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar Sesión
        </div>
      ),
    },
  ];

  return (
    <div>
      {userAuthenticated && (
    <Dropdown menu={{ items, }} trigger={['click']}>
        <Button type="link" className="user-profile-button"
         icon={<FontAwesomeIcon icon={faUserCircle} className="user-icon" />} />
    </Dropdown>
      )}
    </div>
  );
};

export default UserProfile;
