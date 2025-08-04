import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GameRecommendation {
  id: string;
  name: string;
  icon: string;
  reason: string;
  skillMatch: number;
  popularity: number;
  estimatedTime: string;
  players: string;
  culturalTheme?: string;
}

interface AIGameRecommendationsProps {
  userId: string;
  onPlayGame: (gameId: string, gameName: string) => void;
}

const AIGameRecommendations: React.FC<AIGameRecommendationsProps> = ({
  userId,
  onPlayGame
}) => {
  const [recommendations, setRecommendations] = useState<GameRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    favoriteGenre: 'Strategy',
    skillLevel: 'Intermediate',
    playTime: '15-30 min',
    culturalInterests: ['Caribbean', 'African']
  });

  useEffect(() => {
    generateRecommendations();
  }, [userId]);

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      // Simulate AI analysis of user preferences and game history
      const aiRecommendations: GameRecommendation[] = [
        {
          id: 'dominoes',
          name: 'Caribbean Dominoes',
          icon: '🀫',
          reason: 'Matches your Caribbean cultural interests and strategy preference',
          skillMatch: 95,
          popularity: 88,
          estimatedTime: '20-30 min',
          players: '2-4',
          culturalTheme: 'Caribbean'
        },
        {
          id: 'chess',
          name: 'Chess',
          icon: '♟️',
          reason: 'Perfect for your intermediate strategy skill level',
          skillMatch: 92,
          popularity: 95,
          estimatedTime: '15-45 min',
          players: '2'
        },
        {
          id: 'uno',
          name: 'UNO',
          icon: '🎴',
          reason: 'Quick games matching your preferred play time',
          skillMatch: 85,
          popularity: 92,
          estimatedTime: '10-20 min',
          players: '2-4'
        },
        {
          id: 'cultural-trivia',
          name: 'Cultural Trivia',
          icon: '🧠',
          reason: 'Explore African heritage through engaging questions',
          skillMatch: 88,
          popularity: 78,
          estimatedTime: '15-25 min',
          players: '1-6',
          culturalTheme: 'African'
        }
      ];

      setRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error generating recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSkillColor = (skill: number) => {
    if (skill >= 90) return 'bg-green-500';
    if (skill >= 80) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Brain className="w-5 h-5 text-blue-400 animate-pulse" />
            <h3 className="text-lg font-semibold text-white">Cubbleton AI is analyzing...</h3>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-white/10 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
          </div>
          <Badge className="bg-blue-600 text-white">
            Personalized for You
          </Badge>
        </div>

        <div className="space-y-4">
          {recommendations.map((game) => (
            <div
              key={game.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{game.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold">{game.name}</h4>
                    {game.culturalTheme && (
                      <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                        {game.culturalTheme} Culture
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  onClick={() => onPlayGame(game.id, game.name)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  Play Now
                </Button>
              </div>

              <p className="text-white/70 text-sm mb-3">{game.reason}</p>

              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${getSkillColor(game.skillMatch)}`}></div>
                  <span className="text-white/60">{game.skillMatch}% match</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-white/60" />
                  <span className="text-white/60">{game.popularity}% popular</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-white/60" />
                  <span className="text-white/60">{game.estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-white/60" />
                  <span className="text-white/60">{game.players}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-500/20 rounded-lg border border-blue-400/30">
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white font-medium text-sm">Your Gaming Profile</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
            <span>Favorite: {userStats.favoriteGenre}</span>
            <span>Skill: {userStats.skillLevel}</span>
            <span>Play Time: {userStats.playTime}</span>
            <span>Interests: {userStats.culturalInterests.join(', ')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIGameRecommendations;