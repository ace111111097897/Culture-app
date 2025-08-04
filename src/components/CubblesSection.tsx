import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { QRCodeManager } from './QRCodeManager';
import { 
  Hexagon, Plus, Search, Filter, Heart, MessageCircle, 
  Users, Globe, Star, TrendingUp, Clock, MapPin, QrCode 
} from 'lucide-react';

const CubblesSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQRManager, setShowQRManager] = useState(false);
  const [selectedCubbleId, setSelectedCubbleId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Cubbles', icon: Hexagon },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'cultural', label: 'Cultural', icon: Globe },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'recent', label: 'Recent', icon: Clock },
    { id: 'local', label: 'Local', icon: MapPin }
  ];

  const cubbles = [
    {
      id: '1',
      title: 'Latino Food Lovers',
      description: 'Share your favorite Latino dishes and discover new flavors from across Latin America',
      members: 2847,
      category: 'cultural',
      trending: true,
      location: 'Global',
      tags: ['Food', 'Culture', 'Latino', 'Recipes'],
      activity: '24 new posts today'
    },
    {
      id: '2',
      title: 'K-Pop Dance Crew',
      description: 'Learn choreography, share dance videos, and connect with fellow K-Pop enthusiasts',
      members: 1923,
      category: 'cultural',
      trending: true,
      location: 'Worldwide',
      tags: ['K-Pop', 'Dance', 'Music', 'Performance'],
      activity: '18 new posts today'
    },
    {
      id: '3',
      title: 'African Art & Crafts',
      description: 'Celebrate African artistry, share traditional crafts, and learn about cultural heritage',
      members: 1456,
      category: 'cultural',
      trending: false,
      location: 'Global',
      tags: ['Art', 'Crafts', 'African', 'Heritage'],
      activity: '12 new posts today'
    },
    {
      id: '4',
      title: 'Local Meetup Squad',
      description: 'Organize and join local cultural events, festivals, and community gatherings',
      members: 892,
      category: 'local',
      trending: false,
      location: 'Your City',
      tags: ['Meetup', 'Local', 'Events', 'Community'],
      activity: '8 new posts today'
    }
  ];

  const filteredCubbles = cubbles.filter(cubble => {
    const matchesSearch = cubble.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cubble.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cubble.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || cubble.category === selectedCategory ||
                           (selectedCategory === 'trending' && cubble.trending);
    return matchesSearch && matchesCategory;
  });

  const handleShareCubble = (cubbleId: string) => {
    setSelectedCubbleId(cubbleId);
    setShowQRManager(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cubbles
            </h1>
          </div>
          <p className="text-lg text-gray-600 mb-6">
            Join cultural communities and connect with like-minded people in the culture bubble
          </p>
          
          <div className="flex justify-center gap-4">
            <Button className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg">
              <Plus className="w-5 h-5 mr-2" />
              Create New Cubble
            </Button>
            <Button 
              onClick={() => setShowQRManager(true)}
              variant="outline" 
              className="px-8 py-3 rounded-full border-teal-200 hover:bg-teal-50"
            >
              <QrCode className="w-5 h-5 mr-2" />
              QR Codes
            </Button>
          </div>
        </div>

        {/* QR Code Manager Modal */}
        {showQRManager && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">QR Code Manager</h2>
                <Button variant="ghost" onClick={() => setShowQRManager(false)}>
                  ×
                </Button>
              </div>
              <QRCodeManager 
                userId="current-user"
                cubbleId={selectedCubbleId || undefined}
              />
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search cubbles, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white/80 border-teal-200 focus:border-teal-400 rounded-full"
              />
            </div>
            <Button variant="outline" className="px-6 py-3 rounded-full border-teal-200 hover:bg-teal-50">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={`rounded-full px-4 py-2 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 text-white'
                      : 'border-teal-200 hover:bg-teal-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Cubbles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCubbles.map((cubble) => (
            <Card key={cubble.id} className="bg-white/80 backdrop-blur-sm border-teal-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Hexagon className="w-5 h-5 text-teal-600" />
                    {cubble.title}
                    {cubble.trending && (
                      <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </CardTitle>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cubble.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {cubble.members.toLocaleString()} members
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {cubble.location}
                  </div>
                </div>

                {/* Activity */}
                <p className="text-sm text-green-600 font-medium">
                  {cubble.activity}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {cubble.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-teal-200 text-teal-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white rounded-full">
                    Join Cubble
                  </Button>
                  <Button 
                    onClick={() => handleShareCubble(cubble.id)}
                    variant="outline" 
                    size="sm" 
                    className="px-3 rounded-full border-teal-200 hover:bg-teal-50"
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 rounded-full border-teal-200 hover:bg-teal-50">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredCubbles.length === 0 && (
          <div className="text-center py-12">
            <Hexagon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No cubbles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or explore different categories</p>
            <Button className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full">
              <Plus className="w-4 h-4 mr-2" />
              Create the First Cubble
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CubblesSection;