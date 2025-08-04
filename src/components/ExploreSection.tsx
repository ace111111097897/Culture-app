import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Compass, MapPin, Star, Heart, Share2, Search } from 'lucide-react';

const ExploreSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const culturalSites = [
    {
      id: 1,
      name: 'Little Tokyo District',
      location: 'Downtown',
      culture: 'Japanese',
      rating: 4.8,
      reviews: 234,
      image: '/placeholder.svg',
      description: 'Authentic Japanese restaurants, shops, and cultural center',
      tags: ['Food', 'Shopping', 'Culture']
    },
    {
      id: 2,
      name: 'Chinatown Heritage Walk',
      location: 'Historic District',
      culture: 'Chinese',
      rating: 4.6,
      reviews: 189,
      image: '/placeholder.svg',
      description: 'Explore traditional architecture and hidden temples',
      tags: ['History', 'Architecture', 'Walking Tour']
    },
    {
      id: 3,
      name: 'Indian Spice Market',
      location: 'Market Square',
      culture: 'Indian',
      rating: 4.7,
      reviews: 156,
      image: '/placeholder.svg',
      description: 'Vibrant market with authentic spices and street food',
      tags: ['Food', 'Shopping', 'Market']
    }
  ];

  const recommendations = [
    {
      title: 'Best Korean BBQ Spots',
      author: 'Sarah Kim',
      likes: 45,
      culture: 'Korean',
      preview: 'Discover authentic Korean BBQ restaurants that locals love...'
    },
    {
      title: 'Hidden Gems in Little Italy',
      author: 'Marco Rossi',
      likes: 67,
      culture: 'Italian',
      preview: 'Family-owned trattorias and secret recipes passed down...'
    },
    {
      title: 'African Art Galleries Guide',
      author: 'Amara Johnson',
      likes: 32,
      culture: 'African',
      preview: 'Contemporary and traditional African art spaces to visit...'
    }
  ];

  const filteredSites = culturalSites.filter(site =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.culture.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Cultures</h1>
          <p className="text-gray-600">Discover cultural hotspots and hidden gems</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search cultural sites and locations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Cultural Sites */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => (
          <Card key={site.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-r from-purple-100 to-blue-100 rounded-t-lg flex items-center justify-center">
              <Compass className="h-12 w-12 text-purple-400" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{site.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{site.location}</span>
                  </div>
                </div>
                <Badge variant="outline">{site.culture}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm mb-4">{site.description}</p>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{site.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({site.reviews} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                {site.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Community Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg hover:from-purple-100 hover:to-blue-100 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                  <Badge variant="outline">{rec.culture}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">by {rec.author}</p>
                <p className="text-gray-700 text-sm mb-3">{rec.preview}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-600">{rec.likes} likes</span>
                  </div>
                  <Button variant="ghost" size="sm">Read More</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExploreSection;