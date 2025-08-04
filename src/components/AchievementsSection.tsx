import React from 'react';
import { Trophy, Star, Users, Heart, Zap, Crown, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AchievementsSection: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Culture Explorer',
      description: 'Joined 5 different cultural cubbles',
      icon: Trophy,
      earned: true,
      rarity: 'common',
      progress: 5,
      maxProgress: 5,
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Community Builder',
      description: 'Created your first cubble',
      icon: Users,
      earned: true,
      rarity: 'uncommon',
      progress: 1,
      maxProgress: 1,
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Social Butterfly',
      description: 'Made 50 connections',
      icon: Heart,
      earned: false,
      rarity: 'rare',
      progress: 32,
      maxProgress: 50,
      earnedDate: null
    },
    {
      id: 4,
      title: 'Cubbleton Expert',
      description: 'Used AI recommendations 100 times',
      icon: Zap,
      earned: false,
      rarity: 'epic',
      progress: 67,
      maxProgress: 100,
      earnedDate: null
    },
    {
      id: 5,
      title: 'Cultural Ambassador',
      description: 'Helped 25 users discover their culture',
      icon: Crown,
      earned: true,
      rarity: 'legendary',
      progress: 25,
      maxProgress: 25,
      earnedDate: '2024-02-01'
    },
    {
      id: 6,
      title: 'Perfect Match',
      description: 'Found 10 highly compatible matches',
      icon: Target,
      earned: false,
      rarity: 'rare',
      progress: 7,
      maxProgress: 10,
      earnedDate: null
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'uncommon': return 'bg-green-100 text-green-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const inProgressAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-purple-900">Achievements</h2>
          <p className="text-gray-600">Your cultural journey milestones</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{earnedAchievements.length}</div>
          <div className="text-sm text-gray-500">Earned</div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{earnedAchievements.length}</div>
            <div className="text-sm text-gray-500">Total Earned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">
              {earnedAchievements.filter(a => a.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-gray-500">Legendary</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{inProgressAchievements.length}</div>
            <div className="text-sm text-gray-500">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Award className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">
              {Math.round((earnedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-500">Completion</div>
          </CardContent>
        </Card>
      </div>

      {/* Earned Achievements */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Earned Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <Card key={achievement.id} className="border-2 border-green-200 bg-green-50">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-8 h-8 text-green-600" />
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  <div className="text-xs text-green-600">
                    Earned on {new Date(achievement.earnedDate!).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* In Progress Achievements */}
      <div>
        <h3 className="text-xl font-semibold mb-4">In Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inProgressAchievements.map((achievement) => {
            const IconComponent = achievement.icon;
            const progressPercentage = (achievement.progress / achievement.maxProgress) * 100;
            
            return (
              <Card key={achievement.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <IconComponent className="w-8 h-8 text-gray-400" />
                    <Badge className={getRarityColor(achievement.rarity)}>
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;