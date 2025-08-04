import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, MessageCircle, X, Star, MapPin } from 'lucide-react';
import FakeUserManager from '@/components/FakeUserManager';
const MatchesSection: React.FC = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const matches = [
    {
      id: '1',
      name: 'Aisha Patel',
      age: 25,
      culture: 'Indian',
      location: 'Mumbai, India',
      matchPercentage: 94,
      avatar: '/placeholder.svg',
      lastActive: '2 hours ago',
      commonInterests: ['Bollywood', 'Cooking', 'Travel'],
      isNewMatch: true
    },
    {
      id: '2',
      name: 'Chen Wei',
      age: 28,
      culture: 'Chinese',
      location: 'Beijing, China',
      matchPercentage: 87,
      avatar: '/placeholder.svg',
      lastActive: '1 day ago',
      commonInterests: ['Martial Arts', 'Photography', 'Gaming'],
      isNewMatch: false
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      age: 23,
      culture: 'Mexican',
      location: 'Mexico City, Mexico',
      matchPercentage: 91,
      avatar: '/placeholder.svg',
      lastActive: '30 minutes ago',
      commonInterests: ['Dancing', 'Art', 'Music'],
      isNewMatch: true
    }
  ];

  const likedYou = [
    {
      id: '4',
      name: 'Emma Johnson',
      age: 26,
      culture: 'American',
      avatar: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Hiroshi Sato',
      age: 29,
      culture: 'Japanese',
      avatar: '/placeholder.svg'
    }
  ];

  const handleUserInteraction = (user: any, message: string) => {
    setNotifications(prev => [...prev, `${user.displayName}: ${message}`]);
  };
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Matches</h1>
        <p className="text-gray-600">Your cultural connections await</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-pink-500" />
                  <span>Your Matches</span>
                </div>
                <Badge variant="secondary">{matches.length} matches</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className="relative p-6 border rounded-lg hover:shadow-md transition-shadow">
                  {match.isNewMatch && (
                    <Badge className="absolute top-2 right-2 bg-green-500">
                      New Match!
                    </Badge>
                  )}
                  
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <img src={match.avatar} alt={match.name} />
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-xl font-semibold">{match.name}, {match.age}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-green-600">
                            {match.matchPercentage}% match
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{match.location}</span>
                      </div>
                      
                      <Badge variant="outline" className="mb-3">
                        {match.culture} Culture
                      </Badge>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Common interests:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.commonInterests.map((interest, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-400">Active {match.lastActive}</p>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                        <X className="h-4 w-4 mr-1" />
                        Pass
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <FakeUserManager onUserInteraction={handleUserInteraction} />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500 fill-current" />
                <span>Liked You</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {likedYou.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <Avatar className="h-10 w-10">
                    <img src={user.avatar} alt={user.name} />
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-medium">{user.name}, {user.age}</h4>
                    <p className="text-sm text-gray-500">{user.culture}</p>
                  </div>
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              
              <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                <Heart className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">More likes coming soon!</p>
              </div>
              
              {notifications.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Recent Activity:</h4>
                  {notifications.slice(-3).map((notification, idx) => (
                    <p key={idx} className="text-xs text-gray-600 mb-1">{notification}</p>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MatchesSection;