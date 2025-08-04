import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProfileMediaUploader } from './ProfileMediaUploader';
import { ProfileAchievements } from './ProfileAchievements';
import { EnhancedAIContentManager } from './EnhancedAIContentManager';
import { EnhancedCulturalMatchmaking } from './EnhancedCulturalMatchmaking';
import { AIProfileInsights } from './AIProfileInsights';
import { IntelligentAssistance } from './IntelligentAssistance';
import { EditProfileTab } from './EditProfileTab';
import { 
  User, 
  Star, 
  Camera, 
  Trophy, 
  BarChart3, 
  Settings, 
  MessageCircle,
  Heart,
  Share2,
  Eye,
  Sparkles,
  Calendar,
  Users,
  Brain,
  Shield
} from 'lucide-react';

export const CubbletonAIProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Alex Chen',
    username: '@alexchen',
    bio: 'Cultural enthusiast exploring traditions worldwide 🌍 Zodiac: Gemini ♊',
    zodiacSign: 'Gemini',
    profileImage: '/placeholder.svg',
    coverImage: '/placeholder.svg',
    stats: {
      followers: 1234,
      following: 567,
      posts: 89,
      likes: 2456,
      culturalScore: 92,
      aiInsights: 15
    }
  };

  const zodiacInsights = {
    personality: 'Curious and adaptable, you thrive in diverse cultural environments',
    culturalMatch: 'Your Gemini nature makes you excellent at bridging different cultures',
    dailyTip: 'Today is perfect for exploring new cultural perspectives!',
    compatibility: 'High compatibility with Libra and Aquarius signs'
  };

  const activityData = [
    { date: '2024-01-15', activity: 'Uploaded cultural dance video', type: 'upload', aiScore: 95 },
    { date: '2024-01-14', activity: 'Joined Korean Culture Bubble', type: 'community', aiScore: 88 },
    { date: '2024-01-13', activity: 'Earned "Cultural Explorer" badge', type: 'achievement', aiScore: 92 },
    { date: '2024-01-12', activity: 'Connected with 3 new AI-matched friends', type: 'social', aiScore: 89 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Enhanced Cover Photo & Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 rounded-b-lg"></div>
        <div className="absolute -bottom-16 left-8">
          <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback className="text-2xl bg-teal-100 text-teal-700">AC</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge className="bg-purple-100 text-purple-700 border-purple-300">
            <Brain className="w-3 h-3 mr-1" />
            AI Score: {user.stats.culturalScore}
          </Badge>
          <Button 
            variant="outline" 
            className="bg-white/90 backdrop-blur-sm"
            onClick={() => setActiveTab('edit')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Enhanced Profile Info */}
      <div className="pt-20 px-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.username}</p>
            <p className="mt-2 text-gray-700 max-w-md">{user.bio}</p>
          </div>
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-teal-600">{user.stats.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{user.stats.followers}</div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{user.stats.following}</div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-pink-600">{user.stats.likes}</div>
              <div className="text-sm text-gray-600">Likes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{user.stats.aiInsights}</div>
              <div className="text-sm text-gray-600">AI Insights</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced AI Insights Banner */}
      <div className="mx-8 mb-6">
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Enhanced Cubbleton AI Insights</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-purple-700">Personality:</span>
                <p className="text-purple-600">{zodiacInsights.personality}</p>
              </div>
              <div>
                <span className="font-medium text-purple-700">Cultural Match:</span>
                <p className="text-purple-600">{zodiacInsights.culturalMatch}</p>
              </div>
              <div>
                <span className="font-medium text-purple-700">Daily Tip:</span>
                <p className="text-purple-600">{zodiacInsights.dailyTip}</p>
              </div>
              <div>
                <span className="font-medium text-purple-700">Compatibility:</span>
                <p className="text-purple-600">{zodiacInsights.compatibility}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Main Content Tabs */}
      <div className="px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              AI Media
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              AI Analytics
            </TabsTrigger>
            <TabsTrigger value="matching" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              AI Matching
            </TabsTrigger>
            <TabsTrigger value="assistance" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-teal-700 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    AI-Enhanced Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityData.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800">{item.activity}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                        <Badge className="text-xs bg-purple-100 text-purple-700">
                          AI: {item.aiScore}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    AI-Powered Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Profile Views</span>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold text-blue-600">1,234</span>
                        <Badge className="text-xs bg-green-100 text-green-700">+15%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">AI-Matched Likes</span>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="font-semibold text-pink-600">2,456</span>
                        <Badge className="text-xs bg-green-100 text-green-700">+23%</Badge>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Smart Shares</span>
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-600">789</span>
                        <Badge className="text-xs bg-blue-100 text-blue-700">AI Optimized</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="edit">
            <EditProfileTab />
          </TabsContent>

          <TabsContent value="media">
            <EnhancedAIContentManager />
          </TabsContent>

          <TabsContent value="achievements">
            <ProfileAchievements />
          </TabsContent>

          <TabsContent value="insights">
            <AIProfileInsights />
          </TabsContent>

          <TabsContent value="matching">
            <EnhancedCulturalMatchmaking />
          </TabsContent>

          <TabsContent value="assistance">
            <IntelligentAssistance />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};