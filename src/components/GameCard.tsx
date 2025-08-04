import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Star, Trophy, Clock } from 'lucide-react';

interface GameCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  playTime: string;
  onPlay: (gameId: string, gameName: string) => void;
  featured?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  name,
  description,
  icon,
  category,
  players,
  difficulty,
  rating,
  playTime,
  onPlay,
  featured = false
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className={`bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all duration-300 ${featured ? 'ring-2 ring-yellow-400' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="font-bold text-white text-lg flex items-center">
                {name}
                {featured && <Trophy className="w-4 h-4 ml-2 text-yellow-400" />}
              </h3>
              <Badge variant="outline" className="text-xs bg-white/20 border-white/30 text-white">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{rating}</span>
          </div>
        </div>

        <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-white/70">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {players}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {playTime}
            </div>
          </div>
          <Badge className={`${getDifficultyColor(difficulty)} text-white text-xs`}>
            {difficulty}
          </Badge>
        </div>

        <Button
          onClick={() => onPlay(id, name)}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
          Play Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default GameCard;