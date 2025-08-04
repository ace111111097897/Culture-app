import React, { useState } from 'react';
import { ChevronRight, User, Heart, Globe, Music, Palette, Coffee, MapPin, Clock, Star, SkipForward, Camera, Book, Gamepad2, Plane, Utensils } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Props {
  username: string;
  onComplete: () => void;
  onSkip: () => void;
}

const UpdatedPreferencesScreen: React.FC<Props> = ({ username, onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    culturalBackground: [],
    interests: [],
    zodiacSign: '',
    lifestyle: [],
    foodPreferences: [],
    travelStyle: [],
    socialPreferences: []
  });

  const culturalOptions = [
    'East Asian', 'Southeast Asian', 'South Asian', 'Middle Eastern',
    'European', 'African', 'Latin American', 'North American', 'Oceanic',
    'Caribbean', 'Nordic', 'Mediterranean', 'Central Asian', 'Indigenous'
  ];

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const interestCategories = {
    'Arts & Culture': {
      icon: Palette,
      items: ['Music Production', 'Visual Arts', 'Literature', 'Theater', 'Film', 'Photography', 'Dance', 'Sculpture', 'Poetry', 'Street Art']
    },
    'Food & Cuisine': {
      icon: Utensils,
      items: ['Cooking', 'Fine Dining', 'Street Food', 'Fusion Cuisine', 'Traditional Recipes', 'Baking', 'Wine Tasting', 'Food Photography', 'Vegetarian', 'Vegan']
    },
    'Travel & Adventure': {
      icon: Plane,
      items: ['Backpacking', 'Luxury Travel', 'Cultural Tours', 'Adventure Sports', 'Solo Travel', 'Group Travel', 'Road Trips', 'Hiking', 'Beach Destinations', 'City Exploration']
    },
    'Entertainment': {
      icon: Gamepad2,
      items: ['Gaming', 'Movies', 'TV Shows', 'Podcasts', 'Live Music', 'Concerts', 'Festivals', 'Comedy Shows', 'Sports Events', 'Nightlife']
    },
    'Lifestyle & Wellness': {
      icon: Heart,
      items: ['Fitness', 'Yoga', 'Meditation', 'Fashion', 'Beauty', 'Wellness', 'Spirituality', 'Self-Care', 'Mental Health', 'Sustainability']
    },
    'Learning & Growth': {
      icon: Book,
      items: ['Languages', 'Technology', 'Science', 'History', 'Philosophy', 'Psychology', 'Business', 'Entrepreneurship', 'Personal Development', 'Volunteering']
    }
  };

  const lifestyleOptions = [
    'Early Bird', 'Night Owl', 'Homebody', 'Social Butterfly', 'Minimalist', 
    'Maximalist', 'Eco-Conscious', 'Tech Enthusiast', 'Fitness Focused', 'Creative'
  ];

  const foodPreferenceOptions = [
    'Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 
    'Gluten-Free', 'Halal', 'Kosher', 'Raw Food', 'Mediterranean', 'Asian Fusion'
  ];

  const travelStyleOptions = [
    'Budget Traveler', 'Luxury Seeker', 'Adventure Explorer', 'Cultural Immersion', 
    'Relaxation Focused', 'Photography Tours', 'Food Tourism', 'Solo Adventurer', 
    'Group Explorer', 'Digital Nomad'
  ];

  const socialPreferenceOptions = [
    'Small Groups', 'Large Gatherings', 'One-on-One', 'Online Communities', 
    'In-Person Events', 'Outdoor Activities', 'Indoor Hangouts', 'Networking', 
    'Casual Meetups', 'Structured Events'
  ];

  const renderOptions = (options: string[], selectedKey: string, colorClass: string) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {options.map((option) => (
        <Badge
          key={option}
          variant={preferences[selectedKey].includes(option) ? "default" : "outline"}
          className={`cursor-pointer p-3 justify-center transition-all text-center ${
            preferences[selectedKey].includes(option) 
              ? `bg-gradient-to-r ${colorClass} text-white` 
              : 'border-gray-300 hover:border-gray-500'
          }`}
          onClick={() => {
            const updated = preferences[selectedKey].includes(option)
              ? preferences[selectedKey].filter(item => item !== option)
              : [...preferences[selectedKey], option];
            setPreferences({...preferences, [selectedKey]: updated});
          }}
        >
          {option}
        </Badge>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Cultural Background</h2>
          <p className="text-gray-600">Tell us about your cultural identity</p>
        </div>
        
        <Card className="border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-700">
              <Globe className="w-5 h-5" />
              Cultural Heritage
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderOptions(culturalOptions, 'culturalBackground', 'from-teal-500 to-blue-500')}
          </CardContent>
        </Card>

        <Card className="border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Star className="w-5 h-5" />
              Zodiac Sign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={preferences.zodiacSign} onValueChange={(value) => setPreferences({...preferences, zodiacSign: value})}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your zodiac sign" />
              </SelectTrigger>
              <SelectContent>
                {zodiacSigns.map((sign) => (
                  <SelectItem key={sign} value={sign}>{sign}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );

  const renderStep2 = () => (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Interests & Passions</h2>
          <p className="text-gray-600">What excites you most?</p>
        </div>

        {Object.entries(interestCategories).map(([category, { icon: Icon, items }]) => (
          <Card key={category} className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Icon className="w-5 h-5" />
                {category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {items.map((interest) => (
                  <Badge
                    key={interest}
                    variant={preferences.interests.includes(interest) ? "default" : "outline"}
                    className={`cursor-pointer p-2 justify-center text-xs transition-all ${
                      preferences.interests.includes(interest) 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                        : 'border-purple-300 hover:border-purple-500'
                    }`}
                    onClick={() => {
                      const updated = preferences.interests.includes(interest)
                        ? preferences.interests.filter(i => i !== interest)
                        : [...preferences.interests, interest];
                      setPreferences({...preferences, interests: updated});
                    }}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  const renderStep3 = () => (
    <ScrollArea className="h-[60vh] pr-4">
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">Lifestyle & Preferences</h2>
          <p className="text-gray-600">How do you live your life?</p>
        </div>

        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <User className="w-5 h-5" />
              Lifestyle
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderOptions(lifestyleOptions, 'lifestyle', 'from-green-500 to-teal-500')}
          </CardContent>
        </Card>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <Coffee className="w-5 h-5" />
              Food Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderOptions(foodPreferenceOptions, 'foodPreferences', 'from-orange-500 to-red-500')}
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <MapPin className="w-5 h-5" />
              Travel Style
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderOptions(travelStyleOptions, 'travelStyle', 'from-blue-500 to-indigo-500')}
          </CardContent>
        </Card>

        <Card className="border-pink-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-pink-700">
              <Heart className="w-5 h-5" />
              Social Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderOptions(socialPreferenceOptions, 'socialPreferences', 'from-pink-500 to-purple-500')}
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-teal-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}

        <div className="flex justify-between items-center mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={step === 1}
            className="border-teal-300 text-teal-700 hover:bg-teal-50"
          >
            Previous
          </Button>
          
          <div className="flex gap-3">
            <Button 
              variant="outline"
              onClick={onSkip}
              className="border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip for Now
            </Button>
            
            <Button 
              onClick={nextStep} 
              className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600"
            >
              {step === 3 ? 'Complete Setup' : 'Next'}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedPreferencesScreen;