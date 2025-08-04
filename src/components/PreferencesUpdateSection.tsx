import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/lib/supabase';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const PreferencesUpdateSection: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferencesData>({
    culturalInterests: [],
    languages: [],
    location: '',
    zodiacSign: '',
    notifications: {
      newCubbles: true,
      matches: true,
      events: true,
      messages: true,
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { toast } = useToast();

  const culturalCategories = [
    'Music', 'Art', 'Food & Cuisine', 'Dance', 'Literature', 'Film & Cinema',
    'Fashion', 'Architecture', 'History', 'Religion & Spirituality', 'Language',
    'Festivals & Celebrations', 'Sports', 'Traditional Crafts', 'Philosophy'
  ];

  const languages = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Russian',
    'Chinese (Mandarin)', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Bengali',
    'Urdu', 'Turkish', 'Dutch', 'Swedish', 'Norwegian', 'Other'
  ];

  const locations = [
    'North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania',
    'Middle East', 'Caribbean', 'Central America', 'Eastern Europe', 'Western Europe',
    'Southeast Asia', 'East Asia', 'South Asia', 'North Africa', 'Sub-Saharan Africa'
  ];

  const zodiacSigns = [
    'Aries ♈', 'Taurus ♉', 'Gemini ♊', 'Cancer ♋', 'Leo ♌', 'Virgo ♍',
    'Libra ♎', 'Scorpio ♏', 'Sagittarius ♐', 'Capricorn ♑', 'Aquarius ♒', 'Pisces ♓'
  ];

  useEffect(() => {
    loadUserPreferences();
  }, []);

  const loadUserPreferences = async () => {
    try {
      // Try to load from localStorage first
      const savedPrefs = localStorage.getItem('cubble_user_preferences');
      if (savedPrefs) {
        setPreferences(JSON.parse(savedPrefs));
        return;
      }

      // Fallback to Supabase
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('cultural_interests, languages, location, zodiac_sign, notification_preferences')
          .eq('id', user.id)
          .single();

        if (profile) {
          setPreferences({
            culturalInterests: profile.cultural_interests || [],
            languages: profile.languages || [],
            location: profile.location || '',
            zodiacSign: profile.zodiac_sign || '',
            notifications: profile.notification_preferences || {
              newCubbles: true,
              matches: true,
              events: true,
              messages: true,
            }
          });
        }
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            cultural_interests: preferences.culturalInterests,
            languages: preferences.languages,
            location: preferences.location,
            zodiac_sign: preferences.zodiacSign,
            notification_preferences: preferences.notifications,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;
      }

      // Update localStorage
      localStorage.setItem('cubble_user_preferences', JSON.stringify(preferences));
      
      setHasChanges(false);
      toast({
        title: "Preferences Updated",
        description: "Your preferences have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCulturalInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      culturalInterests: prev.culturalInterests.includes(interest)
        ? prev.culturalInterests.filter(i => i !== interest)
        : [...prev.culturalInterests, interest]
    }));
    setHasChanges(true);
  };

  const toggleLanguage = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
    setHasChanges(true);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="w-5 h-5 text-teal-600" />
          <span>Update Preferences</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Modify your cultural interests, languages, zodiac sign, and notification settings
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Cultural Interests */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Cultural Interests</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {culturalCategories.map((category) => (
              <Badge
                key={category}
                variant={preferences.culturalInterests.includes(category) ? "default" : "outline"}
                className={`cursor-pointer p-2 text-center transition-all text-xs ${
                  preferences.culturalInterests.includes(category)
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleCulturalInterest(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Languages</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {languages.map((language) => (
              <Badge
                key={language}
                variant={preferences.languages.includes(language) ? "default" : "outline"}
                className={`cursor-pointer p-2 text-center transition-all text-xs ${
                  preferences.languages.includes(language)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => toggleLanguage(language)}
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Location</h3>
          <Select 
            value={preferences.location} 
            onValueChange={(value) => {
              setPreferences(prev => ({ ...prev, location: value }));
              setHasChanges(true);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your region" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zodiac Sign */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Zodiac Sign</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
            {zodiacSigns.map((sign) => (
              <Badge
                key={sign}
                variant={preferences.zodiacSign === sign ? "default" : "outline"}
                className={`cursor-pointer p-2 text-center transition-all text-xs ${
                  preferences.zodiacSign === sign
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setPreferences(prev => ({ ...prev, zodiacSign: sign }));
                  setHasChanges(true);
                }}
              >
                {sign}
              </Badge>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPreferences(prev => ({ ...prev, zodiacSign: '' }));
              setHasChanges(true);
            }}
            className="text-xs text-gray-500"
          >
            Clear zodiac sign
          </Button>
        </div>

        {/* Notifications */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-800">Notification Preferences</h3>
          <div className="space-y-3">
            {[
              { key: 'newCubbles', label: 'New Cubbles in your interests' },
              { key: 'matches', label: 'New matches and connections' },
              { key: 'events', label: 'Cultural events and activities' },
              { key: 'messages', label: 'Messages and interactions' }
            ].map((item) => (
              <div key={item.key} className="flex items-center space-x-3">
                <Checkbox
                  checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                  onCheckedChange={(checked) => {
                    setPreferences(prev => ({
                      ...prev,
                      notifications: {
                        ...prev.notifications,
                        [item.key]: checked
                      }
                    }));
                    setHasChanges(true);
                  }}
                />
                <label className="text-sm">{item.label}</label>
              </div>
            ))}
          </div>
        </div>

        {hasChanges && (
          <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <span className="text-sm text-amber-800">You have unsaved changes</span>
          </div>
        )}

        <Button
          onClick={handleSavePreferences}
          disabled={!hasChanges || isLoading}
          className="w-full bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default PreferencesUpdateSection;