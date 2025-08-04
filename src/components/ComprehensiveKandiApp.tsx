import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  User, GamepadIcon, Trophy, MessageCircle, Calendar, 
  Users, Star, Settings, Bell, Shield, Gift,
  Play, Video, Mic, Search, Plus, Heart, Crown, Upload, Camera
} from 'lucide-react';

interface ComprehensiveKandiAppProps {
  username: string;
  onLogout: () => void;
}

const ComprehensiveKandiApp: React.FC<ComprehensiveKandiAppProps> = ({ username, onLogout }) => {
  const [activeTab, setActiveTab] = useState('home');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-emerald-50 to-purple-50">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gradient-to-r from-teal-500 to-purple-500 text-white">{username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold gradient-text">Welcome, {username}!</h1>
              <p className="text-sm text-gray-600">Level 15 • 2450 XP</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onLogout} className="border-teal-200 hover:bg-teal-50">
            <Settings className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/80">
            <TabsTrigger value="home" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Home</TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Games</TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Matches</TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Events</TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">Profile</TabsTrigger>
            <TabsTrigger value="premium" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-yellow-500 data-[state=active]:text-white"><Crown className="h-4 w-4" /></TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-teal-500" />
                    Daily Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">Win 3 games today</p>
                  <Progress value={33} className="mb-2" />
                  <p className="text-xs text-gray-600">1/3 completed</p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-emerald-500" />
                    Quick Match
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full btn-legendary">Find Game</Button>
                  <p className="text-xs text-gray-600 mt-2">12 players online</p>
                </CardContent>
              </Card>
              <Card className="card-gradient">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-500" />
                    Kandi AI
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-2">"Try new games!"</p>
                  <Button variant="outline" size="sm" className="border-purple-200">Chat with AI</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-teal-500" />
                    Photos (3/8 Free)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Camera className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Add Photos
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">5 more photos with Premium</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-emerald-500" />
                    Videos (1/5 Free)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Video className="h-8 w-8 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Add Video
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">Unlimited videos with Premium</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-purple-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge className="bg-teal-100 text-teal-700">First Win</Badge>
                    <Badge className="bg-emerald-100 text-emerald-700">Social Butterfly</Badge>
                    <Badge className="bg-purple-100 text-purple-700">Tournament Champion</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Premium Tab */}
          <TabsContent value="premium" className="space-y-4">
            <Card className="premium-gradient text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  Upgrade to Premium
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Premium Features</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Unlimited photos and videos</li>
                      <li>• Advanced matching</li>
                      <li>• Priority support</li>
                      <li>• Exclusive games</li>
                    </ul>
                  </div>
                  <Button className="w-full bg-white text-yellow-600 hover:bg-gray-100">
                    Upgrade Now - $9.99/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs with basic content */}
          <TabsContent value="games"><Card><CardContent className="p-6"><p>Games coming soon!</p></CardContent></Card></TabsContent>
          <TabsContent value="matches"><Card><CardContent className="p-6"><p>Matches coming soon!</p></CardContent></Card></TabsContent>
          <TabsContent value="events"><Card><CardContent className="p-6"><p>Events coming soon!</p></CardContent></Card></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ComprehensiveKandiApp;