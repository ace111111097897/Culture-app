import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Users, Trophy, Star, Gamepad2 } from 'lucide-react';

const InteractiveGamesSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameProgress, setGameProgress] = useState<{[key: string]: number}>({
    'cultural-quiz': 0,
    'word-match': 0,
    'trivia': 0
  });
  const [scores, setScores] = useState<{[key: string]: number}>({
    'cultural-quiz': 0,
    'word-match': 0,
    'trivia': 0
  });

  const games = [
    {
      id: 'cultural-quiz',
      title: 'Cultural Quiz Challenge',
      description: 'Test your knowledge about different cultures',
      players: 234,
      difficulty: 'Medium',
      icon: '🌍'
    },
    {
      id: 'word-match',
      title: 'Language Word Match',
      description: 'Match words in different languages',
      players: 156,
      difficulty: 'Easy',
      icon: '📝'
    },
    {
      id: 'trivia',
      title: 'Global Trivia',
      description: 'Answer questions about world cultures',
      players: 89,
      difficulty: 'Hard',
      icon: '🧠'
    }
  ];

  const startGame = (gameId: string) => {
    setActiveGame(gameId);
    // Simulate game progress
    const interval = setInterval(() => {
      setGameProgress(prev => {
        const newProgress = Math.min((prev[gameId] || 0) + 10, 100);
        if (newProgress === 100) {
          clearInterval(interval);
          setScores(prevScores => ({
            ...prevScores,
            [gameId]: (prevScores[gameId] || 0) + Math.floor(Math.random() * 100) + 50
          }));
          setActiveGame(null);
        }
        return { ...prev, [gameId]: newProgress };
      });
    }, 500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-purple-100 to-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="text-purple-600" />
            Interactive Games
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">Challenge yourself and connect with others through fun games!</p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {games.map(game => (
          <Card key={game.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{game.icon}</div>
                  <div>
                    <h3 className="font-bold text-lg">{game.title}</h3>
                    <p className="text-gray-600 text-sm">{game.description}</p>
                  </div>
                </div>
                <Badge className={getDifficultyColor(game.difficulty)}>
                  {game.difficulty}
                </Badge>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {game.players} playing
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Trophy className="w-4 h-4" />
                  Score: {scores[game.id] || 0}
                </div>
              </div>

              {activeGame === game.id ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Playing...</span>
                    <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                  </div>
                  <Progress value={gameProgress[game.id] || 0} className="w-full" />
                  <p className="text-sm text-gray-600">Progress: {gameProgress[game.id] || 0}%</p>
                </div>
              ) : (
                <Button 
                  onClick={() => startGame(game.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-yellow-100 to-orange-100">
        <CardContent className="pt-4">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-yellow-600" />
            <span className="font-semibold">Your Gaming Stats</span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">{Object.values(scores).reduce((a, b) => a + b, 0)}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{Object.values(scores).filter(s => s > 0).length}</div>
              <div className="text-sm text-gray-600">Games Played</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.max(...Object.values(scores), 0)}</div>
              <div className="text-sm text-gray-600">Best Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveGamesSection;