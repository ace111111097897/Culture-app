import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Heart, Star, MessageCircle, MapPin, Globe, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MatchProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  avatar: string;
  cultural_interests: string[];
  languages: string[];
  distance: number;
  compatibility: number;
  photos: string[];
  isOnline: boolean;
  lastActive: string;
}

const MatchesSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<MatchProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Sample profiles data
  const sampleProfiles: MatchProfile[] = [
    {
      id: '1',
      name: 'Sofia',
      age: 24,
      location: 'Barcelona, Spain',
      bio: 'Passionate about flamenco dancing and Spanish cuisine. Love exploring new cultures and sharing traditional recipes! 💃🇪🇸',
      avatar: '/api/placeholder/200/200',
      cultural_interests: ['Spanish Culture', 'Flamenco', 'Cooking', 'Travel'],
      languages: ['Spanish', 'English', 'Catalan'],
      distance: 2.3,
      compatibility: 92,
      photos: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      isOnline: true,
      lastActive: '2 min ago'
    },
    {
      id: '2',
      name: 'Yuki',
      age: 26,
      location: 'Tokyo, Japan',
      bio: 'Tea ceremony enthusiast and calligraphy artist. Finding beauty in traditional Japanese arts and modern anime culture! 🍵✍️',
      avatar: '/api/placeholder/200/200',
      cultural_interests: ['Japanese Culture', 'Tea Ceremony', 'Calligraphy', 'Anime'],
      languages: ['Japanese', 'English'],
      distance: 5.1,
      compatibility: 88,
      photos: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
      isOnline: false,
      lastActive: '1 hour ago'
    },
    {
      id: '3',
      name: 'Aisha',
      age: 23,
      location: 'Marrakech, Morocco',
      bio: 'Henna artist and traditional Moroccan music lover. Sharing the beauty of North African culture through art and music! 🎨🎵',
      avatar: '/api/placeholder/200/200',
      cultural_interests: ['Moroccan Culture', 'Henna Art', 'Traditional Music', 'Cooking'],
      languages: ['Arabic', 'French', 'English'],
      distance: 8.7,
      compatibility: 95,
      photos: ['/api/placeholder/400/600', '/api/placeholder/400/600', '/api/placeholder/400/600'],
      isOnline: true,
      lastActive: '5 min ago'
    },
    {
      id: '4',
      name: 'Carlos',
      age: 28,
      location: 'Mexico City, Mexico',
      bio: 'Mariachi musician and street food enthusiast. Bringing the vibrant culture of Mexico to life through music and cuisine! 🎺🌮',
      avatar: '/api/placeholder/200/200',
      cultural_interests: ['Mexican Culture', 'Mariachi', 'Street Food', 'Folk Art'],
      languages: ['Spanish', 'English'],
      distance: 12.4,
      compatibility: 87,
      photos: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
      isOnline: false,
      lastActive: '3 hours ago'
    }
  ];

  useEffect(() => {
    // Simulate loading profiles
    setTimeout(() => {
      setProfiles(sampleProfiles);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAction = (action: 'pass' | 'like' | 'superlike') => {
    if (currentIndex >= profiles.length) return;

    const currentProfile = profiles[currentIndex];
    
    switch (action) {
      case 'pass':
        toast({
          title: "Passed",
          description: `You passed on ${currentProfile.name}`,
        });
        break;
      case 'like':
        toast({
          title: "Liked!",
          description: `You liked ${currentProfile.name}`,
        });
        break;
      case 'superlike':
        toast({
          title: "Super Like! ⭐",
          description: `You super liked ${currentProfile.name}!`,
        });
        break;
    }

    // Move to next profile
    setCurrentIndex(prev => prev + 1);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (currentIndex < profiles.length) {
      const currentProfile = profiles[currentIndex];
      setCurrentPhotoIndex(prev => 
        prev < currentProfile.photos.length - 1 ? prev + 1 : 0
      );
    }
  };

  const previousPhoto = () => {
    if (currentIndex < profiles.length) {
      const currentProfile = profiles[currentIndex];
      setCurrentPhotoIndex(prev => 
        prev > 0 ? prev - 1 : currentProfile.photos.length - 1
      );
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Finding cultural matches...</p>
        </div>
      </div>
    );
  }

  if (currentIndex >= profiles.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              No More Profiles
            </CardTitle>
            <p className="text-gray-600">You've seen all available matches for now!</p>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setCurrentIndex(0)}
              className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white"
            >
              Start Over
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cultural Matches
          </h1>
          <p className="text-gray-600 mt-2">Discover people who share your cultural interests</p>
        </div>

        {/* Profile Card */}
        <Card className="relative overflow-hidden shadow-xl">
          {/* Photo Section */}
          <div className="relative h-96 bg-gray-100">
            <img 
              src={currentProfile.photos[currentPhotoIndex]} 
              alt={currentProfile.name}
              className="w-full h-full object-cover"
            />
            
            {/* Photo Navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={previousPhoto}
                className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10"
              >
                ←
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={nextPhoto}
                className="bg-white/20 hover:bg-white/40 text-white rounded-full w-10 h-10"
              >
                →
              </Button>
            </div>

            {/* Photo Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {currentProfile.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Online Status */}
            {currentProfile.isOnline && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 text-white">
                  Online
                </Badge>
              </div>
            )}

            {/* Compatibility Score */}
            <div className="absolute top-4 left-4">
              <Badge className={`${getCompatibilityColor(currentProfile.compatibility)} bg-white/90`}>
                {currentProfile.compatibility}% Match
              </Badge>
            </div>
          </div>

          {/* Profile Info */}
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {currentProfile.name}, {currentProfile.age}
                </h2>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{currentProfile.location}</span>
                  <span>•</span>
                  <span>{currentProfile.distance}km away</span>
                </div>
              </div>
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentProfile.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  {currentProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            <p className="text-gray-700 mb-4">{currentProfile.bio}</p>

            {/* Cultural Interests */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Cultural Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.cultural_interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-1">
                <Users className="w-4 h-4" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentProfile.languages.map((language, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Last Active */}
            <p className="text-xs text-gray-500">
              Last active {currentProfile.lastActive}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => handleAction('pass')}
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-red-300 hover:bg-red-50 hover:border-red-400"
          >
            <X className="w-8 h-8 text-red-500" />
          </Button>

          <Button
            onClick={() => handleAction('like')}
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-green-300 hover:bg-green-50 hover:border-green-400"
          >
            <Heart className="w-8 h-8 text-green-500" />
          </Button>

          <Button
            onClick={() => handleAction('superlike')}
            variant="outline"
            size="lg"
            className="w-16 h-16 rounded-full border-yellow-300 hover:bg-yellow-50 hover:border-yellow-400"
          >
            <Star className="w-8 h-8 text-yellow-500" />
          </Button>
        </div>

        {/* Progress */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            {currentIndex + 1} of {profiles.length} profiles
          </p>
        </div>
      </div>
    </div>
  );
};

export default MatchesSection;