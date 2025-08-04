import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Globe, Star, Film, Music, Utensils, Palette } from 'lucide-react';

const ExpandedCulturalInterests: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const culturalCategories = {
    'North America': {
      icon: Globe,
      subcategories: {
        'United States': ['Jazz Music', 'Hollywood Films', 'BBQ Culture', 'Hip Hop', 'Broadway'],
        'Canada': ['Indigenous Culture', 'Maple Traditions', 'Hockey Culture', 'French Canadian'],
        'Mexico': ['Mariachi Music', 'Day of the Dead', 'Aztec Heritage', 'Mexican Cuisine']
      }
    },
    'Africa': {
      icon: Globe,
      subcategories: {
        'Nigeria': ['Nollywood Films', 'Afrobeats Music', 'Yoruba Culture', 'Igbo Traditions'],
        'Egypt': ['Ancient History', 'Pharaonic Culture', 'Arabic Music', 'Islamic Art'],
        'South Africa': ['Ubuntu Philosophy', 'Apartheid History', 'Zulu Culture', 'Wine Culture']
      }
    },
    'Film': {
      icon: Film,
      subcategories: {
        'Action': ['Martial Arts', 'Superhero', 'Thriller', 'Adventure'],
        'Drama': ['Romance', 'Historical', 'Biographical', 'Family'],
        'Comedy': ['Romantic Comedy', 'Satire', 'Slapstick', 'Dark Comedy'],
        'Documentary': ['Nature', 'History', 'Science', 'Culture']
      }
    },
    'Music': {
      icon: Music,
      subcategories: {
        'Classical': ['Opera', 'Symphony', 'Chamber Music', 'Baroque'],
        'World Music': ['Reggae', 'Flamenco', 'Gamelan', 'Celtic'],
        'Modern': ['Pop', 'Rock', 'Electronic', 'Hip Hop']
      }
    },
    'Cuisine': {
      icon: Utensils,
      subcategories: {
        'Asian': ['Sushi', 'Dim Sum', 'Curry', 'Pho', 'Kimchi'],
        'European': ['Pasta', 'Cheese', 'Wine', 'Pastries', 'Tapas'],
        'Latin': ['Tacos', 'Ceviche', 'Empanadas', 'Paella', 'Churros']
      }
    },
    'Arts': {
      icon: Palette,
      subcategories: {
        'Visual Arts': ['Painting', 'Sculpture', 'Photography', 'Digital Art'],
        'Performing Arts': ['Dance', 'Theater', 'Circus', 'Street Performance'],
        'Crafts': ['Pottery', 'Weaving', 'Jewelry', 'Woodworking']
      }
    }
  };

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Cultural Interests
        </h1>
        <p className="text-gray-600">Customize your cultural profile and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(culturalCategories).map(([category, data]) => {
            const Icon = data.icon;
            const isExpanded = expandedCategories.includes(category);
            
            return (
              <Card key={category} className="border-orange-100">
                <CardHeader 
                  className="cursor-pointer hover:bg-orange-50 transition-colors"
                  onClick={() => toggleCategory(category)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-orange-500" />
                      <span>{category}</span>
                    </div>
                    {isExpanded ? 
                      <ChevronDown className="h-5 w-5 text-gray-400" /> : 
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    }
                  </CardTitle>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {Object.entries(data.subcategories).map(([subcategory, items]) => (
                        <div key={subcategory}>
                          <h4 className="font-medium text-gray-700 mb-2">{subcategory}</h4>
                          <div className="flex flex-wrap gap-2">
                            {items.map((item) => (
                              <Button
                                key={item}
                                variant={selectedInterests.includes(item) ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleInterest(item)}
                                className={`text-xs ${
                                  selectedInterests.includes(item)
                                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600'
                                    : 'border-orange-200 hover:bg-orange-50'
                                }`}
                              >
                                {item}
                              </Button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-purple-500" />
                <span>Zodiac Sign</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {zodiacSigns.map((sign) => (
                  <Button
                    key={sign}
                    variant={selectedInterests.includes(sign) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleInterest(sign)}
                    className={`text-xs ${
                      selectedInterests.includes(sign)
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        : 'border-purple-200 hover:bg-purple-50'
                    }`}
                  >
                    {sign}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-700">Selected Interests</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map((interest) => (
                    <Badge 
                      key={interest} 
                      className="bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest} ×
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No interests selected yet</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-green-100">
                <p className="text-xs text-gray-500 mb-2">
                  {selectedInterests.length} interests selected
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  disabled={selectedInterests.length === 0}
                >
                  Save Cultural Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCulturalInterests;