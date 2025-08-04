import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Edit3, Save, Plus, X, MapPin, Calendar, Globe } from 'lucide-react';

interface InteractiveProfileProps {
  userProfile?: any;
}

const InteractiveProfileSection: React.FC<InteractiveProfileProps> = ({ userProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: userProfile?.name || 'Your Name',
    bio: userProfile?.bio || 'Tell us about yourself...',
    location: userProfile?.location || 'Your Location',
    age: userProfile?.age || '',
    interests: userProfile?.interests || ['Travel', 'Music', 'Food'],
    languages: userProfile?.languages || ['English'],
    ...userProfile
  });
  const [newInterest, setNewInterest] = useState('');
  const [newLanguage, setNewLanguage] = useState('');

  const handleSave = () => {
    localStorage.setItem('cubbleUser', JSON.stringify(profile));
    setIsEditing(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest)) {
      setProfile({
        ...profile,
        interests: [...profile.interests, newInterest]
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((i: string) => i !== interest)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !profile.languages.includes(newLanguage)) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage]
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    if (profile.languages.length > 1) {
      setProfile({
        ...profile,
        languages: profile.languages.filter((l: string) => l !== language)
      });
    }
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <Card className="bg-gradient-to-r from-blue-100 to-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="text-blue-600" />
              Interactive Profile
            </div>
            <Button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              size="sm"
              variant={isEditing ? "default" : "outline"}
            >
              {isEditing ? <Save className="w-4 h-4 mr-1" /> : <Edit3 className="w-4 h-4 mr-1" />}
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name[0] || 'U'}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="text-xl font-bold mb-2"
                />
              ) : (
                <h2 className="text-2xl font-bold">{profile.name}</h2>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <Input
                      value={profile.location}
                      onChange={(e) => setProfile({...profile, location: e.target.value})}
                      className="h-6 text-sm"
                    />
                  ) : (
                    profile.location
                  )}
                </div>
                {profile.age && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {isEditing ? (
                      <Input
                        value={profile.age}
                        onChange={(e) => setProfile({...profile, age: e.target.value})}
                        className="h-6 text-sm w-16"
                      />
                    ) : (
                      `${profile.age} years old`
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">About Me</h3>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  className="min-h-20"
                />
              ) : (
                <p className="text-gray-700">{profile.bio}</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.interests.map((interest: string) => (
                  <Badge key={interest} variant="secondary" className="flex items-center gap-1">
                    {interest}
                    {isEditing && (
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeInterest(interest)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                  />
                  <Button onClick={addInterest} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2 mb-2">
                {profile.languages.map((language: string) => (
                  <Badge key={language} variant="outline" className="flex items-center gap-1">
                    {language}
                    {isEditing && profile.languages.length > 1 && (
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-red-500" 
                        onClick={() => removeLanguage(language)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add language..."
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
                  />
                  <Button onClick={addLanguage} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-4">
          <h3 className="font-semibold mb-3">Profile Stats</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{profile.interests.length}</div>
              <div className="text-sm text-gray-600">Interests</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{profile.languages.length}</div>
              <div className="text-sm text-gray-600">Languages</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveProfileSection;