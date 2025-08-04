import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Settings, Trophy, Calendar, MapPin, Heart, MessageSquare, Users, Edit3 } from 'lucide-react';
import ProfileNameEditor from './ProfileNameEditor';
import EditProfileTab from './EditProfileTab';
import FeaturesSection from './FeaturesSection';

interface ProfileSectionProps {
  username: string;
  onLogout: () => void;
  onProfileNameUpdate?: (newName: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ username, onLogout, onProfileNameUpdate }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [profileName, setProfileName] = useState(username);
  const [profileQuote, setProfileQuote] = useState("Living life one culture at a time ✨");

  const handleProfileNameSave = (newName: string) => {
    setProfileName(newName);
    setIsEditingName(false);
    if (onProfileNameUpdate) {
      onProfileNameUpdate(newName);
    }
  };

  const handleProfileSave = (profileData: any) => {
    setProfileName(profileData.name);
    setProfileQuote(profileData.quote);
    if (onProfileNameUpdate) {
      onProfileNameUpdate(profileData.name);
    }
  };

  const userStats = {
    eventsAttended: 23,
    culturesExplored: 12,
    friendsConnected: 156,
    postsShared: 45
  };

  const culturalInterests = [
    'Japanese', 'Indian', 'Mexican', 'Italian', 'Chinese', 'French', 'Korean', 'Brazilian'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="text-gray-600">Manage your cultural journey</p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-2xl font-bold bg-purple-100 text-purple-700">
                  {profileName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  {isEditingName ? (
                    <div className="mb-4">
                      <ProfileNameEditor
                        currentName={profileName}
                        onSave={handleProfileNameSave}
                        onCancel={() => setIsEditingName(false)}
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">{profileName}</h2>
                        <Button
                          onClick={() => setIsEditingName(true)}
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700"
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600 italic mb-2">"{profileQuote}"</p>
                    </div>
                  )}
                  <p className="text-green-600 text-sm flex items-center gap-1">
                    ✓ Verified Cultural Explorer
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
                <Button onClick={onLogout} variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  Logout
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {culturalInterests.slice(0, 6).map((culture, index) => (
                  <Badge key={index} variant="secondary">{culture}</Badge>
                ))}
                {culturalInterests.length > 6 && (
                  <Badge variant="outline">+{culturalInterests.length - 6} more</Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.eventsAttended}</p>
            <p className="text-sm text-gray-600">Events Attended</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.culturesExplored}</p>
            <p className="text-sm text-gray-600">Cultures Explored</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.friendsConnected}</p>
            <p className="text-sm text-gray-600">Friends Connected</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{userStats.postsShared}</p>
            <p className="text-sm text-gray-600">Posts Shared</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="edit" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit Profile</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <EditProfileTab username={profileName} onSave={handleProfileSave} />
        </TabsContent>

        <TabsContent value="features">
          <FeaturesSection />
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6 text-gray-600" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <Button variant="outline" className="justify-start">
                    Privacy & Security
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Language Settings
                  </Button>
                  <Button variant="outline" className="justify-start">
                    Account Management
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSection;