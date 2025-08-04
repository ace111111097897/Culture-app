import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

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

interface GuidedPreferencesSetupProps {
  onComplete: (preferences: PreferencesData) => void;
  onBack: () => void;
}

const GuidedPreferencesSetup: React.FC<GuidedPreferencesSetupProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
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

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

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

  const toggleCulturalInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      culturalInterests: prev.culturalInterests.includes(interest)
        ? prev.culturalInterests.filter(i => i !== interest)
        : [...prev.culturalInterests, interest]
    }));
  };

  const toggleLanguage = (language: string) => {
    setPreferences(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Cultural Interests</h2>
              <p className="text-gray-600">Select the cultural areas that interest you most</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {culturalCategories.map((category) => (
                <Badge
                  key={category}
                  variant={preferences.culturalInterests.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center transition-all ${
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
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Language Preferences</h2>
              <p className="text-gray-600">Choose languages you speak or are interested in</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((language) => (
                <Badge
                  key={language}
                  variant={preferences.languages.includes(language) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center transition-all ${
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
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Location Settings</h2>
              <p className="text-gray-600">Select your region to get relevant cultural content</p>
            </div>
            <Select value={preferences.location} onValueChange={(value) => 
              setPreferences(prev => ({ ...prev, location: value }))
            }>
              <SelectTrigger className="w-full">
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
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Zodiac Sign</h2>
              <p className="text-gray-600">Share your zodiac sign to connect with like-minded people</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {zodiacSigns.map((sign) => (
                <Badge
                  key={sign}
                  variant={preferences.zodiacSign === sign ? "default" : "outline"}
                  className={`cursor-pointer p-4 text-center transition-all ${
                    preferences.zodiacSign === sign
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setPreferences(prev => ({ ...prev, zodiacSign: sign }))}
                >
                  {sign}
                </Badge>
              ))}
            </div>
            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setPreferences(prev => ({ ...prev, zodiacSign: '' }))}
                className="text-sm text-gray-500"
              >
                Skip this step
              </Button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Notification Preferences</h2>
              <p className="text-gray-600">Choose what updates you'd like to receive</p>
            </div>
            <div className="space-y-4">
              {[
                { key: 'newCubbles', label: 'New Cubbles in your interests', desc: 'Get notified about new cultural bubbles' },
                { key: 'matches', label: 'New matches and connections', desc: 'When someone matches with you' },
                { key: 'events', label: 'Cultural events and activities', desc: 'Upcoming events in your area' },
                { key: 'messages', label: 'Messages and interactions', desc: 'New messages and comments' }
              ].map((item) => (
                <div key={item.key} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Checkbox
                    checked={preferences.notifications[item.key as keyof typeof preferences.notifications]}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          [item.key]: checked
                        }
                      }))
                    }
                  />
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="mb-4">
              <Progress value={progress} className="w-full h-2" />
              <p className="text-sm text-gray-600 mt-2">Step {currentStep} of {totalSteps}</p>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            {renderStep()}
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              
              <Button
                onClick={handleNext}
                className="flex items-center space-x-2 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700"
              >
                <span>{currentStep === totalSteps ? 'Complete Setup' : 'Next'}</span>
                {currentStep === totalSteps ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuidedPreferencesSetup;