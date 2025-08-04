import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Calendar, MessageSquare, Star, Zap } from 'lucide-react';

interface InteractiveHomeContentProps {
  onSectionChange: (section: string) => void;
}

const InteractiveHomeContent: React.FC<InteractiveHomeContentProps> = ({ onSectionChange }) => {
  const [activeTab, setActiveTab] = useState('start-matching');

  const liveStats = [
    { label: 'Active Users', value: '12.4K', icon: Users, color: 'text-green-600' },
    { label: 'Live Events', value: '47', icon: Calendar, color: 'text-blue-600' },
    { label: 'New Matches', value: '156', icon: Star, color: 'text-yellow-600' },
    { label: 'Messages Today', value: '2.1K', icon: MessageSquare, color: 'text-purple-600' }
  ];

  const trendingTopics = [
    { name: 'K-Pop Dance Challenge', participants: '1.2K', trending: true },
    { name: 'Cultural Food Festival', participants: '890', trending: true },
    { name: 'Language Exchange', participants: '654', trending: false },
    { name: 'Art Collaboration', participants: '432', trending: false }
  ];

  const actionTabs = [
    { id: 'start-matching', label: 'Start Matching', action: () => onSectionChange('matches') },
    { id: 'create-cubble', label: 'Create Cubble', action: () => onSectionChange('cubbles') },
    { id: 'join-events', label: 'Join Events', action: () => onSectionChange('events') },
    { id: 'explore-cultures', label: 'Explore Cultures', action: () => onSectionChange('explore') }
  ];

  const handleTabClick = (tab: any) => {
    setActiveTab(tab.id);
    tab.action();
  };

  return (
    <div className="space-y-8">
      {/* Live Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {liveStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 bg-white/80 backdrop-blur-sm border-purple-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-3">
                <Icon className={`h-6 w-6 ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Active Action Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {actionTabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`h-12 font-semibold transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105' 
                  : 'bg-white/50 text-purple-700 border-purple-300 hover:bg-purple-50'
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Trending Topics */}
      <Card className="p-6 bg-white/80 backdrop-blur-sm border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-900">Trending Now</h3>
          <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span className="font-medium text-gray-900">{topic.name}</span>
                {topic.trending && (
                  <Badge className="bg-orange-500 text-white text-xs px-2 py-1">HOT</Badge>
                )}
              </div>
              <span className="text-sm text-gray-600">{topic.participants}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default InteractiveHomeContent;