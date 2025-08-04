import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, MoreHorizontal, Users, MapPin, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const ConnectionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('connections');

  const connections = [
    {
      id: 1,
      name: 'Maria Rodriguez',
      username: '@maria_r',
      location: 'Mexico City',
      culture: 'Mexican',
      avatar: '',
      status: 'online',
      mutualConnections: 12,
      lastActive: 'Active now',
      connectionType: 'cultural'
    },
    {
      id: 2,
      name: 'Kenji Tanaka',
      username: '@kenji_t',
      location: 'Tokyo',
      culture: 'Japanese',
      avatar: '',
      status: 'offline',
      mutualConnections: 8,
      lastActive: '2 hours ago',
      connectionType: 'platonic'
    },
    {
      id: 3,
      name: 'Amara Okafor',
      username: '@amara_o',
      location: 'Lagos',
      culture: 'Nigerian',
      avatar: '',
      status: 'online',
      mutualConnections: 15,
      lastActive: 'Active now',
      connectionType: 'matchmaking'
    }
  ];

  const suggestions = [
    {
      id: 4,
      name: 'Elena Popov',
      username: '@elena_p',
      location: 'Sofia',
      culture: 'Bulgarian',
      avatar: '',
      mutualConnections: 3,
      reason: 'Similar cultural interests',
      connectionType: 'cultural'
    },
    {
      id: 5,
      name: 'Ahmed Hassan',
      username: '@ahmed_h',
      location: 'Cairo',
      culture: 'Egyptian',
      avatar: '',
      mutualConnections: 7,
      reason: 'Lives nearby',
      connectionType: 'matchmaking'
    }
  ];

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'matchmaking': return <Heart className="h-3 w-3 text-teal-500" />;
      case 'cultural': return <Globe className="h-3 w-3 text-blue-500" />;
      default: return <Users className="h-3 w-3 text-purple-500" />;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'matchmaking': return 'bg-gradient-to-r from-teal-100 to-blue-100 text-teal-700';
      case 'cultural': return 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700';
      default: return 'bg-gradient-to-r from-teal-100 to-purple-100 text-teal-700';
    }
  };

  const tabs = [
    { id: 'connections', label: 'Connections', count: connections.length },
    { id: 'suggestions', label: 'Suggestions', count: suggestions.length },
    { id: 'requests', label: 'Requests', count: 2 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Connections
        </h1>
        <p className="text-gray-600">Build meaningful relationships through cultural exchange and matchmaking</p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-400 h-4 w-4" />
        <Input
          placeholder="Search connections..."
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
                : 'border-teal-200 hover:bg-gradient-to-r hover:from-teal-50 hover:to-purple-50 hover:border-teal-300'
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

      {activeTab === 'connections' && (
        <div className="space-y-4">
          {connections.map((connection) => (
            <Card key={connection.id} className="hover:shadow-md transition-all duration-200 border-teal-100 hover:border-teal-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-teal-200">
                        <AvatarImage src={connection.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">
                          {connection.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        connection.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{connection.name}</h3>
                      <p className="text-sm text-gray-500">{connection.username}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-teal-400" />
                          {connection.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-teal-400" />
                          {connection.mutualConnections} mutual
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs border-teal-200 text-teal-700">
                          {connection.culture}
                        </Badge>
                        <Badge className={`text-xs ${getConnectionColor(connection.connectionType)}`}>
                          {getConnectionIcon(connection.connectionType)}
                          <span className="ml-1 capitalize">{connection.connectionType}</span>
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
                      <h3 className="font-semibold text-gray-800">{suggestion.name}</h3>
                      <p className="text-sm text-gray-500">{suggestion.username}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-blue-400" />
                          {suggestion.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-blue-400" />
                          {suggestion.mutualConnections} mutual
                        </div>
                      </div>
                      <p className="text-xs text-teal-600 mt-1 font-medium">{suggestion.reason}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                          {suggestion.culture}
                        </Badge>
                        <Badge className={`text-xs ${getConnectionColor(suggestion.connectionType)}`}>
                          {getConnectionIcon(suggestion.connectionType)}
                          <span className="ml-1 capitalize">{suggestion.connectionType}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white">
                      <UserPlus className="h-4 w-4" />
                      Connect
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
          <p className="text-gray-500">Connection requests will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ConnectionsPage;