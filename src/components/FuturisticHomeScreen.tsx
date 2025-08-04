import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, User, LogOut, Search, Mic, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface FuturisticHomeScreenProps {
  username: string;
  onLogout: () => void;
  onNavigateToProfile: () => void;
}

const FuturisticHomeScreen: React.FC<FuturisticHomeScreenProps> = ({ username, onLogout, onNavigateToProfile }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Immersive Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-orange-500/20 animate-pulse"></div>
        <div className="relative z-10">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 bg-clip-text text-transparent mb-6">
            Culture
          </h1>
          <p className="text-2xl md:text-4xl text-white/90 mb-8 font-light">
            Explore. Connect. Celebrate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full text-lg">
              Start Exploring
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Smart Search Bar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div className="relative">
          <Input 
            placeholder="Search users, events, cultures..."
            className="bg-white/10 backdrop-blur-md border-white/20 text-white placeholder-white/60 rounded-full pl-12 pr-20"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-white/10">
              <Mic className="h-4 w-4 text-white/60" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-full p-0 hover:bg-white/10">
              <Camera className="h-4 w-4 text-white/60" />
            </Button>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="relative bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
        >
          <Bell className="h-4 w-4" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onNavigateToProfile}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
        >
          <User className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onLogout}
          className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-full h-10 w-10 p-0"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FuturisticHomeScreen;