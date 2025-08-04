import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import CleanMainInterface from './CleanMainInterface';
import MobileNavigation from './MobileNavigation';
import GlobalKandiAI from './GlobalKandiAI';
import ExpandedCulturalInterests from './ExpandedCulturalInterests';
import DiscoverSection from './DiscoverSection';
import MatchesSection from './MatchesSection';
import FriendsSection from './FriendsSection';
import MessagingSection from './MessagingSection';
import GamesSection from './GamesSection';
import NewsSection from './NewsSection';
import CultureBubbles from './CultureBubbles';
import EnhancedFakeUserManager from './EnhancedFakeUserManager';
import FakeMessagingSystem from './FakeMessagingSystem';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface UpdatedOptimizedCleanHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile?: () => void;
}

const UpdatedOptimizedCleanHomeScreen: React.FC<UpdatedOptimizedCleanHomeScreenProps> = ({ 
  username, 
  onLogout 
}) => {
  const [activeSection, setActiveSection] = useState('feed');
  const [kandiVisible, setKandiVisible] = useState(false);
  const { isMobile } = useResponsive();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'discover':
        return <DiscoverSection />;
      case 'matches':
        return <MatchesSection />;
      case 'friends':
        return <FriendsSection />;
      case 'messages':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Messages</h1>
              <p className="text-gray-600">Chat with your connections and explore fake conversations</p>
            </div>
            <FakeMessagingSystem />
          </div>
        );
      case 'games':
        return <GamesSection />;
      case 'news':
        return <NewsSection />;
      case 'culture-bubbles':
        return (
          <div className="space-y-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Culture Bubbles</h1>
              <p className="text-gray-600">Share your cultural moments with the community</p>
            </div>
            <CultureBubbles 
              bubbles={[]} 
              onBubbleClick={(bubble) => console.log('Bubble clicked:', bubble)} 
            />
          </div>
        );
      case 'events':
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Cultural Events</h2>
              <p className="text-gray-600">Discover and join cultural events in your area.</p>
            </CardContent>
          </Card>
        );
      case 'explore':
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Explore Cultures</h2>
              <p className="text-gray-600">Learn about different cultures around the world.</p>
            </CardContent>
          </Card>
        );
      case 'community':
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Community Hub</h2>
              <p className="text-gray-600">Connect with cultural communities and forums.</p>
            </CardContent>
          </Card>
        );
      case 'preferences':
        return <ExpandedCulturalInterests />;
      case 'kandi':
        return (
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Kandi AI - Your Cultural Companion</h2>
              <p className="text-gray-600 mb-4">
                I'm Kandi, the brain of this app! I can read messages, know every profile, 
                and help you understand different cultures. Ask me anything!
              </p>
              <Button onClick={() => setKandiVisible(true)} className="bg-purple-600 hover:bg-purple-700">
                Chat with Kandi AI
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return (
          <CleanMainInterface 
            username={username}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        );
    }
  };

  if (activeSection === 'feed') {
    return (
      <div className={`min-h-screen ${isMobile ? 'pb-16' : ''}`}>
        <CleanMainInterface 
          username={username}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <MobileNavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <GlobalKandiAI 
          currentSection={activeSection}
          isVisible={kandiVisible}
          onClose={() => setKandiVisible(false)}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-16' : 'pl-64'}`}>
      <div className="max-w-6xl mx-auto px-4 py-6">
        {renderActiveSection()}
      </div>
      
      <MobileNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <GlobalKandiAI 
        currentSection={activeSection}
        isVisible={kandiVisible}
        onClose={() => setKandiVisible(false)}
      />
    </div>
  );
};

export default UpdatedOptimizedCleanHomeScreen;