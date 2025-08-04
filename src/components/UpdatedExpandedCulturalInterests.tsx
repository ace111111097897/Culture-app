import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Globe, Star, Film, Music, Utensils, Palette } from 'lucide-react';

const UpdatedExpandedCulturalInterests: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [expandedSubcategories, setExpandedSubcategories] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const culturalCategories = {
    'North America': {
      icon: Globe,
      subcategories: {
        'United States': {
          states: {
            'California': ['Hollywood', 'Silicon Valley', 'Surf Culture', 'Wine Country'],
            'New York': ['Broadway', 'Jazz', 'Street Art', 'Fashion Week'],
            'Texas': ['BBQ Culture', 'Country Music', 'Rodeo', 'Tex-Mex'],
            'Louisiana': ['Creole Culture', 'Jazz Origins', 'Mardi Gras', 'Cajun Cuisine']
          }
        },
        'Canada': {
          provinces: {
            'Quebec': ['French Culture', 'Maple Syrup', 'Winter Carnival', 'Poutine'],
            'British Columbia': ['Indigenous Art', 'Pacific Culture', 'Wine Regions', 'Outdoor Sports'],
            'Ontario': ['Multicultural Toronto', 'Niagara Falls', 'Hockey Heritage', 'Film Industry']
          }
        },
        'Mexico': {
          regions: {
            'Yucatan': ['Mayan Heritage', 'Cenotes', 'Cochinita Pibil', 'Chichen Itza'],
            'Oaxaca': ['Indigenous Crafts', 'Mezcal', 'Day of the Dead', 'Textiles'],
            'Jalisco': ['Mariachi', 'Tequila', 'Charreada', 'Guadalajara Culture']
          }
        }
      }
    },
    'Africa': {
      icon: Globe,
      subcategories: {
        'West Africa': {
          countries: {
            'Nigeria': ['Nollywood', 'Afrobeats', 'Yoruba Culture', 'Jollof Rice'],
            'Ghana': ['Highlife Music', 'Kente Cloth', 'Akan Culture', 'Gold Coast History'],
            'Senegal': ['Wolof Culture', 'Mbalax Music', 'Teranga Hospitality', 'Dakar Fashion']
          }
        },
        'East Africa': {
          countries: {
            'Kenya': ['Maasai Culture', 'Safari Heritage', 'Swahili Language', 'Coffee Culture'],
            'Ethiopia': ['Ancient Christianity', 'Coffee Origins', 'Injera Cuisine', 'Lalibela Churches']
          }
        },
        'Southern Africa': {
          countries: {
            'South Africa': ['Ubuntu Philosophy', 'Rainbow Nation', 'Braai Culture', 'Apartheid History'],
            'Zimbabwe': ['Shona Sculpture', 'Great Zimbabwe', 'Mbira Music', 'Stone Carving']
          }
        }
      }
    },
    'Film': {
      icon: Film,
      subcategories: {
        'Action': {
          genres: {
            'Martial Arts': ['Kung Fu', 'Karate', 'Mixed Martial Arts', 'Samurai'],
            'Superhero': ['Marvel', 'DC Comics', 'Indie Heroes', 'Anime Heroes'],
            'Thriller': ['Espionage', 'Crime', 'Psychological', 'Political']
          }
        },
        'Drama': {
          genres: {
            'Romance': ['Classic Romance', 'Modern Love', 'Period Romance', 'Indie Romance'],
            'Historical': ['War Films', 'Biographical', 'Period Pieces', 'Cultural Heritage'],
            'Family': ['Coming of Age', 'Family Dynamics', 'Children\'s Stories', 'Generational']
          }
        }
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

  const toggleSubcategory = (subcategory: string) => {
    setExpandedSubcategories(prev => 
      prev.includes(subcategory) 
        ? prev.filter(c => c !== subcategory)
        : [...prev, subcategory]
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
        <p className="text-gray-600">Customize your cultural profile with detailed preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(culturalCategories).map(([category, data]) => {
            const Icon = data.icon;
            const isExpanded = expandedCategories.includes(category);
            
            return (
              <Card key={category} className="border-orange-100 shadow-sm">
                <CardHeader 
                  className="cursor-pointer hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200"
                  onClick={() => toggleCategory(category)}
                >
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-5 w-5 text-orange-500" />
                      <span className="text-gray-800">{category}</span>
                    </div>
                    {isExpanded ? 
                      <ChevronDown className="h-5 w-5 text-orange-400" /> : 
                      <ChevronRight className="h-5 w-5 text-orange-400" />
                    }
                  </CardTitle>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="pt-0 space-y-4">
                    {Object.entries(data.subcategories).map(([subcategory, subData]) => {
                      const isSubExpanded = expandedSubcategories.includes(`${category}-${subcategory}`);
                      
                      return (
                        <div key={subcategory} className="border-l-2 border-orange-200 pl-4">
                          <div 
                            className="cursor-pointer hover:bg-orange-50 p-2 rounded transition-colors"
                            onClick={() => toggleSubcategory(`${category}-${subcategory}`)}
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-700">{subcategory}</h4>
                              {isSubExpanded ? 
                                <ChevronDown className="h-4 w-4 text-gray-400" /> : 
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                              }
                            </div>
                          </div>
                          
                          {isSubExpanded && (
                            <div className="mt-2 ml-4 space-y-3">
                              {Object.entries(subData as any).map(([region, items]) => (
                                <div key={region}>
                                  <h5 className="text-sm font-medium text-gray-600 mb-2">{region}</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {(items as string[]).map((item) => (
                                      <Button
                                        key={item}
                                        variant={selectedInterests.includes(item) ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => toggleInterest(item)}
                                        className={`text-xs transition-all duration-200 ${
                                          selectedInterests.includes(item)
                                            ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white'
                                            : 'border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:border-orange-300'
                                        }`}
                                      >
                                        {item}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card className="border-pink-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-pink-500" />
                <span className="text-gray-800">Zodiac Sign</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-3 gap-2">
                {zodiacSigns.map((sign) => (
                  <Button
                    key={sign}
                    variant={selectedInterests.includes(sign) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleInterest(sign)}
                    className={`text-xs transition-all duration-200 ${
                      selectedInterests.includes(sign)
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
                        : 'border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:border-pink-300'
                    }`}
                  >
                    {sign}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 shadow-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-pink-50">
              <CardTitle className="text-orange-700">Selected Interests</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {selectedInterests.length > 0 ? (
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {selectedInterests.map((interest) => (
                    <Badge 
                      key={interest} 
                      className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 hover:from-orange-200 hover:to-pink-200 cursor-pointer transition-all duration-200"
                      onClick={() => toggleInterest(interest)}
                    >
                      {interest} ×
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Select your cultural interests above</p>
              )}
              
              <div className="mt-4 pt-4 border-t border-orange-100">
                <p className="text-xs text-gray-500 mb-2">
                  {selectedInterests.length} interests selected
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all duration-200"
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

export default UpdatedExpandedCulturalInterests;