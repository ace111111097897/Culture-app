import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Trophy, Users, Clock, Play, Star } from 'lucide-react';
import CubbletonQuizGame from '../CubbletonQuizGame';

const UpdatedGamesPage: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'cubbleton-quiz',
      title: 'Best Cubbleton Quiz',
      description: 'Test your cultural knowledge in this interactive quiz game',
      players: 1247,
      category: 'Quiz',
      difficulty: 'Medium',
      rating: 4.8,
      thumbnail: '/placeholder.svg',
      featured: true
    },
    {
      id: 'culture-match',
      title: 'Culture Match',
      description: 'Match cultural items with their origins',
      players: 892,
      category: 'Puzzle',
      difficulty: 'Easy',
      rating: 4.6,
      thumbnail: '/placeholder.svg'
    },
    {
      id: 'world-explorer',
      title: 'World Explorer',
      description: 'Virtual cultural exploration adventure',
      players: 2156,
      category: 'Adventure',
      difficulty: 'Hard',
      rating: 4.9,
      thumbnail: '/placeholder.svg'
    }
  ];

  if (activeGame === 'cubbleton-quiz') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setActiveGame(null)}
              className="border-orange-200 hover:bg-orange-50"
            >
              ← Back to Games
            </Button>
          </div>
          <CubbletonQuizGame />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Cultural Games
          </h1>
          <p className="text-gray-600">Learn about cultures through interactive games and challenges</p>
        </div>

        {/* Featured Game */}
        <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-pink-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-orange-500" />
                <span>Featured Game</span>
              </CardTitle>
              <Badge className="bg-orange-500 text-white">New</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-2">Best Cubbleton Quiz</h3>
                <p className="text-gray-600 mb-4">
                  Challenge yourself and others with questions about cultures from around the world. 
                  Compete in real-time with players globally and climb the leaderboard!
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">1,247 playing</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">4.8 rating</span>
                  </div>
                  <Badge variant="outline" className="border-orange-200">Quiz</Badge>
                </div>
                <Button 
                  onClick={() => setActiveGame('cubbleton-quiz')}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                  <Gamepad2 className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <Card key={game.id} className="group hover:shadow-lg transition-all duration-300 border-purple-100">
              <div className="relative">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
                <div className="absolute top-3 right-3">
                  {game.featured && (
                    <Badge className="bg-orange-500 text-white">Featured</Badge>
                  )}
                </div>
                <Button 
                  size="sm" 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm hover:bg-white/30"
                  onClick={() => game.id === 'cubbleton-quiz' && setActiveGame(game.id)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{game.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{game.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{game.players} players</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{game.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="border-purple-200">
                    {game.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`${
                      game.difficulty === 'Easy' ? 'border-green-200 text-green-700' :
                      game.difficulty === 'Medium' ? 'border-yellow-200 text-yellow-700' :
                      'border-red-200 text-red-700'
                    }`}
                  >
                    {game.difficulty}
                  </Badge>
                </div>
                
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => game.id === 'cubbleton-quiz' && setActiveGame(game.id)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play Game
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Game Categories */}
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="h-5 w-5 text-blue-500" />
              <span>Game Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Quiz', 'Puzzle', 'Adventure', 'Strategy'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="h-16 border-blue-200 hover:bg-blue-50"
                >
                  <div className="text-center">
                    <Gamepad2 className="h-6 w-6 mx-auto mb-1 text-blue-500" />
                    <span className="text-sm">{category}</span>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatedGamesPage;