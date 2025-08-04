import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, MoreHorizontal, Users, MapPin, Heart, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const FriendsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('friends');

  const friends = [
    {
      id: 1,
      name: 'Sarah Chen',
      username: '@sarah_c',
      location: 'San Francisco',
      culture: 'Chinese-American',
      avatar: '',
      status: 'online',
      mutualFriends: 8,
      lastActive: 'Active now',
      friendshipType: 'close'
    },
    {
      id: 2,
      name: 'Miguel Santos',
      username: '@miguel_s',
      location: 'Barcelona',
      culture: 'Spanish',
      avatar: '',
      status: 'offline',
      mutualFriends: 12,
      lastActive: '1 hour ago',
      friendshipType: 'cultural'
    },
    {
      id: 3,
      name: 'Priya Patel',
      username: '@priya_p',
      location: 'Mumbai',
      culture: 'Indian',
      avatar: '',
      status: 'online',
      mutualFriends: 15,
      lastActive: 'Active now',
      friendshipType: 'gaming'
    }
  ];

  const suggestions = [
    {
      id: 4,
      name: 'Alex Johnson',
      username: '@alex_j',
      location: 'London',
      culture: 'British',
      avatar: '',
      mutualFriends: 5,
      reason: 'Similar interests in gaming',
      friendshipType: 'gaming'
    },
    {
      id: 5,
      name: 'Luna Kim',
      username: '@luna_k',
      location: 'Seoul',
      culture: 'Korean',
      avatar: '',
      mutualFriends: 3,
      reason: 'Cultural exchange interests',
      friendshipType: 'cultural'
    }
  ];

  const getFriendshipIcon = (type: string) => {
    switch (type) {
      case 'close': return <Heart className="h-3 w-3 text-pink-500" />;
      case 'cultural': return <Globe className="h-3 w-3 text-blue-500" />;
      case 'gaming': return <Star className="h-3 w-3 text-purple-500" />;
      default: return <Users className="h-3 w-3 text-teal-500" />;
    }
  };

  const getFriendshipColor = (type: string) => {
    switch (type) {
      case 'close': return 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700';
      case 'cultural': return 'bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700';
      case 'gaming': return 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700';
      default: return 'bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700';
    }
  };

  const tabs = [
    { id: 'friends', label: 'Friends', count: friends.length },
    { id: 'suggestions', label: 'Suggestions', count: suggestions.length },
    { id: 'requests', label: 'Requests', count: 1 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Friends
        </h1>
        <p className="text-gray-600">Connect with friends through culture, gaming, and shared interests</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-4 w-4" />
        <Input
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 border-teal-200 focus:border-teal-400 focus:ring-teal-200"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap transition-all duration-200 ${
              activeTab === tab.id 
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white' 
                : 'border-teal-200 hover:bg-gradient-to-r hover:from-teal-50 hover:to-purple-50 hover:border-teal-300 text-black'
            }`}
          >
            {tab.label}
            <Badge variant="secondary" className={`text-xs ${
              activeTab === tab.id 
                ? 'bg-white/20 text-white' 
                : 'bg-teal-100 text-teal-700'
            }`}>
              {tab.count}
            </Badge>
          </Button>
        ))}
      </div>

      {activeTab === 'friends' && (
        <div className="space-y-4">
          {friends.map((friend) => (
            <Card key={friend.id} className="hover:shadow-md transition-all duration-200 border-teal-100 hover:border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-teal-200">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{friend.name}</h3>
                      <p className="text-sm text-gray-500">{friend.username}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-teal-400" />
                          {friend.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-teal-400" />
                          {friend.mutualFriends} mutual
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {friend.culture}
                        </Badge>
                        <Badge className={`text-xs ${getFriendshipColor(friend.friendshipType)}`}>
                          {getFriendshipIcon(friend.friendshipType)}
                          <span className="ml-1 capitalize">{friend.friendshipType}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="border-teal-200 hover:bg-gradient-to-r hover:from-teal-50 hover:to-purple-50">
                      <MessageCircle className="h-4 w-4 text-teal-500" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-teal-200 hover:bg-gradient-to-r hover:from-teal-50 hover:to-purple-50">
                      <MoreHorizontal className="h-4 w-4 text-teal-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'suggestions' && (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-md transition-all duration-200 border-blue-100 hover:border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-blue-200">
                      <AvatarImage src={suggestion.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {suggestion.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-black">{suggestion.name}</h3>
                      <p className="text-sm text-gray-500">{suggestion.username}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-400" />
                          {suggestion.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-blue-400" />
                          {suggestion.mutualFriends} mutual
                        </div>
                      </div>
                      <p className="text-xs text-teal-600 mt-1 font-medium">{suggestion.reason}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                          {suggestion.culture}
                        </Badge>
                        <Badge className={`text-xs ${getFriendshipColor(suggestion.friendshipType)}`}>
                          {getFriendshipIcon(suggestion.friendshipType)}
                          <span className="ml-1 capitalize">{suggestion.friendshipType}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white">
                      <UserPlus className="h-4 w-4" />
                      Add Friend
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-teal-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No pending requests</h3>
          <p className="text-gray-500">Friend requests will appear here</p>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;