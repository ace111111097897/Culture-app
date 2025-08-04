import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, Crown, Trophy, Star, Medal, Award, Target } from 'lucide-react';
import AchievementsSection from './AchievementsSection';
import SubscriptionSection from './SubscriptionSection';

interface Props {
  username: string;
}

const UpdatedProfileSection: React.FC<Props> = ({ username }) => {
  const [photoCount, setPhotoCount] = useState(3);
  const [videoCount, setVideoCount] = useState(1);
  const [isPremium, setIsPremium] = useState(false);

  const achievements = [
    { id: 1, name: 'First Match', icon: Trophy, earned: true, color: 'text-yellow-500' },
    { id: 2, name: 'Cultural Explorer', icon: Star, earned: true, color: 'text-blue-500' },
    { id: 3, name: 'Social Butterfly', icon: Medal, earned: false, color: 'text-gray-400' },
    { id: 4, name: 'Game Master', icon: Award, earned: true, color: 'text-purple-500' },
    { id: 5, name: 'Community Builder', icon: Target, earned: false, color: 'text-gray-400' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <CardTitle className="gradient-text text-2xl">{username}</CardTitle>
              <p className="text-gray-600">Cultural Explorer • 25 years old</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">🇺🇸 American</Badge>
                <Badge variant="secondary">🎨 Art Lover</Badge>
                {isPremium && <Badge className="bg-gradient-to-r from-teal-500 to-purple-500 text-white"><Crown className="w-3 h-3 mr-1" />Premium</Badge>}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="media" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Photo & Video Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      Photos ({photoCount}/8)
                    </h3>
                    {photoCount >= 8 && !isPremium && (
                      <Button size="sm" variant="outline" className="text-teal-600">
                        <Crown className="w-4 h-4 mr-1" />
                        Upgrade for More
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: Math.min(photoCount, 4) }).map((_, i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-teal-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Videos ({videoCount}/5)
                    </h3>
                    {videoCount >= 5 && !isPremium && (
                      <Button size="sm" variant="outline" className="text-teal-600">
                        <Crown className="w-4 h-4 mr-1" />
                        Upgrade for More
                      </Button>
                    )}
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-teal-100 to-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
                Achievements & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.id} className={`p-4 rounded-lg border-2 ${achievement.earned ? 'border-teal-200 bg-teal-50' : 'border-gray-200 bg-gray-50'} text-center`}>
                      <IconComponent className={`w-8 h-8 mx-auto mb-2 ${achievement.color}`} />
                      <h4 className="font-semibold text-sm">{achievement.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {achievement.earned ? 'Earned!' : 'Not earned yet'}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="premium">
          <SubscriptionSection />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Edit Profile Information
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Privacy Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Notification Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-600">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdatedProfileSection;