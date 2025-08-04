import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Target, Zap, Crown, Medal } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  game: string;
  unlockedAt?: string;
}

export const GameAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Victory',
      description: 'Win your first game',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: true,
      rarity: 'common',
      game: 'Tic Tac Toe',
      unlockedAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Chess Master',
      description: 'Win 10 chess games',
      icon: <Crown className="w-6 h-6" />,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: 'epic',
      game: 'Chess',
      unlockedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Speed Demon',
      description: 'Win a game in under 2 minutes',
      icon: <Zap className="w-6 h-6" />,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      rarity: 'rare',
      game: 'Connect Four'
    },
    {
      id: '4',
      title: 'Cultural Explorer',
      description: 'Play 5 different cultural games',
      icon: <Star className="w-6 h-6" />,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: 'legendary',
      game: 'Cultural Games',
      unlockedAt: '2024-01-25'
    },
    {
      id: '5',
      title: 'Streak Master',
      description: 'Win 5 games in a row',
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'epic',
      game: 'All Games'
    },
    {
      id: '6',
      title: 'Tournament Champion',
      description: 'Win a tournament',
      icon: <Medal className="w-6 h-6" />,
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'legendary',
      game: 'Tournaments'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            Achievements ({unlockedCount}/{totalCount})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round((unlockedCount / totalCount) * 100)}%</span>
            </div>
            <Progress value={(unlockedCount / totalCount) * 100} className="h-2" />
          </div>
          
          <div className="grid gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? 'text-green-800' : 'text-gray-600'
                      }`}>
                        {achievement.title}
                      </h3>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {achievement.game}
                      </Badge>
                      
                      {achievement.unlockedAt && (
                        <span className="text-xs text-gray-500">
                          Unlocked {achievement.unlockedAt}
                        </span>
                      )}
                    </div>
                    
                    {achievement.progress !== undefined && achievement.maxProgress && !achievement.unlocked && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-1"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};