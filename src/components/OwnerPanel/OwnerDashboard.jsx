import React, { useState } from 'react';
import SideNav from './SideNav';
import DashboardContent from './DashboardContent/DashboardContent';
import './OwnerPanelStyles.css';
import BusinessProfile from './BusinessProfile/BusinessProfile';
import ReviewsContent from './ReviewsContent';
import EventsContent from './EventsContent/EventsContent';
import GalleryContent from './GalleryContent';
import MessagesContent from './MessagesContent';
import AnalyticsContent from './AnalyticsContent';
import SettingsContent from './SettingsContent';
import HelpContent from './HelpContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const OwnerDashboard = ({user}) => {
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const renderContent = () => {

    switch (selectedSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'profile':
        return <BusinessProfile userId={user.sub}/>;
      case 'reviews':
        return <ReviewsContent />;
      case 'events':
        return <EventsContent />;
      case 'gallery':
        return <GalleryContent />;
      case 'messages':
        return <MessagesContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'settings':
        return <SettingsContent />;
      case 'help':
        return <HelpContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="owner-dashboard">
      <button className={`hamburger-menu ${isSideNavOpen ? 'sidenav-open' : ''}`} onClick={() => setIsSideNavOpen(!isSideNavOpen)}>
          <FontAwesomeIcon icon={isSideNavOpen ? faTimes : faBars} />
      </button>
      <SideNav isOpen={isSideNavOpen} setSelectedSection={setSelectedSection} />
      <div className={`content ${isSideNavOpen ? 'content-shift' : ''}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerDashboard;