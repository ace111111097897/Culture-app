import React, { useState } from 'react';
import { Heart, X, Star, MapPin, MessageCircle, Info, Filter, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MatchesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discover');

  const potentialMatches = [
    {
      id: 1,
      name: 'Elena Vasquez',
      age: 26,
      location: 'Madrid, Spain',
      culture: 'Spanish',
      distance: '2.3 km away',
      bio: 'Love exploring different cultures through food and music. Passionate about flamenco dancing and teaching Spanish.',
      interests: ['Flamenco', 'Cooking', 'Travel', 'Languages'],
      photos: [''],
      matchPercentage: 94,
      isOnline: true
    },
    {
      id: 2,
      name: 'Ahmed Hassan',
      age: 29,
      location: 'Cairo, Egypt',
      culture: 'Egyptian',
      distance: '5.1 km away',
      bio: 'Cultural historian and tour guide. I love sharing stories about ancient Egypt and modern culture.',
      interests: ['History', 'Photography', 'Museums', 'Storytelling'],
      photos: [''],
      matchPercentage: 87,
      isOnline: false
    },
    {
      id: 3,
      name: 'Yuki Tanaka',
      age: 24,
      location: 'Tokyo, Japan',
      culture: 'Japanese',
      distance: '1.8 km away',
      bio: 'Traditional tea ceremony instructor who loves sharing Japanese culture and learning about others.',
      interests: ['Tea Ceremony', 'Calligraphy', 'Anime', 'Meditation'],
      photos: [''],
      matchPercentage: 91,
      isOnline: true
    }
  ];

  const myMatches = [
    {
      id: 4,
      name: 'Sofia Rossi',
      age: 27,
      location: 'Rome, Italy',
      culture: 'Italian',
      lastMessage: 'Would love to cook pasta together sometime!',
      timestamp: '2 hours ago',
      avatar: '',
      isOnline: true
    },
    {
      id: 5,
      name: 'Carlos Mendoza',
      age: 31,
      location: 'Mexico City, Mexico',
      culture: 'Mexican',
      lastMessage: 'The Day of the Dead celebration was amazing!',
      timestamp: '1 day ago',
      avatar: '',
      isOnline: false
    }
  ];

  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const currentMatch = potentialMatches[currentMatchIndex];

  const handleLike = () => {
    console.log('Liked:', currentMatch.name);
    nextMatch();
  };

  const handlePass = () => {
    console.log('Passed:', currentMatch.name);
    nextMatch();
  };

  const nextMatch = () => {
    setCurrentMatchIndex((prev) => (prev + 1) % potentialMatches.length);
  };

  const tabs = [
    { id: 'discover', label: 'Discover', count: potentialMatches.length },
    { id: 'matches', label: 'Matches', count: myMatches.length },
    { id: 'liked', label: 'Liked You', count: 3 }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Cultural Matches
        </h1>
        <p className="text-gray-600">Discover meaningful connections through cultural exchange</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 justify-center">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 ${
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

      {activeTab === 'discover' && currentMatch && (
        <div className="max-w-md mx-auto">
          <Card className="overflow-hidden shadow-lg border-teal-100">
            <div className="relative">
              {/* Photo placeholder */}
              <div className="h-96 bg-gradient-to-br from-teal-100 to-purple-100 flex items-center justify-center">
                <div className="text-6xl">{currentMatch.culture === 'Spanish' ? '🇪🇸' : currentMatch.culture === 'Egyptian' ? '🇪🇬' : '🇯🇵'}</div>
              </div>
              
              {/* Match percentage */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-to-r from-teal-500 to-purple-500 text-white text-sm px-3 py-1">
                  <Sparkles className="h-3 w-3 mr-1" />
                  {currentMatch.matchPercentage}% Match
                </Badge>
              </div>

              {/* Online status */}
              {currentMatch.isOnline && (
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-500 text-white text-xs">
                    Online
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-black">{currentMatch.name}, {currentMatch.age}</h2>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 text-teal-500" />
                    <span className="text-sm">{currentMatch.location}</span>
                  </div>
                  <p className="text-sm text-gray-500">{currentMatch.distance}</p>
                </div>

                <Badge variant="outline" className="border-teal-200 text-teal-700">
                  {currentMatch.culture} Culture
                </Badge>

                <p className="text-gray-700 text-sm leading-relaxed">{currentMatch.bio}</p>

                <div>
                  <h4 className="font-semibold text-black mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary" className="bg-teal-100 text-teal-700 text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              onClick={handlePass}
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-red-300 hover:bg-red-50"
            >
              <X className="h-6 w-6 text-gray-600 hover:text-red-500" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-blue-300 hover:border-blue-400 hover:bg-blue-50"
            >
              <Info className="h-6 w-6 text-blue-600" />
            </Button>
            
            <Button
              onClick={handleLike}
              size="lg"
              className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white"
            >
              <Heart className="h-6 w-6" />
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-4">
          {myMatches.map((match) => (
            <Card key={match.id} className="hover:shadow-md transition-all duration-200 border-teal-100">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16 ring-2 ring-teal-200">
                        <AvatarImage src={match.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white text-lg">
                          {match.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {match.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black">{match.name}, {match.age}</h3>
                      <div className="flex items-center gap-1 text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 text-teal-500" />
                        <span className="text-sm">{match.location}</span>
                      </div>
                      <Badge variant="outline" className="text-xs border-teal-200 text-teal-700 mb-2">
                        {match.culture}
                      </Badge>
                      <p className="text-sm text-gray-600">{match.lastMessage}</p>
                      <p className="text-xs text-gray-500 mt-1">{match.timestamp}</p>
                    </div>
                  </div>

                  <Button className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'liked' && (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-teal-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">People who liked you</h3>
          <p className="text-gray-500">Upgrade to premium to see who liked your profile</p>
          <Button className="mt-4 bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white">
            <Star className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </Button>
        </div>
      )}
    </div>
  );
};

export default MatchesPage;