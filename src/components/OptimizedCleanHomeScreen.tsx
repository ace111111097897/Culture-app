import React, { useState } from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import ResponsiveLayout from './ResponsiveLayout';
import ResponsiveHeader from './ResponsiveHeader';
import ResponsiveNavigation from './ResponsiveNavigation';
import MobileNavigation from './MobileNavigation';
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
import UpdatedProfileSection from './UpdatedProfileSection';
import SubscriptionSection from './SubscriptionSection';
import KandiAIWidget from './KandiAIWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, Calendar, Users, Sparkles } from 'lucide-react';

interface OptimizedCleanHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const OptimizedCleanHomeScreen: React.FC<OptimizedCleanHomeScreenProps> = ({ 
  username, 
  onLogout, 
  onNavigateToProfile 
}) => {
  const [activeSection, setActiveSection] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

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
      case 'community': return <div className="p-4 text-center text-gray-500">Community forums coming soon!</div>;
      case 'preferences': return <UpdatedProfileSection username={username} onLogout={onLogout} />;
      case 'subscription': return <SubscriptionSection />;
      default: return renderFeedSection();
    }
  };

  const renderFeedSection = () => (
    <div className={`grid gap-4 md:gap-6 ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'}`}>
      <div className={`space-y-4 md:space-y-6 ${isDesktop ? 'col-span-2' : ''}`}>
        <Card>
          <CardContent className="p-3 md:p-6">
            <h2 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Culture Bubbles</h2>
            <CultureBubbles />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-3 md:p-6">
            <h2 className="text-base md:text-xl font-semibold mb-3 md:mb-4">Your Feed</h2>
            <div className="space-y-4 md:space-y-6">
              {feedItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 last:border-0 pb-4 md:pb-6 last:pb-0">
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

      {(isDesktop || (isTablet && activeSection === 'feed')) && (
        <div className="space-y-4 md:space-y-6">
          <Card>
            <CardContent className="p-3 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 flex items-center text-sm md:text-base">
                <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-2 md:p-3 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-xs md:text-sm">{event.title}</h4>
                    <p className="text-xs text-gray-600">{event.date}</p>
                    <p className="text-xs text-blue-600">{event.attendees} attending</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-6">
              <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                  <Users className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Find Friends
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Create Event
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs md:text-sm">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-2" />
                  Explore Cultures
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isMobile ? 'pb-20' : ''}`}>
      <ResponsiveHeader
        username={username}
        onLogout={onLogout}
        onNavigateToProfile={onNavigateToProfile}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <ResponsiveNavigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <ResponsiveLayout className={`py-4 md:py-6 ${isMobile ? 'max-w-full' : 'max-w-6xl mx-auto'}`}>
        {renderActiveSection()}
      </ResponsiveLayout>
      
      <MobileNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <KandiAIWidget currentSection={activeSection} />
    </div>
  );
};

export default OptimizedCleanHomeScreen;