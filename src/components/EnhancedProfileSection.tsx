import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileDataManager from './ProfileDataManager';
import { Plus, X, Save, Loader2, Camera, Edit, User, MapPin, Calendar, Heart, Globe } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProfileData {
  name: string;
  bio: string;
  location: string;
  interests: string[];
  age?: number;
  email?: string;
  avatar_url?: string;
  cultural_interests?: string[];
  languages?: string[];
}

export const EnhancedProfileSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [newInterest, setNewInterest] = useState('');
  const [newCulturalInterest, setNewCulturalInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    location: '',
    interests: [],
    cultural_interests: [],
    languages: []
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await ProfileDataManager.loadProfile();
      if (data) {
        setProfileData({
          name: data.name || '',
          bio: data.bio || '',
          location: data.location || '',
          interests: data.interests || [],
          age: data.age,
          email: data.email,
          avatar_url: data.avatar_url,
          cultural_interests: data.cultural_interests || [],
          languages: data.languages || []
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const success = await ProfileDataManager.saveProfile(profileData);
      if (success) {
        toast({
          title: "Success",
          description: "Profile saved successfully!",
        });
      } else {
        toast({
          title: "Warning",
          description: "Profile saved locally (offline mode)",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const addCulturalInterest = () => {
    if (newCulturalInterest.trim() && !profileData.cultural_interests?.includes(newCulturalInterest.trim())) {
      setProfileData(prev => ({
        ...prev,
        cultural_interests: [...(prev.cultural_interests || []), newCulturalInterest.trim()]
      }));
      setNewCulturalInterest('');
    }
  };

  const removeCulturalInterest = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      cultural_interests: prev.cultural_interests?.filter(i => i !== interest) || []
    }));
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profileData.languages?.includes(newLanguage.trim())) {
      setProfileData(prev => ({
        ...prev,
        languages: [...(prev.languages || []), newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      languages: prev.languages?.filter(l => l !== language) || []
    }));
  };

  const handleInputChange = (field: keyof ProfileData, value: string | number) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-gray-600 mt-2">Manage your cultural identity and preferences</p>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="cultural">Cultural</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileData.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xl">
                      {profileData.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Change Photo
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={profileData.age || ''}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || undefined)}
                      className="mt-1"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="pl-10"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="mt-1 min-h-[100px]"
                    placeholder="Tell us about yourself, your cultural background, and what you're passionate about..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Personal Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add a personal interest..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  />
                  <Button onClick={addInterest}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {interest}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Languages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add a language you speak..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <Button onClick={addLanguage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profileData.languages?.map((language, index) => (
                    <Badge key={index} variant="outline" className="flex items-center gap-1">
                      {language}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeLanguage(language)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cultural" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Cultural Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCulturalInterest}
                    onChange={(e) => setNewCulturalInterest(e.target.value)}
                    placeholder="Add a cultural interest..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && addCulturalInterest()}
                  />
                  <Button onClick={addCulturalInterest}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {profileData.cultural_interests?.map((interest, index) => (
                    <Badge key={index} variant="default" className="flex items-center gap-1 bg-gradient-to-r from-teal-500 to-blue-500">
                      {interest}
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-200" 
                        onClick={() => removeCulturalInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-8">
          <Button 
            onClick={saveProfile} 
            disabled={saving} 
            className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProfileSection; 