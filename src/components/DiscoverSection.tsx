import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, MapPin, Globe } from 'lucide-react';
import EnhancedSearchBar from './EnhancedSearchBar';
import FakeProfilesDisplay from './FakeProfilesDisplay';
const DiscoverSection: React.FC = () => {
  const suggestedUsers = [
    {
      id: '1',
      name: 'Yuki Tanaka',
      age: 24,
      culture: 'Japanese',
      location: 'Tokyo, Japan',
      interests: ['Anime', 'Tea Ceremony', 'Gaming'],
      avatar: '/api/placeholder/48/48',
      matchPercentage: 89
    },
    {
      id: '2',
      name: 'Maria Santos',
      age: 26,
      culture: 'Brazilian',
      location: 'São Paulo, Brazil',
      interests: ['Dancing', 'Music', 'Cooking'],
      avatar: '/api/placeholder/48/48',
      matchPercentage: 76
    }
  ];

  const culturalEvents = [
    {
      id: '1',
      title: 'Japanese Festival Night',
      date: 'Tomorrow',
      participants: 24,
      culture: 'Japanese'
    },
    {
      id: '2',
      title: 'Spanish Language Exchange',
      date: 'This Weekend',
      participants: 18,
      culture: 'Spanish'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Discover</h1>
        <p className="text-gray-600">Find new friends and explore cultures</p>
      </div>

      <EnhancedSearchBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-pink-500" />
              <span>Suggested for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedUsers.map((user) => (
              <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-700">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold truncate">{user.name}, {user.age}</h3>
                    <Badge variant="secondary" className="text-xs">{user.matchPercentage}%</Badge>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-1">
                    <MapPin className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{user.location}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                    <Globe className="h-3 w-3 flex-shrink-0" />
                    <span>{user.culture}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.interests.slice(0, 2).map((interest, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 flex-shrink-0">
                  <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>Cultural Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {culturalEvents.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>{event.date}</span>
                  <Badge variant="secondary">{event.participants} joining</Badge>
                </div>
                <Badge variant="outline">{event.culture}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <FakeProfilesDisplay />
    </div>
  );
};

export default DiscoverSection;