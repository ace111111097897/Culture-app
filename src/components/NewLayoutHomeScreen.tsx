import React, { useState, useEffect } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import UniqueHeader from './UniqueHeader';
import ReformedLayout from './ReformedLayout';
import GlobalCultureAI from './GlobalCultureAI';
import CultureAITour from './CultureAITour';
import HomeSection from './HomeSection';
import DiscoverSection from './DiscoverSection';
import MatchesSection from './MatchesSection';
import FriendsSection from './FriendsSection';
import MessagingSection from './MessagingSection';
import GamesSection from './GamesSection';
import NewsSection from './NewsSection';
import CubblesSection from './CubblesSection';
import EventsSection from './EventsSection';
import ExploreSection from './ExploreSection';
import CommunitySection from './CommunitySection';
import ProfileSection from './ProfileSection';
import SafetySection from './SafetySection';
import EnhancedSubscriptionSection from './EnhancedSubscriptionSection';
import PreferencesScreen from './PreferencesScreen';
import TipsSection from './TipsSection';
import FeedbackSection from './FeedbackSection';
import { Crown, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewLayoutHomeScreenProps {
  username: string;
  onLogout: () => void;
}

const NewLayoutHomeScreen: React.FC<NewLayoutHomeScreenProps> = ({ 
  username, 
  onLogout 
}) => {
  const [activeSection, setActiveSection] = useState('home');
  const [aiVisible, setAiVisible] = useState(false);
  const [tourVisible, setTourVisible] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [currentUsername, setCurrentUsername] = useState(username);
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);

  useEffect(() => {
    const hasVisited = localStorage.getItem('culture_has_visited');
    if (!hasVisited) {
      setIsFirstTime(true);
      setTourVisible(true);
    }
  }, []);

  const handleTourClose = () => {
    setTourVisible(false);
    localStorage.setItem('culture_has_visited', 'true');
  };

  const handleTourSkip = () => {
    localStorage.setItem('culture_tour_skipped', 'true');
  };

  const handleCreateCubble = () => {
    console.log('Creating new cubble...');
  };

  const handleCubbleClick = (cubble: any) => {
    console.log('Opening cubble:', cubble.id);
  };

  const handleProfileNameUpdate = (newName: string) => {
    setCurrentUsername(newName);
  };

  const handleHomeClick = () => {
    setActiveSection('home');
  };

  const handleNotificationClick = () => {
    setNotificationsActive(!notificationsActive);
    if (notificationCount > 0) {
      setNotificationCount(0);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home': return <HomeSection />;
      case 'discover': return <DiscoverSection />;
      case 'matches': return <MatchesSection />;
      case 'friends': return <FriendsSection />;
      case 'messages': return <MessagingSection />;
      case 'games': return <GamesSection />;
      case 'news': return <NewsSection />;
      case 'cubbles': return <CubblesSection onCubbleClick={handleCubbleClick} onCreateCubble={handleCreateCubble} />;
      case 'events': return <EventsSection />;
      case 'explore': return <ExploreSection />;
      case 'community': return <CommunitySection />;
      case 'tips': return <TipsSection />;
      case 'safety': return <SafetySection />;
      case 'feedback': return <FeedbackSection />;
      case 'preferences': 
        return (
          <PreferencesScreen 
            username={currentUsername} 
            onComplete={() => setActiveSection('profile')}
            onProfileNameUpdate={handleProfileNameUpdate}
          />
        );
      case 'subscription':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                  Premium Plans
                </h1>
                <p className="text-gray-600 text-lg">Unlock the full Culture experience</p>
              </div>
            </div>
            <EnhancedSubscriptionSection currentTier="free" />
          </div>
        );
      case 'profile': 
        return (
          <ProfileSection 
            username={currentUsername} 
            onLogout={onLogout}
            onProfileNameUpdate={handleProfileNameUpdate}
          />
        );
      default: return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50">
      {/* Enhanced Header with Notifications */}
      <div className="bg-white/95 backdrop-blur-lg border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <UniqueHeader 
              username={currentUsername} 
              onCultureAI={() => setAiVisible(true)}
              onStartTour={() => setTourVisible(true)}
              onHomeClick={handleHomeClick}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
            
            {/* Active Notifications Bell */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className={`relative p-2 rounded-full transition-all duration-200 ${
                  notificationsActive 
                    ? 'bg-purple-100 text-purple-600 shadow-lg' 
                    : 'hover:bg-purple-50 text-gray-600'
                }`}
                onClick={handleNotificationClick}
              >
                <Bell className={`h-5 w-5 ${notificationsActive ? 'animate-pulse' : ''}`} />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Tab Navigation */}
      <div className="bg-white/90 backdrop-blur-lg border-b border-purple-200 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <Button 
              onClick={() => setActiveSection('matches')}
              className={`whitespace-nowrap px-6 py-2 rounded-xl font-semibold transition-all ${
                activeSection === 'matches'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-pink-50 border border-pink-200'
              }`}
            >
              ✨ Start Matching
            </Button>
            <Button 
              onClick={() => setActiveSection('cubbles')}
              className={`whitespace-nowrap px-6 py-2 rounded-xl font-semibold transition-all ${
                activeSection === 'cubbles'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-purple-50 border border-purple-200'
              }`}
            >
              🎭 Create Cubble
            </Button>
            <Button 
              onClick={() => setActiveSection('events')}
              className={`whitespace-nowrap px-6 py-2 rounded-xl font-semibold transition-all ${
                activeSection === 'events'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-blue-50 border border-blue-200'
              }`}
            >
              🎪 Join Events
            </Button>
            <Button 
              onClick={() => setActiveSection('explore')}
              className={`whitespace-nowrap px-6 py-2 rounded-xl font-semibold transition-all ${
                activeSection === 'explore'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white/80 text-gray-700 hover:bg-green-50 border border-green-200'
              }`}
            >
              🌍 Explore Cultures
            </Button>
          </div>
        </div>
      </div>

      {/* Premium Button */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 px-4 py-2">
        <div className="max-w-7xl mx-auto">
          <Button 
            onClick={() => setActiveSection('subscription')}
            className="w-full md:w-auto bg-white/20 backdrop-blur text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-white/30 transition-all duration-200"
          >
            <Crown className="h-4 w-4 mr-2" />
            Premium - Upgrade Now
          </Button>
        </div>
      </div>

      <ReformedLayout 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      >
        {renderActiveSection()}
      </ReformedLayout>
      
      <GlobalCultureAI 
        currentSection={activeSection} 
        isVisible={aiVisible} 
        onClose={() => setAiVisible(false)} 
      />
      <CultureAITour
        isVisible={tourVisible}
        onClose={handleTourClose}
        onSkip={handleTourSkip}
        isFirstTime={isFirstTime}
      />
    </div>
  );
};

export default NewLayoutHomeScreen;