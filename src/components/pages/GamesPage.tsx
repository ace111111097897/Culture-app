import React, { useState } from 'react';
import { Gamepad2, Users, Trophy, Play, Star, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface GamesPageProps {
  onBack?: () => void;
}

const GamesPage: React.FC<GamesPageProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState('cultural');
  const culturalGames = [
    {
      id: 1,
      title: 'Culture Quiz Challenge',
      description: 'Test your knowledge of world cultures',
      players: 1247,
      difficulty: 'Medium',
      duration: '10 min',
      rating: 4.8,
      image: '🌍',
      category: 'Quiz'
    },
    {
      id: 2,
      title: 'Language Memory Match',
      description: 'Match words in different languages',
      players: 892,
      difficulty: 'Easy',
      duration: '5 min',
      rating: 4.6,
      image: '🗣️',
      category: 'Memory'
    },
    {
      id: 3,
      title: 'Traditional Recipe Builder',
      description: 'Create authentic dishes from around the world',
      players: 634,
      difficulty: 'Hard',
      duration: '15 min',
      rating: 4.9,
      image: '👨‍🍳',
      category: 'Simulation'
    }
  ];

  const tournaments = [
    {
      id: 1,
      title: 'Global Culture Championship',
      startDate: 'Nov 20, 2024',
      prize: '1000 Cubble Points',
      participants: 156,
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Asian Languages Tournament',
      startDate: 'Nov 25, 2024',
      prize: 'Premium Badge',
      participants: 89,
      status: 'Registration Open'
    }
  ];

  const achievements = [
    { name: 'Culture Explorer', progress: 75, total: 100, icon: '🌍' },
    { name: 'Language Master', progress: 45, total: 50, icon: '🗣️' },
    { name: 'Recipe Collector', progress: 23, total: 30, icon: '👨‍🍳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        {onBack && (
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-black hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        )}
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Cultural Games Hub
          </h1>
          <p className="text-black">Learn cultures through fun and interactive games</p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {['cultural', 'tournaments', 'achievements'].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                : ''
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* Cultural Games */}
        {activeCategory === 'cultural' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Featured Cultural Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalGames.map((game) => (
                <Card key={game.id} className="hover:shadow-lg transition-shadow group">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{game.image}</div>
                      <h3 className="text-xl font-semibold text-gray-900">{game.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{game.description}</p>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Players:</span>
                        <span className="font-medium">{game.players.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{game.duration}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Difficulty:</span>
                        <Badge variant={game.difficulty === 'Easy' ? 'default' : 
                                      game.difficulty === 'Medium' ? 'secondary' : 'destructive'}>
                          {game.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{game.rating}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Play className="h-4 w-4 mr-2" />
                      Play Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Tournaments */}
        {activeCategory === 'tournaments' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Cultural Tournaments</h2>
            {tournaments.map((tournament) => (
              <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{tournament.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Starts {tournament.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{tournament.participants} participants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Prize: {tournament.prize}</span>
                      </div>
                    </div>
                    <Badge className={tournament.status === 'Upcoming' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-green-100 text-green-800'
                    }>
                      {tournament.status}
                    </Badge>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <Trophy className="h-4 w-4 mr-2" />
                    Join Tournament
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Achievements */}
        {activeCategory === 'achievements' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-6">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.name}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.total}</span>
                      </div>
                      <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {achievement.total - achievement.progress} more to unlock!
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;