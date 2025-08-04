import React from 'react';
import { Trophy, Star, Award, Crown, Zap, Heart, Users, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const AchievementsTrophies: React.FC = () => {
  const achievements = [
    {
      id: 1,
      title: 'Cultural Explorer',
      description: 'Joined 5 different cultural bubbles',
      icon: Globe,
      earned: true,
      progress: 100,
      rarity: 'common',
      earnedDate: '2024-01-15'
    },
    {
      id: 2,
      title: 'Social Butterfly',
      description: 'Made 10 new friends',
      icon: Users,
      earned: true,
      progress: 100,
      rarity: 'uncommon',
      earnedDate: '2024-01-20'
    },
    {
      id: 3,
      title: 'Love Connector',
      description: 'Successfully matched with 3 people',
      icon: Heart,
      earned: false,
      progress: 66,
      rarity: 'rare',
      earnedDate: null
    },
    {
      id: 4,
      title: 'Master Communicator',
      description: 'Send 100 messages',
      icon: Zap,
      earned: true,
      progress: 100,
      rarity: 'epic',
      earnedDate: '2024-01-25'
    },
    {
      id: 5,
      title: 'Legendary Curator',
      description: 'Create 50 cultural cubbles',
      icon: Crown,
      earned: false,
      progress: 24,
      rarity: 'legendary',
      earnedDate: null
    }
  ];

  const trophies = [
    {
      id: 1,
      title: 'Weekly Champion',
      description: 'Most active user this week',
      icon: Trophy,
      type: 'weekly',
      earned: true
    },
    {
      id: 2,
      title: 'Monthly Star',
      description: 'Top contributor this month',
      icon: Star,
      type: 'monthly',
      earned: false
    },
    {
      id: 3,
      title: 'Community Leader',
      description: 'Helped 20+ users find connections',
      icon: Award,
      type: 'special',
      earned: true
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'uncommon': return 'bg-green-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTrophyColor = (type: string) => {
    switch (type) {
      case 'weekly': return 'text-green-600';
      case 'monthly': return 'text-blue-600';
      case 'special': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                      : 'bg-gray-50 border-gray-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <IconComponent className={`w-5 h-5 ${achievement.earned ? 'text-purple-600' : 'text-gray-400'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.title}
                        </h3>
                        <Badge className={`text-xs ${getRarityColor(achievement.rarity)} text-white`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className={`text-sm mb-2 ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                      {!achievement.earned && (
                        <div className="space-y-1">
                          <Progress value={achievement.progress} className="h-2" />
                          <p className="text-xs text-gray-500">{achievement.progress}% complete</p>
                        </div>
                      )}
                      {achievement.earned && achievement.earnedDate && (
                        <p className="text-xs text-purple-600 font-medium">
                          Earned on {new Date(achievement.earnedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Trophies Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Trophies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {trophies.map((trophy) => {
              const IconComponent = trophy.icon;
              return (
                <div
                  key={trophy.id}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    trophy.earned
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-75'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    trophy.earned ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <IconComponent className={`w-6 h-6 ${trophy.earned ? getTrophyColor(trophy.type) : 'text-gray-400'}`} />
                  </div>
                  <h3 className={`font-semibold mb-1 ${trophy.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                    {trophy.title}
                  </h3>
                  <p className={`text-sm ${trophy.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {trophy.description}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`mt-2 text-xs ${trophy.earned ? getTrophyColor(trophy.type) : 'text-gray-400'}`}
                  >
                    {trophy.type}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Achievement Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {achievements.filter(a => a.earned).length}
              </div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {trophies.filter(t => t.earned).length}
              </div>
              <div className="text-sm text-gray-600">Trophies</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(achievements.reduce((acc, a) => acc + a.progress, 0) / achievements.length)}%
              </div>
              <div className="text-sm text-gray-600">Completion</div>
            </div>
            <div className="p-3 bg-pink-50 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">
                {achievements.filter(a => a.rarity === 'legendary' && a.earned).length}
              </div>
              <div className="text-sm text-gray-600">Legendary</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AchievementsTrophies;