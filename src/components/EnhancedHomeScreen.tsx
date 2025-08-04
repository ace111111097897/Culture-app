import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, Search, Mic, Camera, Home, Users, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import PersonalizedFeed from './PersonalizedFeed';
import HighlightsCarousel from './HighlightsCarousel';
import EventEngagementHub from './EventEngagementHub';
import DiscoverSection from './DiscoverSection';
import MessagingSection from './MessagingSection';
import KandiAI from './KandiAI';

interface EnhancedHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const EnhancedHomeScreen: React.FC<EnhancedHomeScreenProps> = ({ username, onLogout, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Futuristic Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
                Culture
              </h1>
              <span className="text-gray-600 font-medium">Welcome, {username}!</span>
            </div>
            
            {/* Smart Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input 
                  placeholder="Search users, events, cultures..."
                  className="bg-white/60 backdrop-blur-sm border-gray-200/50 rounded-full pl-10 pr-16"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 rounded-full p-0">
                    <Mic className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 rounded-full p-0">
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="relative h-10 w-10 rounded-full"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={onNavigateToProfile} className="h-10 w-10 rounded-full">
                <User className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="h-10 w-10 rounded-full">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Bottom Navigation for Mobile */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200/50 z-50 md:hidden">
            <TabsList className="grid w-full grid-cols-5 h-16 bg-transparent">
              <TabsTrigger value="home" className="flex-col gap-1 h-full">
                <Home className="h-4 w-4" />
                <span className="text-xs">Home</span>
              </TabsTrigger>
              <TabsTrigger value="discover" className="flex-col gap-1 h-full">
                <Users className="h-4 w-4" />
                <span className="text-xs">Discover</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex-col gap-1 h-full">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">Events</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex-col gap-1 h-full">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">Messages</span>
              </TabsTrigger>
              <TabsTrigger value="kandi-ai" className="flex-col gap-1 h-full">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs">Kandi AI</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block py-6">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
              <TabsTrigger value="home">Home Feed</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="kandi-ai">Kandi AI</TabsTrigger>
            </TabsList>
          </div>

          <div className="pb-20 md:pb-6">
            <TabsContent value="home" className="mt-6 space-y-8">
              <HighlightsCarousel />
              <PersonalizedFeed />
            </TabsContent>

            <TabsContent value="discover" className="mt-6">
              <DiscoverSection />
            </TabsContent>

            <TabsContent value="events" className="mt-6">
              <EventEngagementHub />
            </TabsContent>

            <TabsContent value="messages" className="mt-6">
              <MessagingSection />
            </TabsContent>

            <TabsContent value="kandi-ai" className="mt-6">
              <KandiAI username={username} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default EnhancedHomeScreen;