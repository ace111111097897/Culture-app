import React, { useState } from 'react';
import { Bell, Menu, Search, Plus, Calendar, Globe, Users, MessageCircle, Settings, User, HelpCircle, Shield, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import UpdatedCubbleBrandLogo from './UpdatedCubbleBrandLogo';
import FullSiteMenu from './FullSiteMenu';
import CubblesSection from './CubblesSection';
import TipsSection from './TipsSection';
import SafetySection from './SafetySection';
import FeedbackSection from './FeedbackSection';
import { EnhancedCubbletonAI } from './EnhancedCubbletonAI';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';

import GamesPage from './pages/GamesPage';
import ProfilePage from './pages/ProfilePage';
import MessagesPage from './pages/MessagesPage';
import SettingsPage from './pages/SettingsPage';
import FriendsPage from './pages/FriendsPage';

interface CubbleHomeScreenProps {
  username: string;
  onLogout: () => void;
}

const CubbleHomeScreen: React.FC<CubbleHomeScreenProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSectionChange = (section: string) => {
    setActiveTab(section);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (notificationCount > 0) {
      setNotificationCount(0);
    }
  };

  const handleLogoClick = () => {
    setActiveTab('home');
  };

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverPage />;
      case 'matches':
        return <MatchesPage />;

      case 'games':
        return <GamesPage />;
      case 'profile':
        return <ProfilePage />;
      case 'messages':
        return <MessagesPage />;
      case 'settings':
        return <SettingsPage />;
      case 'friends':
        return <FriendsPage />;
      case 'cubbleton':
        return <EnhancedCubbletonAI />;
      case 'matching':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Start Matching
            </h2>
            <p className="text-gray-600 mb-4">Discover people who share your cultural interests and values.</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Find Matches
            </Button>
          </div>
        );
      case 'create':
        return <CubblesSection />;
      case 'events':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Events
            </h2>
            <p className="text-gray-600 mb-4">Participate in cultural events and activities.</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Browse Events
            </Button>
          </div>
        );
      case 'explore':
        return (
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explore Cultures
            </h2>
            <p className="text-gray-600 mb-4">Learn about different cultures and traditions.</p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Start Exploring
            </Button>
          </div>
        );
      case 'tips':
        return <TipsSection />;
      case 'safety':
        return <SafetySection />;
      case 'feedback':
        return <FeedbackSection />;
      default:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">Welcome to Cubble, {username}!</h2>
              <p className="text-gray-600">Connect with people through cultural bubbles and shared experiences.</p>
            </div>
            <CubblesSection />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <UpdatedCubbleBrandLogo size="md" onClick={handleLogoClick} />
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNotificationClick}
                  className="relative"
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border p-4 z-50">
                    <h3 className="font-semibold mb-3">Notifications</h3>
                    <div className="space-y-2">
                      <div className="p-2 bg-purple-50 rounded text-sm">
                        New match found! Check your matches.
                      </div>
                      <div className="p-2 bg-pink-50 rounded text-sm">
                        Someone joined your cultural bubble.
                      </div>
                      <div className="p-2 bg-orange-50 rounded text-sm">
                        New cultural event near you.
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMenu(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        {renderActiveSection()}
      </main>

      {/* Enhanced Cubbleton AI Widget */}
      <EnhancedCubbletonAI />

      {/* Full Site Menu */}
      <FullSiteMenu
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        activeSection={activeTab}
        onSectionChange={handleSectionChange}
        onLogout={onLogout}
      />
    </div>
  );
};

export default CubbleHomeScreen;