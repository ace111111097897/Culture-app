import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import UniqueHeader from './UniqueHeader';
import EnhancedFullSiteMenu from './EnhancedFullSiteMenu';
import AchievementsSection from './AchievementsSection';
import GlobalCubbletonAI from './GlobalCubbletonAI';
import CubbletonAITour from './CubbletonAITour';
import SubscriptionSection from './SubscriptionSection';
import FunctionalCubbletonAI from './FunctionalCubbletonAI';
import FunctionalNotifications from './FunctionalNotifications';
import DiscoverPage from './pages/DiscoverPage';
import ConnectionsPage from './pages/ConnectionsPage';
import EventsPage from './pages/EventsPage';
import MessagesPage from './pages/MessagesPage';
import MatchesPage from './pages/MatchesPage';
import SettingsPage from './pages/SettingsPage';
import InteractiveHomeSection from './InteractiveHomeSection';
import InteractiveGamesSection from './InteractiveGamesSection';
import InteractiveCubblesSection from './InteractiveCubblesSection';
import InteractiveMediaSection from './InteractiveMediaSection';
import InteractiveProfileSection from './InteractiveProfileSection';

interface Props {
  username: string;
  userProfile?: any;
  onLogout: () => void;
}

const UpdatedUniqueHomeScreen: React.FC<Props> = ({ username, userProfile, onLogout }) => {
  const [activeSection, setActiveSection] = useState('cubbles');
  const [showAITour, setShowAITour] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isMobile } = useResponsive();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <InteractiveHomeSection username={username} />;
      case 'discover':
        return <DiscoverPage />;
      case 'matches':
        return <MatchesPage />;
      case 'messages':
        return <MessagesPage />;
      case 'connections':
        return <ConnectionsPage />;
      case 'games':
        return <InteractiveGamesSection />;
      case 'events':
        return <EventsPage />;
      case 'community':
        return <InteractiveCubblesSection />;
      case 'ai':
        return <FunctionalCubbletonAI username={username} />;
      case 'achievements':
        return <AchievementsSection />;
      case 'notifications':
        return <FunctionalNotifications onNotificationUpdate={setNotificationCount} />;
      case 'profile':
        return <InteractiveProfileSection userProfile={userProfile} />;
      case 'settings':
        return <SettingsPage />;
      case 'premium':
        return <SubscriptionSection />;
      case 'cubbles':
        return (
          <div className="space-y-6">
            <InteractiveCubblesSection />
            <InteractiveMediaSection />
          </div>
        );
      case 'media':
        return <InteractiveMediaSection />;
      default:
        return <InteractiveHomeSection username={username} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 safe-area-inset">
      <style dangerouslySetInnerHTML={{
        __html: `
          .safe-area-inset {
            padding-top: env(safe-area-inset-top);
            padding-bottom: env(safe-area-inset-bottom);
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        `
      }} />
      <UniqueHeader 
        username={username}
        onLogout={onLogout}
        onOpenAITour={() => setShowAITour(true)}
        notificationCount={notificationCount}
        onNotificationsClick={() => setActiveSection('notifications')}
        onMenuClick={isMobile ? () => setShowMobileMenu(!showMobileMenu) : undefined}
      />
      
      <div className="flex">
        {!isMobile && (
          <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/90 backdrop-blur-sm border-r border-teal-100 overflow-y-auto">
            <EnhancedFullSiteMenu 
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              notificationCount={notificationCount}
              username={username}
            />
          </div>
        )}
        
        {isMobile && showMobileMenu && (
          <div className="fixed inset-0 top-16 bg-black/50 z-40" onClick={() => setShowMobileMenu(false)}>
            <div className="w-80 bg-white h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <EnhancedFullSiteMenu 
                activeSection={activeSection}
                onSectionChange={handleSectionChange}
                notificationCount={notificationCount}
              />
            </div>
          </div>
        )}
        
        <main className={`flex-1 ${!isMobile ? 'ml-64' : ''} pt-4 pb-20 px-2 sm:px-6`}>
          <div className={`${isMobile ? 'p-2' : 'p-6'}`}>
            {renderContent()}
          </div>
        </main>
      </div>

      <GlobalCubbletonAI />

      {showAITour && (
        <CubbletonAITour onClose={() => setShowAITour(false)} />
      )}

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-teal-100 z-50">
          <EnhancedFullSiteMenu 
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            isMobile={true}
            notificationCount={notificationCount}
          />
        </div>
      )}
    </div>
  );
};

export default UpdatedUniqueHomeScreen;