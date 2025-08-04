import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, User, LogOut } from 'lucide-react';
import NewsSection from './NewsSection';
import DiscoverSection from './DiscoverSection';
import MessagingSection from './MessagingSection';
import SafetySection from './SafetySection';
import KandiAI from './KandiAI';
import NotificationsSection from './NotificationsSection';

interface HomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username, onLogout, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState('news');
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600">Culture</h1>
              <span className="text-gray-600">Welcome, {username}!</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('notifications')}
                className="relative"
              >
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
              <Button variant="outline" size="sm" onClick={onNavigateToProfile}>
                <User className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="kandi-ai">Kandi AI</TabsTrigger>
            <TabsTrigger value="safety">Safety</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="mt-6">
            <NewsSection />
          </TabsContent>

          <TabsContent value="discover" className="mt-6">
            <DiscoverSection />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessagingSection />
          </TabsContent>

          <TabsContent value="kandi-ai" className="mt-6">
            <KandiAI username={username} />
          </TabsContent>

          <TabsContent value="safety" className="mt-6">
            <SafetySection />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationsSection onNotificationRead={() => setNotifications(prev => Math.max(0, prev - 1))} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HomeScreen;