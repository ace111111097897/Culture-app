import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Music, Globe, Target, Star, User, Edit3, Check, X, AlertCircle } from 'lucide-react';

interface PreferencesScreenProps {
  username: string;
  onComplete: () => void;
  onProfileNameUpdate?: (newName: string) => void;
}

const PreferencesScreen: React.FC<PreferencesScreenProps> = ({ username, onComplete, onProfileNameUpdate }) => {
  const [profileName, setProfileName] = useState(username);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(username);
  const [nameError, setNameError] = useState('');
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string[]>([]);
  const [lifeGoals, setLifeGoals] = useState<string[]>([]);
  const [lookingFor, setLookingFor] = useState<string[]>([]);
  const [zodiacSign, setZodiacSign] = useState('');

  const cultures = ['North American', 'Latin American', 'European', 'Asian', 'African', 'Middle Eastern', 'Caribbean', 'Pacific Islander'];
  const foods = ['Italian', 'Mexican', 'Asian Fusion', 'BBQ', 'Mediterranean', 'Indian', 'Thai', 'Soul Food'];
  const music = ['Hip Hop', 'Reggaeton', 'Pop', 'R&B', 'Rock', 'Electronic', 'Jazz', 'Country'];
  const goals = ['Career Growth', 'Travel', 'Family', 'Education', 'Entrepreneurship', 'Fitness', 'Creativity', 'Spirituality'];
  const seeking = ['Friendship', 'Dating', 'Serious Relationship', 'Networking', 'Cultural Exchange', 'Activity Partner'];
  const zodiac = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const validateName = (name: string): string => {
    if (!name.trim()) return 'Profile name is required';
    if (name.length < 2) return 'Profile name must be at least 2 characters';
    if (name.length > 30) return 'Profile name must be less than 30 characters';
    const specialCharRegex = /[^a-zA-Z0-9\s\-_]/;
    if (specialCharRegex.test(name)) return 'Profile name cannot contain special characters';
    return '';
  };

  const handleNameSave = () => {
    const error = validateName(tempName);
    if (error) {
      setNameError(error);
      return;
    }
    setProfileName(tempName.trim());
    setIsEditingName(false);
    setNameError('');
    if (onProfileNameUpdate) {
      onProfileNameUpdate(tempName.trim());
    }
  };

  const handleNameCancel = () => {
    setTempName(profileName);
    setIsEditingName(false);
    setNameError('');
  };

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item));
    } else {
      setter([...list, item]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Preferences
          </h1>
          <p className="text-gray-600">
            Customize your Culture™ experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Name - Prominently at the top */}
          <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                Profile Name
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {isEditingName ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="profileName" className="text-base font-medium">Your Display Name</Label>
                    <Input
                      id="profileName"
                      value={tempName}
                      onChange={(e) => {
                        setTempName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                      placeholder="Enter your profile name"
                      className={`mt-2 text-lg ${nameError ? 'border-red-500' : 'border-purple-200'}`}
                      maxLength={30}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      {tempName.length}/30 characters
                    </p>
                  </div>
                  
                  {nameError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{nameError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="flex gap-3">
                    <Button onClick={handleNameSave} className="bg-green-600 hover:bg-green-700">
                      <Check className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button onClick={handleNameCancel} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profileName}</p>
                    <p className="text-gray-600 mt-1">This is how others will see you on Culture™</p>
                  </div>
                  <Button
                    onClick={() => {
                      setIsEditingName(true);
                      setTempName(profileName);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Name
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cultural Background */}
          <Card className="bg-white/60 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-600" />
                Cultural Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cultures.map(culture => (
                  <Badge
                    key={culture}
                    variant={selectedCultures.includes(culture) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedCultures.includes(culture) 
                        ? 'bg-purple-600 hover:bg-purple-700' 
                        : 'hover:bg-purple-100'
                    }`}
                    onClick={() => toggleSelection(culture, selectedCultures, setSelectedCultures)}
                  >
                    {culture}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Button
              onClick={onComplete}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              size="lg"
            >
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesScreen;