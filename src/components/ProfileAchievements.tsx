import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Upload, Users, Heart, Calendar, Target, Zap } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  category: 'upload' | 'social' | 'cultural' | 'engagement';
}

export const ProfileAchievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Upload',
      description: 'Upload your first photo or video',
      icon: <Upload className="w-5 h-5" />,
      earned: true,
      category: 'upload'
    },
    {
      id: '2',
      title: 'Cultural Explorer',
      description: 'Participate in 5 cultural events',
      icon: <Calendar className="w-5 h-5" />,
      earned: true,
      category: 'cultural'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Connect with 10 new friends',
      icon: <Users className="w-5 h-5" />,
      earned: false,
      progress: 7,
      maxProgress: 10,
      category: 'social'
    },
    {
      id: '4',
      title: 'Content Creator',
      description: 'Upload 20 pieces of media',
      icon: <Star className="w-5 h-5" />,
      earned: false,
      progress: 12,
      maxProgress: 20,
      category: 'upload'
    },
    {
      id: '5',
      title: 'Community Favorite',
      description: 'Receive 100 likes on your content',
      icon: <Heart className="w-5 h-5" />,
      earned: false,
      progress: 73,
      maxProgress: 100,
      category: 'engagement'
    },
    {
      id: '6',
      title: 'Streak Master',
      description: 'Log in for 30 consecutive days',
      icon: <Zap className="w-5 h-5" />,
      earned: false,
      progress: 18,
      maxProgress: 30,
      category: 'engagement'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'upload': return 'teal';
      case 'social': return 'blue';
      case 'cultural': return 'purple';
      case 'engagement': return 'green';
      default: return 'gray';
    }
  };

  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-700 flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievements ({earnedCount}/{achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-full ${
                  achievement.earned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${
                      achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                    }`}>
                      {achievement.title}
                    </h3>
                    <Badge variant="outline" className={`text-${getCategoryColor(achievement.category)}-600 border-${getCategoryColor(achievement.category)}-300`}>
                      {achievement.category}
                    </Badge>
                  </div>
                  <p className={`text-sm ${
                    achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                  {!achievement.earned && achievement.progress && achievement.maxProgress && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{achievement.progress}/{achievement.maxProgress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`bg-${getCategoryColor(achievement.category)}-500 h-2 rounded-full transition-all`}
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};