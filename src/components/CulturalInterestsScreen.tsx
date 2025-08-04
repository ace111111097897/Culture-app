import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Globe, Utensils, Music, Palette, Book } from 'lucide-react';

interface CulturalInterestsScreenProps {
  onComplete: (interests: string[]) => void;
}

const CulturalInterestsScreen: React.FC<CulturalInterestsScreenProps> = ({ onComplete }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedBackgrounds, setSelectedBackgrounds] = useState<string[]>([]);

  const interests = [
    { id: 'art', label: 'Visual Arts', icon: Palette },
    { id: 'music', label: 'Music & Dance', icon: Music },
    { id: 'literature', label: 'Literature', icon: Book },
    { id: 'festivals', label: 'Festivals', icon: Globe },
    { id: 'history', label: 'History', icon: Book },
    { id: 'language', label: 'Languages', icon: Globe }
  ];

  const cuisines = [
    '🍜 Asian', '🍝 Italian', '🌮 Mexican', '🍛 Indian',
    '🥘 Middle Eastern', '🍲 African', '🥖 French', '🍱 Japanese',
    '🥙 Greek', '🌯 Mediterranean', '🍖 BBQ', '🥗 Healthy'
  ];

  const backgrounds = [
    '🇺🇸 American', '🇨🇳 Chinese', '🇮🇳 Indian', '🇲🇽 Mexican',
    '🇮🇹 Italian', '🇯🇵 Japanese', '🇰🇷 Korean', '🇹🇭 Thai',
    '🇫🇷 French', '🇩🇪 German', '🇧🇷 Brazilian', '🇪🇸 Spanish',
    '🇬🇧 British', '🇷🇺 Russian', '🇪🇬 Egyptian', '🇳🇬 Nigerian'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) 
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleBackground = (background: string) => {
    setSelectedBackgrounds(prev => 
      prev.includes(background) 
        ? prev.filter(b => b !== background)
        : [...prev, background]
    );
  };

  const handleComplete = () => {
    const allSelections = [...selectedInterests, ...selectedCuisines, ...selectedBackgrounds];
    onComplete(allSelections);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-600">Tell Us About Your Interests</CardTitle>
            <p className="text-gray-600">Help us personalize your Kandi experience</p>
          </CardHeader>
        </Card>

        {/* Cultural Interests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Cultural Interests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map((interest) => {
                const Icon = interest.icon;
                return (
                  <div
                    key={interest.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedInterests.includes(interest.id)
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleInterest(interest.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={selectedInterests.includes(interest.id)}
                        onChange={() => toggleInterest(interest.id)}
                      />
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{interest.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Food Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Food & Cuisine Preferences
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cuisines.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  className="cursor-pointer p-2 text-sm"
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cultural Background */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Cultural Background & Heritage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {backgrounds.map((background) => (
                <Badge
                  key={background}
                  variant={selectedBackgrounds.includes(background) ? "default" : "outline"}
                  className="cursor-pointer p-2 text-sm justify-center"
                  onClick={() => toggleBackground(background)}
                >
                  {background}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            onClick={handleComplete}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-2"
            disabled={selectedInterests.length === 0 && selectedCuisines.length === 0 && selectedBackgrounds.length === 0}
          >
            Continue to Kandi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CulturalInterestsScreen;