import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import UniqueHeader from './UniqueHeader';
import UpdatedFullSiteMenu from './UpdatedFullSiteMenu';
import EnhancedCubblesSection from './EnhancedCubblesSection';
import AchievementsSection from './AchievementsSection';
import UpdatedProfileSection from './UpdatedProfileSection';
import GlobalCubbletonAI from './GlobalCubbletonAI';
import CubbletonAITour from './CubbletonAITour';
import PersonalizedFeed from './PersonalizedFeed';
import MatchesSection from './MatchesSection';
import MessagingSection from './MessagingSection';

interface Props {
  username: string;
  onLogout: () => void;
}

const UniqueHomeScreen: React.FC<Props> = ({ username, onLogout }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showAITour, setShowAITour] = useState(false);
  const { isMobile } = useResponsive();

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <PersonalizedFeed username={username} />;
      case 'cubbles':
        return <EnhancedCubblesSection />;
      case 'matches':
        return <MatchesSection />;
      case 'messages':
        return <MessagingSection />;
      case 'profile':
        return <UpdatedProfileSection username={username} />;
      case 'achievements':
        return <AchievementsSection />;
      default:
        return <PersonalizedFeed username={username} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <UniqueHeader 
        username={username}
        onLogout={onLogout}
        onOpenAITour={() => setShowAITour(true)}
      />
      
      <div className="flex">
        {!isMobile && (
          <div className="w-64 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-sm border-r border-purple-100">
            <UpdatedFullSiteMenu 
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        )}
        
        <main className={`flex-1 ${!isMobile ? 'ml-64' : ''} pt-16`}>
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      <GlobalCubbletonAI />

      {showAITour && (
        <CubbletonAITour onClose={() => setShowAITour(false)} />
      )}

      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 p-2">
          <UpdatedFullSiteMenu 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            isMobile={true}
          />
        </div>
      )}
    </div>
  );
};

export default UniqueHomeScreen;