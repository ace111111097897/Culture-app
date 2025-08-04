import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Bell, 
  Shield, 
  Settings,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Zap,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';

export const IntelligentAssistance: React.FC = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: 'Hi! I\'m Cubbleton AI, your Cultural Advisor. How can I help you today?',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'user',
      message: 'How can I improve my profile visibility?',
      timestamp: '10:31 AM'
    },
    {
      id: 3,
      sender: 'ai',
      message: 'Based on your content, I recommend posting more during weekends and adding cultural context to your photos. This could increase engagement by 35%!',
      timestamp: '10:31 AM'
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'New Cultural Match',
      message: 'Maya shares your interest in Indian classical dance',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'trend',
      title: 'Trending Content',
      message: 'Korean culture content is trending in your network',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlock',
      message: 'You\'re close to earning the "Cultural Ambassador" badge',
      time: '1 day ago',
      priority: 'low'
    }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    mediaVisibility: 'friends',
    activityTracking: true,
    aiRecommendations: true
  });

  const quickTips = [
    {
      icon: Lightbulb,
      title: 'Profile Optimization',
      tip: 'Add 3-5 cultural interests to increase match quality by 40%'
    },
    {
      icon: Zap,
      title: 'Engagement Boost',
      tip: 'Respond to comments within 2 hours for better visibility'
    },
    {
      icon: Sparkles,
      title: 'Content Strategy',
      tip: 'Mix photos and videos for 25% higher engagement rates'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Virtual Cultural Advisor Chat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Cubbleton AI - Virtual Cultural Advisor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {message.sender === 'ai' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="bg-purple-200 text-purple-700 text-xs">CA</AvatarFallback>
                      </Avatar>
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-300">
              Ask for Tips
            </Button>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-300">
              Profile Analysis
            </Button>
            <Button variant="outline" size="sm" className="text-purple-600 border-purple-300">
              Cultural Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customizable Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Smart Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg border ${getPriorityColor(notification.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    <p className="text-sm opacity-90">{notification.message}</p>
                    <p className="text-xs opacity-70 mt-1">{notification.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {notification.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-blue-700 mb-2">Notification Preferences</h4>
            <div className="grid md:grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                Cultural Matches
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                Trending Content
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                Achievement Updates
              </Button>
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-300">
                Event Reminders
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-green-700 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data Privacy Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Profile Visibility</span>
              </div>
              <select 
                className="text-sm bg-white border border-green-300 rounded px-2 py-1"
                value={privacySettings.profileVisibility}
                onChange={(e) => setPrivacySettings({...privacySettings, profileVisibility: e.target.value})}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">Media Visibility</span>
              </div>
              <select 
                className="text-sm bg-white border border-green-300 rounded px-2 py-1"
                value={privacySettings.mediaVisibility}
                onChange={(e) => setPrivacySettings({...privacySettings, mediaVisibility: e.target.value})}
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">AI Recommendations</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPrivacySettings({...privacySettings, aiRecommendations: !privacySettings.aiRecommendations})}
                className={privacySettings.aiRecommendations ? 'text-green-600 border-green-300' : 'text-gray-600 border-gray-300'}
              >
                {privacySettings.aiRecommendations ? 'Enabled' : 'Disabled'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            Cubbleton AI Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {quickTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                  <IconComponent className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-orange-700 text-sm">{tip.title}</h4>
                    <p className="text-sm text-orange-600">{tip.tip}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};