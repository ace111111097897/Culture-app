import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, MessageSquare, Heart, Users, Gift, Calendar, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'message' | 'like' | 'match' | 'event' | 'system';
  title: string;
  message: string;
  time: string;
  unread: boolean;
  avatar?: string;
  actionable?: boolean;
}

interface FunctionalNotificationsProps {
  onNotificationUpdate?: (count: number) => void;
}

const FunctionalNotifications: React.FC<FunctionalNotificationsProps> = ({ onNotificationUpdate }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'like',
      title: 'New Like',
      message: 'Sarah liked your profile',
      time: '5 min ago',
      unread: true,
      actionable: true
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Marcus sent you a message: "Hey! I love your taste in music..."',
      time: '1 hour ago',
      unread: true,
      actionable: true
    },
    {
      id: '3',
      type: 'match',
      title: 'New Match!',
      message: 'You and Elena are now connected! Start a conversation.',
      time: '2 hours ago',
      unread: true,
      actionable: true
    },
    {
      id: '4',
      type: 'event',
      title: 'Cultural Event',
      message: 'Japanese Tea Ceremony workshop this Saturday - perfect for a cultural date!',
      time: '1 day ago',
      unread: false,
      actionable: true
    },
    {
      id: '5',
      type: 'system',
      title: 'Profile Boost',
      message: 'Your profile received 15 views today! Consider updating your photos.',
      time: '2 days ago',
      unread: false,
      actionable: false
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'messages' | 'matches'>('all');

  useEffect(() => {
    const unreadCount = notifications.filter(n => n.unread).length;
    onNotificationUpdate?.(unreadCount);
  }, [notifications, onNotificationUpdate]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-5 w-5 text-blue-600" />;
      case 'like': return <Heart className="h-5 w-5 text-red-500" />;
      case 'match': return <Users className="h-5 w-5 text-green-600" />;
      case 'event': return <Calendar className="h-5 w-5 text-purple-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleNotificationAction = (notification: Notification) => {
    markAsRead(notification.id);
    
    // Simulate navigation or action based on notification type
    switch (notification.type) {
      case 'message':
        console.log('Navigate to messages');
        break;
      case 'like':
        console.log('Navigate to likes');
        break;
      case 'match':
        console.log('Navigate to matches');
        break;
      case 'event':
        console.log('Navigate to events');
        break;
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    switch (filter) {
      case 'unread': return notif.unread;
      case 'messages': return notif.type === 'message';
      case 'matches': return notif.type === 'match' || notif.type === 'like';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-blue-600" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            {unreadCount > 0 && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={markAllAsRead}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All', count: notifications.length },
              { key: 'unread', label: 'Unread', count: unreadCount },
              { key: 'messages', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
              { key: 'matches', label: 'Matches & Likes', count: notifications.filter(n => n.type === 'match' || n.type === 'like').length }
            ].map(tab => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(tab.key as any)}
                className="relative"
              >
                {tab.label}
                {tab.count > 0 && (
                  <Badge 
                    className={`ml-2 ${filter === tab.key ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'}`}
                    variant="secondary"
                  >
                    {tab.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No notifications to show</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${
                notification.unread ? 'border-blue-200 bg-blue-50' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gray-100">
                        {getNotificationIcon(notification.type)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                          {notification.title}
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          {notification.time}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {notification.actionable && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleNotificationAction(notification)}
                          >
                            View
                          </Button>
                        )}
                        {notification.unread && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default FunctionalNotifications;