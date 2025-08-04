import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Users, 
  Star, 
  MessageCircle,
  Sparkles,
  TrendingUp,
  Globe,
  Music,
  Palette
} from 'lucide-react';

export const EnhancedCulturalMatchmaking: React.FC = () => {
  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Maya Patel',
      avatar: '/placeholder.svg',
      compatibilityScore: 94,
      sharedInterests: ['Indian Classical Dance', 'Yoga', 'Meditation'],
      culturalBackground: 'Indian-American',
      zodiacSign: 'Libra',
      matchReason: 'Strong cultural alignment and shared artistic interests'
    },
    {
      id: 2,
      name: 'Kenji Tanaka',
      avatar: '/placeholder.svg',
      compatibilityScore: 87,
      sharedInterests: ['Japanese Tea Ceremony', 'Calligraphy', 'Zen Philosophy'],
      culturalBackground: 'Japanese',
      zodiacSign: 'Virgo',
      matchReason: 'Complementary cultural perspectives and mindfulness practices'
    },
    {
      id: 3,
      name: 'Sofia Rodriguez',
      avatar: '/placeholder.svg',
      compatibilityScore: 91,
      sharedInterests: ['Latin Dance', 'Cooking', 'Family Traditions'],
      culturalBackground: 'Mexican-Spanish',
      zodiacSign: 'Leo',
      matchReason: 'Vibrant cultural expression and community-focused values'
    }
  ]);

  const compatibilityFactors = [
    { factor: 'Cultural Interests', score: 92, icon: Globe },
    { factor: 'Artistic Expression', score: 88, icon: Palette },
    { factor: 'Music Preferences', score: 85, icon: Music },
    { factor: 'Social Values', score: 90, icon: Users }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-6">
      {/* Compatibility Analysis */}
      <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Cultural Compatibility Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-600 mb-3">Compatibility Factors</h4>
              <div className="space-y-3">
                {compatibilityFactors.map((factor, index) => {
                  const IconComponent = factor.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-gray-700">{factor.factor}</span>
                      </div>
                      <Badge className={getScoreColor(factor.score)}>
                        {factor.score}%
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-teal-600 mb-3">Matching Algorithm</h4>
              <p className="text-sm text-gray-600 mb-2">
                Our AI analyzes personality traits, cultural interests, and interaction patterns
              </p>
              <p className="text-sm text-gray-600 mb-2">
                Zodiac compatibility and cultural background are weighted factors
              </p>
              <Button variant="outline" className="text-teal-600 border-teal-300">
                <TrendingUp className="w-4 h-4 mr-2" />
                View Algorithm Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Matches */}
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-700 flex items-center gap-2">
            <Heart className="w-5 h-5" />
            Your Cultural Matches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={match.avatar} />
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {match.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{match.name}</h4>
                      <Badge className={getScoreColor(match.compatibilityScore)}>
                        {match.compatibilityScore}% Match
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{match.culturalBackground} • {match.zodiacSign}</p>
                    <p className="text-sm text-gray-700 mb-3">{match.matchReason}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {match.sharedInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-teal-600 hover:bg-teal-700">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                      <Button size="sm" variant="outline" className="text-teal-600 border-teal-300">
                        <Star className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Adaptive Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Adaptive Connection Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-2">Learning from Your Interactions</h4>
              <p className="text-sm text-blue-600 mb-2">
                Based on your recent connections with users interested in Asian cultures, 
                we're prioritizing matches with similar cultural backgrounds.
              </p>
              <p className="text-sm text-blue-600">
                Your engagement with dance-related content suggests strong artistic compatibility.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">Suggested Discussion Topics</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Traditional Festivals
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Cultural Exchange
                </Badge>
                <Badge variant="outline" className="text-green-600 border-green-300">
                  Art & Expression
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};