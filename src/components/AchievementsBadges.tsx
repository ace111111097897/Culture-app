import React from 'react';
import { Trophy, Star, Award, Target, Users, Calendar, MessageSquare, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'cultural' | 'social' | 'engagement' | 'special';
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Highlight {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'achievement' | 'event' | 'contribution';
  icon: string;
}

interface AchievementsBadgesProps {
  achievements: Achievement[];
  highlights: Highlight[];
  totalPoints: number;
  rank: string;
}

const AchievementsBadges: React.FC<AchievementsBadgesProps> = ({
  achievements,
  highlights,
  totalPoints,
  rank
}) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 border-gray-300 text-gray-700';
      case 'rare': return 'bg-blue-100 border-blue-300 text-blue-700';
      case 'epic': return 'bg-purple-100 border-purple-300 text-purple-700';
      case 'legendary': return 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300 text-yellow-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'cultural': return '🎨';
      case 'social': return '👥';
      case 'engagement': return '💬';
      case 'special': return '⭐';
      default: return '🏆';
    }
  };

  const earnedAchievements = achievements.filter(a => a.earned);
  const inProgressAchievements = achievements.filter(a => !a.earned && a.progress !== undefined);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold text-gray-800">{earnedAchievements.length}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-gray-800">{rank}</div>
            <div className="text-sm text-gray-600">Current Rank</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-gray-800">{inProgressAchievements.length}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earned" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earned">🏆 Earned ({earnedAchievements.length})</TabsTrigger>
          <TabsTrigger value="progress">⏳ In Progress ({inProgressAchievements.length})</TabsTrigger>
          <TabsTrigger value="highlights">✨ Highlights ({highlights.length})</TabsTrigger>
        </TabsList>

        {/* Earned Achievements */}
        <TabsContent value="earned" className="mt-4">
          {earnedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedAchievements.map((achievement) => (
                <Card key={achievement.id} className={`border-2 ${getRarityColor(achievement.rarity)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">
                        {getCategoryIcon(achievement.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-sm">{achievement.title}</h3>
                          <Badge variant="secondary" className="text-xs capitalize">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                        {achievement.earnedDate && (
                          <p className="text-xs text-gray-500">
                            Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No badges earned yet. Start engaging with the community!</p>
            </div>
          )}
        </TabsContent>

        {/* In Progress Achievements */}
        <TabsContent value="progress" className="mt-4">
          {inProgressAchievements.length > 0 ? (
            <div className="space-y-4">
              {inProgressAchievements.map((achievement) => (
                <Card key={achievement.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl opacity-50">
                        {getCategoryIcon(achievement.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-sm">{achievement.title}</h3>
                          <Badge variant="outline" className="text-xs capitalize">
                            {achievement.rarity}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                        {achievement.progress !== undefined && achievement.maxProgress && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.maxProgress}</span>
                            </div>
                            <Progress 
                              value={(achievement.progress / achievement.maxProgress) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No achievements in progress</p>
            </div>
          )}
        </TabsContent>

        {/* Profile Highlights */}
        <TabsContent value="highlights" className="mt-4">
          {highlights.length > 0 ? (
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <Card key={highlight.id} className="border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{highlight.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm text-purple-800">{highlight.title}</h3>
                          <Badge 
                            variant="secondary" 
                            className="text-xs bg-purple-100 text-purple-700 capitalize"
                          >
                            {highlight.type}
                          </Badge>
                        </div>
                        <p className="text-xs text-purple-600 mb-2">{highlight.description}</p>
                        <p className="text-xs text-purple-500">
                          {new Date(highlight.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No highlights yet. Keep engaging to create memorable moments!</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AchievementsBadges;