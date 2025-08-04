import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, MapPin, Clock, Sparkles } from 'lucide-react';

interface FakeProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  interests: string[];
  bio: string;
  avatar: string;
  isOnline: boolean;
  lastActive: string;
  culture: string;
}

const FAKE_PROFILES: FakeProfile[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    age: 25,
    location: 'New York, USA',
    interests: ['Art', 'Travel', 'Photography'],
    bio: 'Digital artist exploring the world one canvas at a time',
    avatar: 'AJ',
    isOnline: true,
    lastActive: 'Online now',
    culture: 'American'
  },
  {
    id: '2',
    name: 'Maria Gonzalez',
    age: 28,
    location: 'Madrid, Spain',
    interests: ['Music', 'Photography', 'Culture'],
    bio: 'Music lover and photographer capturing life\'s moments',
    avatar: 'MG',
    isOnline: false,
    lastActive: '2 hours ago',
    culture: 'Spanish'
  },
  {
    id: '3',
    name: 'Sam Lee',
    age: 24,
    location: 'Seoul, South Korea',
    interests: ['Gaming', 'Technology', 'AI'],
    bio: 'Tech enthusiast and gaming aficionado',
    avatar: 'SL',
    isOnline: true,
    lastActive: 'Online now',
    culture: 'Korean'
  },
  {
    id: '4',
    name: 'Priya Singh',
    age: 26,
    location: 'New Delhi, India',
    interests: ['Cooking', 'Fitness', 'Yoga'],
    bio: 'Wellness coach passionate about healthy living',
    avatar: 'PS',
    isOnline: false,
    lastActive: '1 day ago',
    culture: 'Indian'
  }
];

const FakeProfilesDisplay: React.FC = () => {
  const [currentProfiles, setCurrentProfiles] = useState<FakeProfile[]>([]);
  const [interactions, setInteractions] = useState<number>(0);

  useEffect(() => {
    // Simulate profiles appearing over time
    const interval = setInterval(() => {
      if (currentProfiles.length < FAKE_PROFILES.length) {
        const nextProfile = FAKE_PROFILES[currentProfiles.length];
        setCurrentProfiles(prev => [...prev, nextProfile]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentProfiles.length]);

  const handleInteraction = (profileId: string, type: 'like' | 'message') => {
    setInteractions(prev => prev + 1);
    // Simulate response
    setTimeout(() => {
      console.log(`${type} interaction with profile ${profileId}`);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Discover People ({currentProfiles.length} available)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-400 text-white">
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{profile.name}, {profile.age}</h3>
                        {profile.isOnline && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                        <MapPin className="h-3 w-3" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3" />
                        {profile.lastActive}
                      </div>
                    </div>
                  </div>
                  
                  <Badge variant="outline" className="mb-2">
                    {profile.culture} Culture
                  </Badge>
                  
                  <p className="text-sm text-gray-600 mb-3">{profile.bio}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {profile.interests.map((interest, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleInteraction(profile.id, 'like')}
                    >
                      <Heart className="h-3 w-3 mr-1" />
                      Like
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-purple-500 hover:bg-purple-600"
                      onClick={() => handleInteraction(profile.id, 'message')}
                    >
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {currentProfiles.length === 0 && (
            <div className="text-center py-8">
              <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Discovering new profiles...</p>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-purple-50 rounded-lg text-center">
            <p className="text-sm text-purple-700">
              Total interactions: {interactions}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FakeProfilesDisplay;