import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, TrendingUp } from 'lucide-react';
import GameCard from './GameCard';

interface Game {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  players: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  playTime: string;
  featured?: boolean;
}

interface GameLibraryProps {
  onPlayGame: (gameId: string, gameName: string) => void;
}

const GameLibrary: React.FC<GameLibraryProps> = ({ onPlayGame }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const games: Game[] = [
    {
      id: 'uno',
      name: 'UNO',
      description: 'Classic card game where you match colors and numbers. Be the first to play all your cards!',
      icon: '🎴',
      category: 'Card Games',
      players: '2-4',
      difficulty: 'Easy',
      rating: 4.8,
      playTime: '10-15 min',
      featured: true
    },
    {
      id: 'dominoes',
      name: 'Dominoes',
      description: 'Strategic tile-laying game. Match the dots and block your opponents!',
      icon: '🀫',
      category: 'Board Games',
      players: '2-4',
      difficulty: 'Medium',
      rating: 4.6,
      playTime: '15-20 min'
    },
    {
      id: 'chess',
      name: 'Chess',
      description: 'The ultimate strategy game. Checkmate your opponent\'s king to win!',
      icon: '♟️',
      category: 'Strategy',
      players: '2',
      difficulty: 'Hard',
      rating: 4.9,
      playTime: '30-60 min',
      featured: true
    },
    {
      id: 'checkers',
      name: 'Checkers',
      description: 'Jump over your opponent\'s pieces and reach the other side of the board.',
      icon: '🔴',
      category: 'Strategy',
      players: '2',
      difficulty: 'Medium',
      rating: 4.4,
      playTime: '15-25 min'
    },
    {
      id: 'tic-tac-toe',
      name: 'Tic Tac Toe',
      description: 'Get three in a row before your opponent does in this classic game.',
      icon: '❌',
      category: 'Puzzle',
      players: '2',
      difficulty: 'Easy',
      rating: 4.2,
      playTime: '2-5 min'
    },
    {
      id: 'connect-four',
      name: 'Connect Four',
      description: 'Drop checkers and try to connect four in a row vertically, horizontally, or diagonally.',
      icon: '🔵',
      category: 'Puzzle',
      players: '2',
      difficulty: 'Easy',
      rating: 4.5,
      playTime: '5-10 min'
    }
  ];

  const categories = ['All', 'Card Games', 'Board Games', 'Strategy', 'Puzzle'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGames = games.filter(game => game.featured);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <Card className="bg-white/10 backdrop-blur border-white/20">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/20 border-white/30 text-white placeholder-white/50"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className={selectedCategory === category 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-white/20 border-white/30 text-white hover:bg-white/30"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Games */}
      {featuredGames.length > 0 && selectedCategory === 'All' && !searchTerm && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Featured Games
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredGames.map(game => (
              <GameCard key={game.id} {...game} onPlay={onPlayGame} />
            ))}
          </div>
        </div>
      )}

      {/* All Games */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          {searchTerm ? `Search Results (${filteredGames.length})` : 'All Games'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map(game => (
            <GameCard key={game.id} {...game} onPlay={onPlayGame} />
          ))}
        </div>
        {filteredGames.length === 0 && (
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-8 text-center">
              <p className="text-white/70">No games found matching your criteria</p>
              <p className="text-white/50 text-sm mt-1">Try adjusting your search or filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GameLibrary;