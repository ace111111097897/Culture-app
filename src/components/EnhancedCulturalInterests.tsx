import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Utensils, Music, Palette, Book, Star, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnhancedCulturalInterestsProps {
  onComplete: (interests: any) => void;
  isFirstTime?: boolean;
}

const EnhancedCulturalInterests: React.FC<EnhancedCulturalInterestsProps> = ({ onComplete, isFirstTime = true }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);
  const [zodiacSign, setZodiacSign] = useState<string>('');
  const { toast } = useToast();

  const interests = [
    { id: 'art', label: 'Visual Arts', icon: Palette, subcategories: ['Painting', 'Sculpture', 'Photography', 'Digital Art'] },
    { id: 'music', label: 'Music & Dance', icon: Music, subcategories: ['Classical', 'Pop', 'Traditional', 'Electronic', 'Folk'] },
    { id: 'literature', label: 'Literature', icon: Book, subcategories: ['Poetry', 'Fiction', 'Non-fiction', 'Philosophy'] },
    { id: 'festivals', label: 'Festivals', icon: Globe, subcategories: ['Religious', 'Cultural', 'Music', 'Food', 'Art'] },
    { id: 'history', label: 'History', icon: Book, subcategories: ['Ancient', 'Medieval', 'Modern', 'Local History'] },
    { id: 'language', label: 'Languages', icon: Globe, subcategories: ['Romance', 'Germanic', 'Asian', 'African', 'Indigenous'] }
  ];

  const cuisineCategories = {
    'Asian': ['Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian'],
    'European': ['Italian', 'French', 'Spanish', 'German', 'Greek'],
    'American': ['Mexican', 'Brazilian', 'Peruvian', 'Caribbean'],
    'Middle Eastern': ['Lebanese', 'Turkish', 'Persian', 'Israeli'],
    'African': ['Ethiopian', 'Moroccan', 'Nigerian', 'South African']
  };

  const backgroundCategories = {
    'North America': ['🇺🇸 American', '🇨🇦 Canadian', '🇲🇽 Mexican'],
    'Europe': ['🇬🇧 British', '🇫🇷 French', '🇩🇪 German', '🇮🇹 Italian', '🇪🇸 Spanish'],
    'Asia': ['🇨🇳 Chinese', '🇮🇳 Indian', '🇯🇵 Japanese', '🇰🇷 Korean', '🇹🇭 Thai'],
    'Africa': ['🇳🇬 Nigerian', '🇪🇬 Egyptian', '🇿🇦 South African', '🇰🇪 Kenyan'],
    'South America': ['🇧🇷 Brazilian', '🇦🇷 Argentinian', '🇵🇪 Peruvian', '🇨🇴 Colombian']
  };

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const handleComplete = () => {
    if (isFirstTime && (!selectedInterests.length || !zodiacSign)) {
      toast({
        title: "Please complete your profile",
        description: "Select at least one interest and your zodiac sign",
        variant: "destructive"
      });
      return;
    }

    const preferences = {
      interests: selectedInterests,
      cuisines: selectedCuisines,
      backgrounds: selectedBackgrounds,
      zodiacSign,
      isFirstTime
    };
    
    onComplete(preferences);
  };

  const showHelp = () => {
    toast({
      title: "Cubbleton AI Help",
      description: "These preferences help me find your perfect cultural connections!"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={showHelp}
              className="absolute right-4 top-4"
            >
              <HelpCircle className="h-4 w-4 text-teal-600" />
            </Button>
            <CardTitle className="text-2xl bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              {isFirstTime ? 'Welcome! Tell Us About Yourself' : 'Update Your Preferences'}
            </CardTitle>
            <p className="text-gray-600">Help Cubbleton AI personalize your cultural journey</p>
          </CardHeader>
        </Card>

        {/* Cultural Interests with Subcategories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Cultural Interests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {interests.map((interest) => (
              <div key={interest.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  <interest.icon className="h-4 w-4" />
                  <span className="font-medium">{interest.label}</span>
                </div>
                <div className="flex flex-wrap gap-2 ml-6">
                  {interest.subcategories.map((sub) => (
                    <Badge
                      key={sub}
                      variant={selectedInterests.includes(sub) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedInterests(prev => 
                        prev.includes(sub) ? prev.filter(i => i !== sub) : [...prev, sub]
                      )}
                    >
                      {sub}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cuisine Preferences with Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Cuisine Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(cuisineCategories).map(([category, cuisines]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-gray-700">{category}</h4>
                <div className="flex flex-wrap gap-2 ml-4">
                  {cuisines.map((cuisine) => (
                    <Badge
                      key={cuisine}
                      variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCuisines(prev => 
                        prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
                      )}
                    >
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Zodiac Sign */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Zodiac Sign
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={zodiacSign} onValueChange={setZodiacSign}>
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

        <div className="flex justify-center">
          <Button 
            onClick={handleComplete}
            className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 px-8 py-2"
          >
            {isFirstTime ? 'Complete Setup' : 'Save Preferences'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedCulturalInterests;