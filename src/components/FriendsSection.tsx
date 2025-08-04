import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Users, Globe, Calendar, Video } from 'lucide-react';

const FriendsSection: React.FC = () => {
  const friends = [
    {
      id: '1',
      name: 'Kenji Nakamura',
      culture: 'Japanese',
      status: 'online',
      avatar: '/placeholder.svg',
      lastMessage: 'Want to practice Japanese together?',
      lastActive: 'now',
      mutualFriends: 3
    },
    {
      id: '2',
      name: 'Isabella Garcia',
      culture: 'Spanish',
      status: 'away',
      avatar: '/placeholder.svg',
      lastMessage: 'Thanks for the cultural tips!',
      lastActive: '5 min ago',
      mutualFriends: 7
    },
    {
      id: '3',
      name: 'Ahmed Hassan',
      culture: 'Egyptian',
      status: 'offline',
      avatar: '/placeholder.svg',
      lastMessage: 'The pyramid photos were amazing',
      lastActive: '2 hours ago',
      mutualFriends: 2
    }
  ];

  const friendRequests = [
    {
      id: '4',
      name: 'Priya Sharma',
      culture: 'Indian',
      avatar: '/placeholder.svg',
      mutualFriends: 5
    },
    {
      id: '5',
      name: 'Lucas Silva',
      culture: 'Brazilian',
      avatar: '/placeholder.svg',
      mutualFriends: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Friends</h1>
        <p className="text-gray-600">Connect with your cultural community</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  <span>Your Friends</span>
                </div>
                <Badge variant="secondary">{friends.length} friends</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <img src={friend.avatar} alt={friend.name} />
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(friend.status)}`}></div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold">{friend.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {friend.culture}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">{friend.lastMessage}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Active {friend.lastActive}</span>
                      <span>{friend.mutualFriends} mutual friends</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="h-4 w-4 mr-1" />
                      Call
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <span>Friend Requests</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {friendRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <Avatar className="h-10 w-10">
                      <img src={request.avatar} alt={request.name} />
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-medium">{request.name}</h4>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Globe className="h-3 w-3" />
                        <span>{request.culture}</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {request.mutualFriends} mutual friends
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-500 hover:bg-blue-600">
                      Accept
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No new requests</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                <span>Upcoming Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-sm">Cultural Exchange Meetup</h4>
                  <p className="text-xs text-gray-600">Tomorrow at 7 PM</p>
                  <p className="text-xs text-purple-600">3 friends attending</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-sm">Language Practice Session</h4>
                  <p className="text-xs text-gray-600">This Weekend</p>
                  <p className="text-xs text-blue-600">5 friends attending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FriendsSection;