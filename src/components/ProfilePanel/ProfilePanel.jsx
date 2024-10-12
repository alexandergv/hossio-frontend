import React, { useState } from 'react';
import UserSideNav from './UserSideNav';
import UserProfile from './UserProfile';
import UserSettings from './UserSettings';
import UserFavorites from './UserFavorites';
import './ProfilePanel.css';

const ProfilePanel = ({userId}) => {
  const [selectedSection, setSelectedSection] = useState('profile');

  const renderContent = () => {
    switch (selectedSection) {
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <UserSettings />;
      case 'favorites':
        return <UserFavorites userId={userId} />;
      default:
        return <UserProfile />;
    }
  };

  return (
    <div className="user-dashboard">
      <UserSideNav setSelectedSection={setSelectedSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProfilePanel;