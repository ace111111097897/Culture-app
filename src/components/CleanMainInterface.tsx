import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import EnhancedSearchBar from './EnhancedSearchBar';
import GlobalKandiAI from './GlobalKandiAI';
import EnhancedFakeUserManager from './EnhancedFakeUserManager';
import { Heart, MessageCircle, Calendar, Users, Sparkles, Bot } from 'lucide-react';

interface CleanMainInterfaceProps {
  username: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const CleanMainInterface: React.FC<CleanMainInterfaceProps> = ({ 
  username, 
  activeSection, 
  onSectionChange 
}) => {
  const [kandiVisible, setKandiVisible] = useState(false);

  const quickActions = [
    { icon: Users, label: 'Find Friends', action: () => onSectionChange('friends') },
    { icon: Heart, label: 'New Matches', action: () => onSectionChange('matches') },
    { icon: Calendar, label: 'Events', action: () => onSectionChange('events') },
    { icon: Sparkles, label: 'Explore', action: () => onSectionChange('explore') }
  ];

  const feedItems = [
    {
      id: 1,
      user: 'Maya Chen',
      avatar: '/placeholder.svg',
      time: '2h ago',
      content: 'Just discovered an amazing traditional tea ceremony workshop! 🍵',
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      user: 'Alex Rivera',
      avatar: '/placeholder.svg',
      time: '4h ago',
      content: 'Attending the local cultural festival this weekend. Who else is going?',
      likes: 18,
      comments: 12
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Clean Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome back, {username}!
                </h1>
                <p className="text-sm text-gray-600">Discover cultures, connect with friends</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setKandiVisible(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full px-6"
            >
              <Bot className="h-4 w-4 mr-2" />
              Ask Kandi
            </Button>
          </div>
          
          <div className="mt-4">
            <EnhancedSearchBar />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-20 flex-col space-y-2 hover:bg-purple-50 hover:border-purple-300 transition-all"
                        onClick={action.action}
                      >
                        <Icon className="h-6 w-6 text-purple-600" />
                        <span className="text-sm">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  {feedItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-4 bg-white/50 rounded-xl">
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
                        <div className="flex items-center space-x-4 text-gray-500">
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            <Heart className="h-4 w-4 mr-1" />
                            {item.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {item.comments}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Fake Users in Feed */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  People You Might Like
                </h2>
                <EnhancedFakeUserManager showInFeed={true} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Events
                </h3>
                <div className="space-y-3">
                  {[
                    { title: 'Art Gallery Opening', date: 'Tomorrow', attendees: 45 },
                    { title: 'Cultural Food Festival', date: 'This Weekend', attendees: 120 }
                  ].map((event, index) => (
                    <div key={index} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-600">{event.date}</p>
                      <p className="text-xs text-purple-600">{event.attendees} attending</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Culture Tip of the Day</h3>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    🇯🇵 In Japan, bowing is a sign of respect - the deeper the bow, the more respect shown!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GlobalKandiAI 
        currentSection={activeSection}
        isVisible={kandiVisible}
        onClose={() => setKandiVisible(false)}
      />
    </div>
  );
};

export default CleanMainInterface;