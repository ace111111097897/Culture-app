import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import ResponsiveLayout from './ResponsiveLayout';
import ResponsiveNavigation from './ResponsiveNavigation';
import ResponsiveHeader from './ResponsiveHeader';
import GlobalCultureAI from './GlobalCultureAI';
import HomeSection from './HomeSection';
import DiscoverSection from './DiscoverSection';
import MatchesSection from './MatchesSection';
import FriendsSection from './FriendsSection';
import MessagingSection from './MessagingSection';
import GamesSection from './GamesSection';
import NewsSection from './NewsSection';
import CultureBubbles from './CultureBubbles';
import EventsSection from './EventsSection';
import ExploreSection from './ExploreSection';

import ProfileSection from './ProfileSection';
import SubscriptionSection from './SubscriptionSection';
import { Sparkles, CreditCard } from 'lucide-react';

interface CleanResponsiveHomeScreenProps {
  username: string;
  onLogout: () => void;
}

const CleanResponsiveHomeScreen: React.FC<CleanResponsiveHomeScreenProps> = ({ 
  username, 
  onLogout 
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [aiVisible, setAiVisible] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection />;
      case 'discover': return <DiscoverSection />;
      case 'matches': return <MatchesSection />;
      case 'friends': return <FriendsSection />;
      case 'messages': return <MessagingSection />;
      case 'games': return <GamesSection />;
      case 'news': return <NewsSection />;
      case 'culture-bubbles':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Culture Bubbles</h1>
                <p className="text-gray-600">Share your cultural moments</p>
              </div>
            </div>
            <CultureBubbles bubbles={[]} onBubbleClick={() => {}} />
          </div>
        );
      case 'events': return <EventsSection />;
      case 'explore': return <ExploreSection />;

      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Subscription Plans</h1>
                <p className="text-gray-600">Choose the perfect plan for your cultural journey</p>
              </div>
            </div>
            <SubscriptionSection currentTier="free" />
          </div>
        );
      case 'profile': return <ProfileSection username={username} onLogout={onLogout} />;
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <ResponsiveHeader username={username} onCultureAI={() => setAiVisible(true)} />
      <ResponsiveNavigation activeSection={activeSection} onSectionChange={setActiveSection} onLogout={onLogout} />
      <ResponsiveLayout withNavigation={true}>{renderActiveSection()}</ResponsiveLayout>
      <GlobalCultureAI currentSection={activeSection} isVisible={aiVisible} onClose={() => setAiVisible(false)} />
    </div>
  );
};

export default CleanResponsiveHomeScreen;