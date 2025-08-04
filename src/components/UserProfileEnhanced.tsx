import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, Star, GamepadIcon, Users, Calendar, 
  Settings, Edit3, Share, Gift, Shield, Award
} from 'lucide-react';

interface UserProfileEnhancedProps {
  user: any;
  onEdit: () => void;
  onBack: () => void;
}

const UserProfileEnhanced: React.FC<UserProfileEnhancedProps> = ({ 
  user, 
  onEdit, 
  onBack 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const userStats = {
    level: 15,
    xp: 2450,
    nextLevelXp: 3000,
    gamesPlayed: 127,
    wins: 89,
    winRate: 70,
    currentStreak: 5,
    bestStreak: 12
  };

  const achievements = [
    {
      id: 1,
      name: 'First Victory',
      description: 'Win your first game',
      icon: '🏆',
      rarity: 'common',
      unlockedAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Social Butterfly',
      description: 'Play with 10 different players',
      icon: '🦋',
      rarity: 'rare',
      unlockedAt: '2024-01-05'
    },
    {
      id: 3,
      name: 'Tournament Champion',
      description: 'Win a tournament',
      icon: '👑',
      rarity: 'epic',
      unlockedAt: '2024-01-10'
    }
  ];

  const gameStats = [
    { game: 'UNO', played: 45, wins: 32, winRate: 71 },
    { game: 'Chess', played: 38, wins: 28, winRate: 74 },
    { game: 'Dominoes', played: 25, wins: 16, winRate: 64 },
    { game: 'Poker', played: 19, wins: 13, winRate: 68 }
  ];

  const getRarityColor = (rarity: string) => {
    const colors = {
      'common': 'bg-gray-100 text-gray-800',
      'rare': 'bg-blue-100 text-blue-800',
      'epic': 'bg-purple-100 text-purple-800',
      'legendary': 'bg-yellow-100 text-yellow-800'
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  const xpProgress = (userStats.xp / userStats.nextLevelXp) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={onBack}>
            ← Back
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-2xl">
                    {user?.user_metadata?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Badge className="mb-2">
                  Level {userStats.level}
                </Badge>
                <Badge variant="outline">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">
                  {user?.user_metadata?.name || 'Anonymous User'}
                </h1>
                <p className="text-gray-600 mb-4">
                  "Master of strategy games and community builder"
                </p>
                
                {/* XP Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Experience Points</span>
                    <span>{userStats.xp} / {userStats.nextLevelXp} XP</span>
                  </div>
                  <Progress value={xpProgress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">
                    {userStats.nextLevelXp - userStats.xp} XP to next level
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {userStats.gamesPlayed}
                    </div>
                    <div className="text-sm text-gray-600">Games Played</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {userStats.winRate}%
                    </div>
                    <div className="text-sm text-gray-600">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {userStats.currentStreak}
                    </div>
                    <div className="text-sm text-gray-600">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {achievements.length}
                    </div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="games">Game Stats</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.slice(0, 3).map(achievement => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{achievement.name}</div>
                          <div className="text-sm text-gray-600">{achievement.description}</div>
                        </div>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GamepadIcon className="h-5 w-5 text-blue-500" />
                    Favorite Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {gameStats.slice(0, 3).map(game => (
                      <div key={game.game} className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{game.game}</div>
                          <div className="text-sm text-gray-600">
                            {game.played} games played
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-green-600">
                            {game.winRate}%
                          </div>
                          <div className="text-sm text-gray-600">
                            {game.wins} wins
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3">{achievement.icon}</div>
                    <h3 className="font-bold mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-2">
                      Unlocked {achievement.unlockedAt}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Game Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {gameStats.map(game => (
                    <div key={game.game} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{game.game}</h3>
                        <Badge variant="outline">{game.winRate}% win rate</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Games Played</div>
                          <div className="font-medium">{game.played}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Wins</div>
                          <div className="font-medium text-green-600">{game.wins}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Losses</div>
                          <div className="font-medium text-red-600">{game.played - game.wins}</div>
                        </div>
                      </div>
                      <Progress value={game.winRate} className="mt-2 h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfileEnhanced;