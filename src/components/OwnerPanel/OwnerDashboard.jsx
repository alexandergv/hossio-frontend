import React, { useState } from 'react';
import SideNav from './SideNav';
import DashboardContent from './DashboardContent/DashboardContent';
import './OwnerPanelStyles.css';
import ProfileContent from './ProfileContent';
import ReviewsContent from './ReviewsContent';
import EventsContent from './EventsContent';
import GalleryContent from './GalleryContent';
import MessagesContent from './MessagesContent';
import AnalyticsContent from './AnalyticsContent';
import SettingsContent from './SettingsContent';
import HelpContent from './HelpContent';

const OwnerDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('dashboard');

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'profile':
        return <ProfileContent />;
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
      <SideNav setSelectedSection={setSelectedSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default OwnerDashboard;