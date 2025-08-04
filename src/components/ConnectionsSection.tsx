import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Users, Globe, Calendar, Video, Heart, UserPlus } from 'lucide-react';

const ConnectionsSection: React.FC = () => {
  const connections = [
    {
      id: '1',
      name: 'Kenji Nakamura',
      culture: 'Japanese',
      status: 'online',
      avatar: '/placeholder.svg',
      lastMessage: 'Want to practice Japanese together?',
      lastActive: 'now',
      mutualConnections: 3,
      connectionType: 'cultural'
    },
    {
      id: '2',
      name: 'Isabella Garcia',
      culture: 'Spanish',
      status: 'away',
      avatar: '/placeholder.svg',
      lastMessage: 'Thanks for the cultural tips!',
      lastActive: '5 min ago',
      mutualConnections: 7,
      connectionType: 'platonic'
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      culture: 'Egyptian',
      status: 'offline',
      avatar: '/placeholder.svg',
      lastMessage: 'The pyramid photos were amazing',
      lastActive: '2 hours ago',
      mutualConnections: 2,
      connectionType: 'matchmaking'
    }
  ];

  const connectionRequests = [
    {
      id: '4',
      name: 'Priya Sharma',
      culture: 'Indian',
      avatar: '/placeholder.svg',
      mutualConnections: 5,
      requestType: 'cultural'
    },
    {
      id: '5',
      name: 'Lucas Silva',
      culture: 'Brazilian',
      avatar: '/placeholder.svg',
      mutualConnections: 2,
      requestType: 'platonic'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getConnectionTypeIcon = (type: string) => {
    switch (type) {
      case 'cultural': return <Globe className="h-3 w-3" />;
      case 'platonic': return <Users className="h-3 w-3" />;
      case 'matchmaking': return <Heart className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case 'cultural': return 'bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700';
      case 'platonic': return 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700';
      case 'matchmaking': return 'bg-gradient-to-r from-pink-100 to-red-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Connections
        </h1>
        <p className="text-gray-600">Build meaningful cultural and personal connections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-orange-100 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-500" />
                  <span className="text-gray-800">Your Connections</span>
                </div>
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  {connections.length} connections
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {connections.map((connection) => (
                <div key={connection.id} className="flex items-center space-x-4 p-4 border border-orange-100 rounded-lg hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200">
                  <div className="relative">
                    <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                      <img src={connection.avatar} alt={connection.name} />
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(connection.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{connection.name}</h3>
                      <Badge variant="outline" className="text-xs border-orange-200">
                        <Globe className="h-3 w-3 mr-1 text-orange-500" />
                        {connection.culture}
                      </Badge>
                      <Badge className={`text-xs ${getConnectionTypeColor(connection.connectionType)}`}>
                        {getConnectionTypeIcon(connection.connectionType)}
                        <span className="ml-1 capitalize">{connection.connectionType}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">{connection.lastMessage}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Active {connection.lastActive}</span>
                      <span>{connection.mutualConnections} mutual connections</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50">
                      <MessageCircle className="h-4 w-4 mr-1 text-orange-500" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50">
                      <Video className="h-4 w-4 mr-1 text-orange-500" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="border-pink-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="h-5 w-5 text-pink-500" />
                <span className="text-gray-800">Connection Requests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {connectionRequests.map((request) => (
                <div key={request.id} className="p-4 border border-pink-100 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10 ring-2 ring-pink-200">
                      <img src={request.avatar} alt={request.name} />
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{request.name}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Globe className="h-3 w-3 text-orange-500" />
                        <span>{request.culture}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-gray-400">
                          {request.mutualConnections} mutual connections
                        </p>
                        <Badge className={`text-xs ${getConnectionTypeColor(request.requestType)}`}>
                          {getConnectionTypeIcon(request.requestType)}
                          <span className="ml-1 capitalize">{request.requestType}</span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center p-4 border-2 border-dashed border-pink-200 rounded-lg">
                <UserPlus className="h-8 w-8 text-pink-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No new requests</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span className="text-gray-800">Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                  <h4 className="font-medium text-sm text-gray-800">Cultural Exchange Meetup</h4>
                  <p className="text-xs text-gray-600">Tomorrow at 7 PM</p>
                  <p className="text-xs text-purple-600">3 connections attending</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <h4 className="font-medium text-sm text-gray-800">Language Practice Session</h4>
                  <p className="text-xs text-gray-600">This Weekend</p>
                  <p className="text-xs text-blue-600">5 connections attending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsSection;