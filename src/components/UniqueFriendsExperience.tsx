import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Users, MessageCircle, Calendar, Globe, Heart, Star, Search, UserPlus, Gift, Zap } from 'lucide-react';

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'playing';
  country: string;
  mutualFriends: number;
  lastSeen: string;
  favoriteGames: string[];
  culturalBackground: string;
}

interface FriendActivity {
  id: string;
  friendName: string;
  avatar: string;
  action: string;
  timestamp: string;
  game?: string;
}

const UniqueFriendsExperience: React.FC = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');

  const friends: Friend[] = [
    {
      id: '1',
      name: 'Akira Tanaka',
      avatar: '🎌',
      status: 'online',
      country: 'Japan',
      mutualFriends: 5,
      lastSeen: 'Online now',
      favoriteGames: ['Shogi', 'Go', 'Xiangqi'],
      culturalBackground: 'Japanese'
    },
    {
      id: '2',
      name: 'Amara Okafor',
      avatar: '🌍',
      status: 'playing',
      country: 'Nigeria',
      mutualFriends: 3,
      lastSeen: 'Playing Mancala',
      favoriteGames: ['Mancala', 'Ayo', 'Chess'],
      culturalBackground: 'West African'
    },
    {
      id: '3',
      name: 'Li Wei',
      avatar: '🐉',
      status: 'offline',
      country: 'China',
      mutualFriends: 8,
      lastSeen: '2 hours ago',
      favoriteGames: ['Xiangqi', 'Go', 'Mahjong'],
      culturalBackground: 'Chinese'
    }
  ];

  const activities: FriendActivity[] = [
    {
      id: '1',
      friendName: 'Akira Tanaka',
      avatar: '🎌',
      action: 'achieved Master rank in Shogi',
      timestamp: '2 minutes ago',
      game: 'Shogi'
    },
    {
      id: '2',
      friendName: 'Amara Okafor',
      avatar: '🌍',
      action: 'started a Mancala tournament',
      timestamp: '15 minutes ago',
      game: 'Mancala'
    },
    {
      id: '3',
      friendName: 'Li Wei',
      avatar: '🐉',
      action: 'shared a cultural story',
      timestamp: '1 hour ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'playing': return 'bg-blue-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'playing': return 'Playing';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="w-6 h-6 mr-2" />
            Cultural Friends Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 backdrop-blur border-white/20">
              <TabsTrigger value="friends" className="data-[state=active]:bg-blue-600 text-white">
                <Users className="w-4 h-4 mr-2" />
                Friends
              </TabsTrigger>
              <TabsTrigger value="discover" className="data-[state=active]:bg-blue-600 text-white">
                <Search className="w-4 h-4 mr-2" />
                Discover
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-blue-600 text-white">
                <Zap className="w-4 h-4 mr-2" />
                Activities
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 text-white">
                <Calendar className="w-4 h-4 mr-2" />
                Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="space-y-4 mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                <Input
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>

              {friends.map((friend) => (
                <Card key={friend.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="text-3xl">{friend.avatar}</div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(friend.status)} border-2 border-white`}></div>
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{friend.name}</h3>
                          <div className="flex items-center space-x-2 text-sm text-white/70">
                            <Globe className="w-3 h-3" />
                            <span>{friend.country}</span>
                            <span>•</span>
                            <span>{friend.mutualFriends} mutual friends</span>
                          </div>
                          <p className="text-xs text-white/60">{friend.lastSeen}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Gift className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {friend.favoriteGames.slice(0, 3).map((game, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/30 text-white/80">
                          {game}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="discover" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <UserPlus className="w-16 h-16 text-white/60 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">Discover Cultural Friends</h3>
                <p className="text-white/70 mb-4">Find people who share your cultural interests and gaming preferences</p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Start Discovering
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="space-y-4 mt-4">
              <h3 className="text-white font-semibold mb-4">Recent Friend Activities</h3>
              {activities.map((activity) => (
                <Card key={activity.id} className="bg-white/5 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{activity.avatar}</div>
                      <div className="flex-1">
                        <p className="text-white">
                          <span className="font-semibold">{activity.friendName}</span> {activity.action}
                        </p>
                        <p className="text-white/60 text-sm">{activity.timestamp}</p>
                      </div>
                      {activity.game && (
                        <Badge className="bg-purple-600 text-white">
                          {activity.game}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-4">
              <div className="text-center py-8">
                <Calendar className="w-16 h-16 text-white/60 mx-auto mb-4" />
                <h3 className="text-white text-lg font-semibold mb-2">Cultural Events</h3>
                <p className="text-white/70 mb-4">Join cultural gaming events and tournaments with friends</p>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  View Events
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniqueFriendsExperience;