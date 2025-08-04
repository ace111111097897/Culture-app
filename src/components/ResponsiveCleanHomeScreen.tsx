import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, User, LogOut, Heart, MessageCircle, Share2, Calendar, Users, Sparkles, Home, Menu, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useResponsive } from '@/hooks/use-responsive';
import CultureBubbles from './CultureBubbles';
import DiscoverSection from './DiscoverSection';
import MatchesSection from './MatchesSection';
import FriendsSection from './FriendsSection';
import MessagingSection from './MessagingSection';
import GamesSection from './GamesSection';
import EnhancedKandiAI from './EnhancedKandiAI';
import NewsSection from './NewsSection';
import EventEngagementHub from './EventEngagementHub';
import SafetySection from './SafetySection';
import CommunityForums from './CommunityForums';
import CulturalInterestsForm from './CulturalInterestsForm';
import KandiAIWidget from './KandiAIWidget';
import SearchBar from './SearchBar';

interface ResponsiveCleanHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const ResponsiveCleanHomeScreen: React.FC<ResponsiveCleanHomeScreenProps> = ({ username, onLogout, onNavigateToProfile }) => {
  const [activeSection, setActiveSection] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const feedItems = [
    {
      id: 1,
      user: 'Maya Chen',
      avatar: '/placeholder.svg',
      time: '2h ago',
      content: 'Just discovered an amazing traditional tea ceremony workshop! 🍵',
      image: '/placeholder.svg',
      likes: 24,
      comments: 8
    }
  ];

  const navigationItems = [
    { key: 'discover', label: 'Discover', emoji: '🔍' },
    { key: 'matches', label: 'Matches', emoji: '💫' },
    { key: 'friends', label: 'Friends', emoji: '👥' },
    { key: 'messages', label: 'Messages', emoji: '💬' },
    { key: 'games', label: 'Games', emoji: '🎮' },
    { key: 'kandi', label: 'Kandi AI', emoji: '🐶' },
    { key: 'news', label: 'News', emoji: '📰' },
    { key: 'events', label: 'Events', emoji: '📅' },
    { key: 'explore', label: 'Explore', emoji: '🧭' },
    { key: 'community', label: 'Community', emoji: '🌐' },
    { key: 'preferences', label: 'Preferences', emoji: '⚙️' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'discover': return <DiscoverSection />;
      case 'matches': return <MatchesSection />;
      case 'friends': return <FriendsSection />;
      case 'messages': return <MessagingSection />;
      case 'games': return <GamesSection />;
      case 'kandi': return <EnhancedKandiAI username={username} currentSection={activeSection} />;
      case 'news': return <NewsSection />;
      case 'events': return <EventEngagementHub />;
      case 'explore': return <SafetySection />;
      case 'community': return <CommunityForums />;
      case 'preferences': return <CulturalInterestsForm />;
      default: return renderFeedSection();
    }
  };

  const renderFeedSection = () => (
    <div className={`grid gap-6 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
      <div className={`space-y-6 ${isDesktop ? 'col-span-2' : ''}`}>
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Culture Bubbles</h2>
            <CultureBubbles />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Your Feed</h2>
            <div className="space-y-6">
              {feedItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-sm md:text-base">{item.user}</span>
                        <span className="text-gray-500 text-xs md:text-sm">{item.time}</span>
                      </div>
                      <p className="text-gray-700 mb-3 text-sm md:text-base">{item.content}</p>
                      {item.image && (
                        <img src={item.image} alt="Post" className="rounded-lg w-full h-32 md:h-48 object-cover mb-3" />
                      )}
                      <div className="flex items-center space-x-4 text-gray-500">
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs md:text-sm">
                          <Heart className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          {item.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-xs md:text-sm">
                          <MessageCircle className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                          {item.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-2 md:px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <h1 className="text-lg md:text-2xl font-bold text-blue-600">Culture</h1>
              {!isMobile && (
                <div className="flex items-center space-x-2 bg-green-50 px-2 md:px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs md:text-sm font-medium text-green-700">{username}</span>
                </div>
              )}
            </div>
            
            {!isMobile && (
              <div className="flex-1 max-w-md mx-6">
                <SearchBar />
              </div>
            )}

            <div className="flex items-center space-x-1 md:space-x-2">
              {isMobile && (
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              )}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-3 w-3 md:h-4 md:w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 md:h-4 md:w-4 flex items-center justify-center text-[10px] md:text-xs">3</span>
              </Button>
              {!isMobile && (
                <>
                  <Button variant="ghost" size="sm" onClick={onNavigateToProfile} className="text-xs md:text-sm">
                    <User className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Profile
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-600 hover:text-red-700 text-xs md:text-sm">
                    <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Logout
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMobile && (
        <div className="bg-white border-b border-gray-200 px-4 py-2">
          <SearchBar />
        </div>
      )}

      {isMobile ? (
        mobileMenuOpen && (
          <div className="bg-white border-b border-gray-200 px-4 py-2">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={activeSection === 'feed' ? 'default' : 'ghost'} 
                className="justify-start text-xs"
                onClick={() => { setActiveSection('feed'); setMobileMenuOpen(false); }}
              >
                <Home className="h-3 w-3 mr-1" />
                Home
              </Button>
              {navigationItems.map((item) => (
                <Button 
                  key={item.key} 
                  variant={activeSection === item.key ? 'default' : 'ghost'} 
                  className="justify-start text-xs"
                  onClick={() => { setActiveSection(item.key); setMobileMenuOpen(false); }}
                >
                  <span className="mr-1">{item.emoji}</span>
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )
      ) : (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center space-x-6 py-3 overflow-x-auto">
              <Button 
                variant={activeSection === 'feed' ? 'default' : 'ghost'} 
                className="flex items-center space-x-2"
                onClick={() => setActiveSection('feed')}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
              {navigationItems.map((item) => (
                <Button 
                  key={item.key} 
                  variant={activeSection === item.key ? 'default' : 'ghost'} 
                  className="flex items-center space-x-2 whitespace-nowrap"
                  onClick={() => setActiveSection(item.key)}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-2 md:px-4 py-4 md:py-6">
        {renderActiveSection()}
      </div>
      
      <KandiAIWidget currentSection={activeSection} />
    </div>
  );
};

export default ResponsiveCleanHomeScreen;