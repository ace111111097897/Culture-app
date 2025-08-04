import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
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
  Shield,
  Menu
} from 'lucide-react';

export const MobileOptimizedProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const user = {
    name: 'Alex Chen',
    username: '@alexchen',
    bio: 'Cultural enthusiast exploring traditions worldwide 🌍',
    zodiacSign: 'Gemini',
    profileImage: '/placeholder.svg',
    stats: {
      followers: 1234,
      following: 567,
      posts: 89,
      likes: 2456,
      culturalScore: 92,
      aiInsights: 15
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50">
      {/* Mobile-Optimized Cover & Profile */}
      <div className="relative">
        <div className="h-32 sm:h-48 bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400"></div>
        <div className="absolute -bottom-8 sm:-bottom-16 left-4 sm:left-8">
          <Avatar className="w-16 h-16 sm:w-32 sm:h-32 border-2 sm:border-4 border-white shadow-lg">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback className="text-sm sm:text-2xl bg-teal-100 text-teal-700">AC</AvatarFallback>
          </Avatar>
        </div>
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex gap-1 sm:gap-2">
          <Badge className="bg-purple-100 text-purple-700 border-purple-300 text-xs">
            <Brain className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
            AI: {user.stats.culturalScore}
          </Badge>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/90 backdrop-blur-sm text-xs sm:text-sm"
            onClick={() => setActiveTab('edit')}
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Edit
          </Button>
        </div>
      </div>

      {/* Mobile-Optimized Profile Info */}
      <div className="pt-12 sm:pt-20 px-4 sm:px-8 pb-4 sm:pb-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-sm sm:text-base text-gray-600">{user.username}</p>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-700">{user.bio}</p>
          </div>
          
          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-5 gap-2 sm:gap-6 text-center">
            <div>
              <div className="text-lg sm:text-2xl font-bold text-teal-600">{user.stats.posts}</div>
              <div className="text-xs sm:text-sm text-gray-600">Posts</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{user.stats.followers}</div>
              <div className="text-xs sm:text-sm text-gray-600">Followers</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{user.stats.following}</div>
              <div className="text-xs sm:text-sm text-gray-600">Following</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-pink-600">{user.stats.likes}</div>
              <div className="text-xs sm:text-sm text-gray-600">Likes</div>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{user.stats.aiInsights}</div>
              <div className="text-xs sm:text-sm text-gray-600">AI</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Optimized Tabs */}
      <div className="px-2 sm:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile Horizontal Scroll Tabs */}
          <div className="relative mb-4 sm:mb-6">
            <TabsList className="hidden sm:grid sm:grid-cols-7 w-full">
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
                Media
              </TabsTrigger>
              <TabsTrigger value="achievements" className="flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Awards
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="matching" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Matching
              </TabsTrigger>
              <TabsTrigger value="assistance" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Assistant
              </TabsTrigger>
            </TabsList>
            
            {/* Mobile Scrollable Tabs */}
            <div className="sm:hidden overflow-x-auto">
              <TabsList className="flex w-max space-x-1 p-1">
                <TabsTrigger value="overview" className="flex items-center gap-1 text-xs px-3">
                  <User className="w-3 h-3" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-1 text-xs px-3">
                  <Settings className="w-3 h-3" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="media" className="flex items-center gap-1 text-xs px-3">
                  <Camera className="w-3 h-3" />
                  Media
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-1 text-xs px-3">
                  <Trophy className="w-3 h-3" />
                  Awards
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-1 text-xs px-3">
                  <BarChart3 className="w-3 h-3" />
                  Stats
                </TabsTrigger>
                <TabsTrigger value="matching" className="flex items-center gap-1 text-xs px-3">
                  <Users className="w-3 h-3" />
                  Match
                </TabsTrigger>
                <TabsTrigger value="assistance" className="flex items-center gap-1 text-xs px-3">
                  <Shield className="w-3 h-3" />
                  AI
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-teal-700 flex items-center gap-2 text-base sm:text-lg">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-gray-800 truncate">Uploaded cultural dance video</p>
                      <p className="text-xs text-gray-500">Today</p>
                    </div>
                    <Badge className="text-xs bg-purple-100 text-purple-700">95%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-700 flex items-center gap-2 text-base sm:text-lg">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Views</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                      <span className="font-semibold text-blue-600 text-xs sm:text-sm">1.2K</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Likes</span>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-pink-500" />
                      <span className="font-semibold text-pink-600 text-xs sm:text-sm">2.5K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <EditProfileTab />
          </TabsContent>

          <TabsContent value="media" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Media Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Media content coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Achievement system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matching" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Matching system coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assistance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Assistant</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">AI assistant coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};