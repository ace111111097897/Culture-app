import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, User, LogOut, Heart, MessageCircle, Share2, Calendar, Users, Sparkles, Home, Zap, UserCheck, MessageSquare, Gamepad2, Bot, Newspaper, MapPin, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

import CulturalInterestsForm from './CulturalInterestsForm';
import KandiAIWidget from './KandiAIWidget';
import SearchBar from './SearchBar';

interface CleanHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const CleanHomeScreen: React.FC<CleanHomeScreenProps> = ({ username, onLogout, onNavigateToProfile }) => {
  const [activeSection, setActiveSection] = useState('feed');

  const feedItems = [
    {
      id: 1,
      user: 'Maya Chen',
      avatar: '/placeholder.svg',
      time: '2h ago',
      content: 'Just discovered an amazing traditional tea ceremony workshop! The mindfulness and cultural depth was incredible. 🍵',
      image: '/placeholder.svg',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      user: 'Alex Rivera',
      avatar: '/placeholder.svg',
      time: '4h ago',
      content: 'Attending the local cultural festival this weekend. Who else is going? Would love to meet fellow culture enthusiasts!',
      likes: 18,
      comments: 12
    }
  ];

  const upcomingEvents = [
    { id: 1, title: 'Art Gallery Opening', date: 'Tomorrow', attendees: 45 },
    { id: 2, title: 'Cultural Food Festival', date: 'This Weekend', attendees: 120 },
    { id: 3, title: 'Music & Dance Workshop', date: 'Next Week', attendees: 30 }
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
      case 'preferences': return <CulturalInterestsForm />;
      default: return renderFeedSection();
    }
  };

  const renderFeedSection = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Culture Bubbles</h2>
            <CultureBubbles />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Your Feed</h2>
            <div className="space-y-6">
              {feedItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{item.user}</span>
                        <span className="text-gray-500 text-sm">{item.time}</span>
                      </div>
                      <p className="text-gray-700 mb-3">{item.content}</p>
                      {item.image && (
                        <img src={item.image} alt="Post" className="rounded-lg w-full h-48 object-cover mb-3" />
                      )}
                      <div className="flex items-center space-x-4 text-gray-500">
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Heart className="h-4 w-4 mr-1" />
                          {item.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {item.comments}
                        </Button>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Share2 className="h-4 w-4" />
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

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Upcoming Events
            </h3>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm">{event.title}</h4>
                  <p className="text-xs text-gray-600">{event.date}</p>
                  <p className="text-xs text-blue-600">{event.attendees} attending</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Find Friends
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="h-4 w-4 mr-2" />
                Explore Cultures
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600">Culture</h1>
              <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">{username}</span>
                <span className="text-xs text-green-600">Verified User</span>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-6">
              <SearchBar />
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={onNavigateToProfile}>
                <User className="h-4 w-4 mr-1" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="text-red-600 hover:text-red-700">
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

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

      <div className="max-w-6xl mx-auto px-4 py-6">
        {renderActiveSection()}
      </div>
      
      <KandiAIWidget currentSection={activeSection} />
    </div>
  );
};

export default CleanHomeScreen;