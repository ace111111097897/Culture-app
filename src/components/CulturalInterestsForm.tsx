import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Globe, Heart, MapPin } from 'lucide-react';

interface Country {
  code: string;
  name: string;
  flag: string;
  continent: string;
}

const CulturalInterestsForm: React.FC = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const countries: Country[] = [
    // Asia
    { code: 'CN', name: 'China', flag: '🇨🇳', continent: 'Asia' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', continent: 'Asia' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', continent: 'Asia' },
    { code: 'IN', name: 'India', flag: '🇮🇳', continent: 'Asia' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭', continent: 'Asia' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳', continent: 'Asia' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭', continent: 'Asia' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩', continent: 'Asia' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾', continent: 'Asia' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬', continent: 'Asia' },
    // Europe
    { code: 'FR', name: 'France', flag: '🇫🇷', continent: 'Europe' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', continent: 'Europe' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', continent: 'Europe' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', continent: 'Europe' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', continent: 'Europe' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷', continent: 'Europe' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', continent: 'Europe' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱', continent: 'Europe' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱', continent: 'Europe' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪', continent: 'Europe' },
    // Americas
    { code: 'US', name: 'United States', flag: '🇺🇸', continent: 'Americas' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', continent: 'Americas' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', continent: 'Americas' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', continent: 'Americas' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', continent: 'Americas' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', continent: 'Americas' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪', continent: 'Americas' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', continent: 'Americas' },
    // Africa
    { code: 'EG', name: 'Egypt', flag: '🇪🇬', continent: 'Africa' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', continent: 'Africa' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', continent: 'Africa' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', continent: 'Africa' },
    { code: 'MA', name: 'Morocco', flag: '🇲🇦', continent: 'Africa' },
    { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', continent: 'Africa' },
    // Oceania
    { code: 'AU', name: 'Australia', flag: '🇦🇺', continent: 'Oceania' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', continent: 'Oceania' },
    // Middle East
    { code: 'TR', name: 'Turkey', flag: '🇹🇷', continent: 'Middle East' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', continent: 'Middle East' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪', continent: 'Middle East' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱', continent: 'Middle East' },
    { code: 'IR', name: 'Iran', flag: '🇮🇷', continent: 'Middle East' }
  ];

  const culturalInterests = [
    'Traditional Music', 'Folk Dance', 'Cuisine & Food', 'Festivals & Celebrations',
    'Art & Crafts', 'Literature & Poetry', 'Religious Traditions', 'Language Learning',
    'Historical Sites', 'Traditional Games', 'Fashion & Clothing', 'Architecture',
    'Philosophy & Wisdom', 'Martial Arts', 'Tea Culture', 'Street Food',
    'Wedding Traditions', 'Storytelling', 'Calligraphy', 'Traditional Medicine'
  ];

  const continents = [...new Set(countries.map(c => c.continent))];

  const toggleCountry = (countryCode: string) => {
    setSelectedCountries(prev => 
      prev.includes(countryCode) 
        ? prev.filter(c => c !== countryCode)
        : [...prev, countryCode]
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
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Cultural Interests & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Countries by Continent */}
          {continents.map(continent => (
            <div key={continent}>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {continent}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {countries.filter(c => c.continent === continent).map(country => (
                  <div key={country.code} className="flex items-center space-x-2">
                    <Checkbox
                      id={country.code}
                      checked={selectedCountries.includes(country.code)}
                      onCheckedChange={() => toggleCountry(country.code)}
                    />
                    <label htmlFor={country.code} className="flex items-center gap-2 cursor-pointer">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm">{country.name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Cultural Interests */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Cultural Interests
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {culturalInterests.map(interest => (
                <div key={interest} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest}
                    checked={selectedInterests.includes(interest)}
                    onCheckedChange={() => toggleInterest(interest)}
                  />
                  <label htmlFor={interest} className="text-sm cursor-pointer">
                    {interest}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Summary */}
          <div className="space-y-3">
            <h4 className="font-medium">Your Selections:</h4>
            <div>
              <p className="text-sm text-gray-600 mb-2">Countries ({selectedCountries.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedCountries.map(code => {
                  const country = countries.find(c => c.code === code);
                  return country ? (
                    <Badge key={code} variant="secondary">
                      {country.flag} {country.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Interests ({selectedInterests.length}):</p>
              <div className="flex flex-wrap gap-2">
                {selectedInterests.map(interest => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button className="w-full">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalInterestsForm;