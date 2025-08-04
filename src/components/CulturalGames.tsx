import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe, Users, Clock, Star } from 'lucide-react';

interface CulturalGame {
  id: string;
  name: string;
  origin: string;
  flag: string;
  description: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  playTime: string;
  rating: number;
  category: string;
}

interface CulturalGamesProps {
  onPlayGame: (gameId: string, gameName: string) => void;
}

const CulturalGames: React.FC<CulturalGamesProps> = ({ onPlayGame }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const culturalGames: CulturalGame[] = [
    {
      id: 'xiangqi',
      name: 'Xiangqi (Chinese Chess)',
      origin: 'China',
      flag: '🇨🇳',
      description: 'Ancient Chinese strategy game with unique pieces and river crossing mechanics.',
      players: '2',
      difficulty: 'Hard',
      playTime: '30-60 min',
      rating: 4.8,
      category: 'Strategy'
    },
    {
      id: 'go',
      name: 'Go (Weiqi)',
      origin: 'China/Japan',
      flag: '🇯🇵',
      description: 'Ancient board game of territorial control with simple rules but deep strategy.',
      players: '2',
      difficulty: 'Hard',
      playTime: '45-90 min',
      rating: 4.9,
      category: 'Strategy'
    },
    {
      id: 'mancala',
      name: 'Mancala',
      origin: 'Africa',
      flag: '🌍',
      description: 'Traditional African counting game played with seeds or stones.',
      players: '2',
      difficulty: 'Medium',
      playTime: '15-30 min',
      rating: 4.5,
      category: 'Traditional'
    },
    {
      id: 'shogi',
      name: 'Shogi',
      origin: 'Japan',
      flag: '🇯🇵',
      description: 'Japanese chess variant where captured pieces can be returned to play.',
      players: '2',
      difficulty: 'Hard',
      playTime: '30-60 min',
      rating: 4.7,
      category: 'Strategy'
    },
    {
      id: 'patolli',
      name: 'Patolli',
      origin: 'Mesoamerica',
      flag: '🏛️',
      description: 'Ancient Aztec racing board game with religious significance.',
      players: '2-4',
      difficulty: 'Medium',
      playTime: '20-40 min',
      rating: 4.3,
      category: 'Racing'
    },
    {
      id: 'carrom',
      name: 'Carrom',
      origin: 'India',
      flag: '🇮🇳',
      description: 'Flicking game similar to billiards played on a wooden board.',
      players: '2-4',
      difficulty: 'Medium',
      playTime: '15-30 min',
      rating: 4.6,
      category: 'Skill'
    },
    {
      id: 'fanorona',
      name: 'Fanorona',
      origin: 'Madagascar',
      flag: '🇲🇬',
      description: 'Strategic board game involving capturing by approach and withdrawal.',
      players: '2',
      difficulty: 'Hard',
      playTime: '30-45 min',
      rating: 4.4,
      category: 'Strategy'
    },
    {
      id: 'tablut',
      name: 'Tablut',
      origin: 'Scandinavia',
      flag: '🇸🇪',
      description: 'Viking asymmetric strategy game where one player defends the king.',
      players: '2',
      difficulty: 'Medium',
      playTime: '20-40 min',
      rating: 4.2,
      category: 'Strategy'
    }
  ];

  const categories = ['all', 'Strategy', 'Traditional', 'Racing', 'Skill'];

  const filteredGames = selectedCategory === 'all' 
    ? culturalGames 
    : culturalGames.filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-600';
      case 'Medium': return 'bg-yellow-600';
      case 'Hard': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="w-6 h-6 mr-2" />
          Cultural Games Around the World
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/10 text-white border-white/30 hover:bg-white/20'
              }`}
            >
              {category === 'all' ? 'All Games' : category}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGames.map((game) => (
            <Card key={game.id} className="bg-white/5 border-white/20 hover:bg-white/10 transition-all">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold text-lg flex items-center">
                      <span className="text-2xl mr-2">{game.flag}</span>
                      {game.name}
                    </h3>
                    <p className="text-white/60 text-sm">{game.origin}</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
                
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 text-sm text-white/60">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {game.players}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {game.playTime}
                    </div>
                  </div>
                  <Badge className={`${getDifficultyColor(game.difficulty)} text-white text-xs`}>
                    {game.difficulty}
                  </Badge>
                </div>
                
                <Button
                  onClick={() => onPlayGame(game.id, game.name)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  Play {game.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CulturalGames;