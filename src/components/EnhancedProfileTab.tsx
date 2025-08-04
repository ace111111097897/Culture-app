import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Camera, Trophy, Settings, Heart, Globe, Star } from 'lucide-react';
import { ProfileMediaManager } from './ProfileMediaManager';
import { GameAchievements } from './GameAchievements';
import { EnhancedCubbletonAI } from './EnhancedCubbletonAI';

interface UserProfile {
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  culturalBackground: string[];
  languages: string[];
  relationshipGoals: string;
  zodiacSign: string;
}

export const EnhancedProfileTab: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Alex Chen',
    age: 28,
    location: 'San Francisco, CA',
    bio: 'Love exploring different cultures through food, games, and meaningful conversations. Always up for learning something new!',
    interests: ['Cooking', 'Chess', 'Photography', 'Travel', 'Music'],
    culturalBackground: ['Chinese', 'American'],
    languages: ['English', 'Mandarin', 'Spanish'],
    relationshipGoals: 'Looking for meaningful connections and cultural exchange',
    zodiacSign: 'Leo'
  });

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Camera className="w-4 h-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Cubbleton AI
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Profile Overview
                </CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Name</label>
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Age</label>
                      <Input
                        type="number"
                        value={editedProfile.age}
                        onChange={(e) => setEditedProfile({...editedProfile, age: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Location</label>
                    <Input
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Bio</label>
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Relationship Goals</label>
                    <Textarea
                      value={editedProfile.relationshipGoals}
                      onChange={(e) => setEditedProfile({...editedProfile, relationshipGoals: e.target.value})}
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Zodiac Sign</label>
                    <Select value={editedProfile.zodiacSign} onValueChange={(value) => setEditedProfile({...editedProfile, zodiacSign: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your zodiac sign" />
                      </SelectTrigger>
                      <SelectContent>
                        {zodiacSigns.map((sign) => (
                          <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <img
                      src="/placeholder.svg"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      <p className="text-gray-600">{profile.age} years old</p>
                      <p className="text-gray-600">{profile.location}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">About Me</h3>
                    <p className="text-gray-700">{profile.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Relationship Goals
                    </h3>
                    <p className="text-gray-700">{profile.relationshipGoals}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Cultural Background</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.culturalBackground.map((culture, index) => (
                          <Badge key={index} className="bg-teal-100 text-teal-800">
                            {culture}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.languages.map((language, index) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800">
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        Zodiac Sign
                      </h3>
                      <Badge className="bg-purple-100 text-purple-800">
                        {profile.zodiacSign}
                      </Badge>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <ProfileMediaManager />
        </TabsContent>

        <TabsContent value="achievements">
          <GameAchievements />
        </TabsContent>

        <TabsContent value="ai">
          <EnhancedCubbletonAI />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Safety Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">AI Content Monitoring</h4>
                    <p className="text-sm text-gray-600">Let Cubbleton AI monitor your content for safety</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Cultural Insights</h4>
                    <p className="text-sm text-gray-600">Receive personalized cultural facts and tips</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Connection Suggestions</h4>
                    <p className="text-sm text-gray-600">Get AI-powered connection recommendations</p>
                  </div>
                  <Button variant="outline">Enabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};