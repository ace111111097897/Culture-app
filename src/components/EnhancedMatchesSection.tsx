import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Heart, Brain, Sparkles, Users, RefreshCw, Filter } from 'lucide-react';
import AIMatchCard from './AIMatchCard';
import CubbletonAIMatchEngine from './CubbletonAIMatchEngine';
import FakeUserManager from './FakeUserManager';
import { supabase } from '@/lib/supabase';

interface AIMatch {
  id: string;
  name: string;
  age: number;
  culture: string;
  location: string;
  matchPercentage: number;
  avatar: string;
  lastActive: string;
  commonInterests: string[];
  isNewMatch: boolean;
  aiReason: string;
  icebreaker: string;
  culturalCompatibility: string[];
  sharedCubbles: string[];
}

const EnhancedMatchesSection: React.FC = () => {
  const [matches, setMatches] = useState<AIMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'cultural' | 'event' | 'discovery'>('all');

  const generateAIMatches = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          message: 'Generate personalized cultural matches with icebreakers',
          context: 'match_generation'
        }
      });

      // Mock AI-generated matches with enhanced features
      const aiMatches: AIMatch[] = [
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
          isNewMatch: true,
          aiReason: 'Both love Bollywood cinema and share passion for traditional cooking. High cultural exchange potential.',
          icebreaker: 'I noticed you love Bollywood movies! What\'s your favorite recent film? I\'m always looking for new recommendations.',
          culturalCompatibility: ['Food Culture', 'Cinema Appreciation', 'Family Values'],
          sharedCubbles: ['Bollywood Hub', 'Global Cuisine']
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
          isNewMatch: false,
          aiReason: 'Shared interest in martial arts philosophy and visual storytelling through photography.',
          icebreaker: 'Your photography skills are amazing! Do you incorporate martial arts philosophy into your visual compositions?',
          culturalCompatibility: ['Artistic Expression', 'Physical Wellness', 'Gaming Culture'],
          sharedCubbles: ['Martial Arts Masters', 'Photography Circle']
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
          isNewMatch: true,
          aiReason: 'Perfect match for cultural celebration and artistic expression. Both value vibrant community traditions.',
          icebreaker: 'I see you\'re into traditional Mexican art! Have you ever tried creating Day of the Dead artwork? I\'d love to learn more about the cultural significance.',
          culturalCompatibility: ['Artistic Heritage', 'Music & Dance', 'Community Celebration'],
          sharedCubbles: ['Latin Dance', 'Cultural Art']
        }
      ];
      
      setMatches(aiMatches);
    } catch (error) {
      console.error('Error generating AI matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAIMatches();
  }, []);

  const handleMessage = (matchId: string) => {
    console.log('Starting conversation with match:', matchId);
    // Implement messaging functionality
  };

  const handlePass = (matchId: string) => {
    setMatches(prev => prev.filter(match => match.id !== matchId));
    console.log('Passed on match:', matchId);
  };

  const handleFeedback = async (matchId: string, rating: number) => {
    try {
      await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          message: `User rated match ${matchId} with ${rating} stars`,
          context: 'feedback_learning'
        }
      });
      console.log('Feedback submitted for match:', matchId, 'Rating:', rating);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const filteredMatches = matches.filter(match => {
    if (filterType === 'all') return true;
    if (filterType === 'cultural') return match.culturalCompatibility.length > 2;
    if (filterType === 'event') return match.sharedCubbles.length > 0;
    if (filterType === 'discovery') return match.matchPercentage < 90;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          <Brain className="inline h-8 w-8 mr-2 text-purple-600" />
          AI-Powered Matches
        </h1>
        <p className="text-gray-600">Cultural connections enhanced by Cubbleton AI</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <CubbletonAIMatchEngine />
        </div>
        
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <span>Your AI Matches</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="all">All Matches</option>
                      <option value="cultural">High Cultural Compatibility</option>
                      <option value="event">Shared Cubbles</option>
                      <option value="discovery">Cultural Discovery</option>
                    </select>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={generateAIMatches}
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Badge variant="secondary">{filteredMatches.length} matches</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse p-6 border rounded-lg">
                      <div className="flex space-x-4">
                        <div className="rounded-full bg-gray-200 h-16 w-16"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredMatches.length > 0 ? (
                filteredMatches.map((match) => (
                  <AIMatchCard
                    key={match.id}
                    match={match}
                    onMessage={handleMessage}
                    onPass={handlePass}
                    onFeedback={handleFeedback}
                  />
                ))
              ) : (
                <div className="text-center p-8">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your filters or refresh for new AI-generated matches.</p>
                  <Button onClick={generateAIMatches} className="bg-purple-600 hover:bg-purple-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate New Matches
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Fake User Manager for Testing */}
      <div className="mt-8">
        <FakeUserManager />
      </div>
    </div>
  );
};

export default EnhancedMatchesSection;