import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Edit3, Globe, Languages, MapPin, Bell, Star } from 'lucide-react';

interface PreferencesData {
  culturalInterests: string[];
  languages: string[];
  location: string;
  zodiacSign: string;
  notifications: {
    newCubbles: boolean;
    matches: boolean;
    events: boolean;
    messages: boolean;
  };
}

interface PreferencesSummaryScreenProps {
  preferences: PreferencesData;
  onConfirm: () => void;
  onEdit: () => void;
}

const PreferencesSummaryScreen: React.FC<PreferencesSummaryScreenProps> = ({
  preferences,
  onConfirm,
  onEdit
}) => {
  const activeNotifications = Object.entries(preferences.notifications)
    .filter(([_, enabled]) => enabled)
    .map(([key, _]) => key.replace(/([A-Z])/g, ' $1').toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Setup Complete!
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Here's a summary of your preferences. You can always update these later in your profile settings.
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Cultural Interests */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-teal-600" />
                <h3 className="font-semibold text-gray-800">Cultural Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.culturalInterests.map((interest) => (
                  <Badge key={interest} className="bg-teal-100 text-teal-800 hover:bg-teal-200">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Languages className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {preferences.languages.map((language) => (
                  <Badge key={language} className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-800">Location</h3>
              </div>
              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                {preferences.location}
              </Badge>
            </div>

            {/* Zodiac Sign */}
            {preferences.zodiacSign && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-pink-600" />
                  <h3 className="font-semibold text-gray-800">Zodiac Sign</h3>
                </div>
                <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200">
                  {preferences.zodiacSign}
                </Badge>
              </div>
            )}

            {/* Notifications */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-600" />
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeNotifications.map((notification) => (
                  <Badge key={notification} className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                    {notification}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={onEdit}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Preferences</span>
              </Button>
              
              <Button
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white"
              >
                Start Exploring Cubble
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                💡 You can update your preferences anytime in Profile → Settings
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreferencesSummaryScreen;