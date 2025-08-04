import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Search, TrendingUp, MapPin, Users, Play, Heart, MessageCircle, Share, Filter, Map } from 'lucide-react';
import { Input } from '@/components/ui/input';

const EnhancedDiscoverSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [showRoadmap, setShowRoadmap] = useState(false);

  const trendingCubbles = [
    {
      id: '1',
      title: 'Diwali Celebrations',
      creator: 'Priya Sharma',
      culture: 'Indian',
      views: '12.5k',
      likes: '2.1k',
      thumbnail: '/placeholder.svg',
      duration: '2:45',
      type: 'video',
      tags: ['festival', 'traditions', 'lights']
    },
    {
      id: '2',
      title: 'Tokyo Street Food',
      creator: 'Kenji Tanaka',
      culture: 'Japanese',
      views: '8.9k',
      likes: '1.8k',
      thumbnail: '/placeholder.svg',
      duration: '3:12',
      type: 'video',
      tags: ['food', 'street', 'culture']
    },
    {
      id: '3',
      title: 'Flamenco Dance',
      creator: 'Isabella Garcia',
      culture: 'Spanish',
      views: '15.2k',
      likes: '3.4k',
      thumbnail: '/placeholder.svg',
      duration: '4:20',
      type: 'video',
      tags: ['dance', 'music', 'passion']
    }
  ];

  const culturalJourney = [
    { step: 1, culture: 'Japanese', theme: 'Tea Ceremony', completed: true },
    { step: 2, culture: 'Indian', theme: 'Yoga & Meditation', completed: true },
    { step: 3, culture: 'Mexican', theme: 'Day of the Dead', completed: false, current: true },
    { step: 4, culture: 'Egyptian', theme: 'Ancient Mysteries', completed: false },
    { step: 5, culture: 'Brazilian', theme: 'Carnival Spirit', completed: false }
  ];

  const filters = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'nearby', label: 'Nearby', icon: MapPin },
    { id: 'following', label: 'Following', icon: Users },
    { id: 'roadmap', label: 'Cultural Journey', icon: Map }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Discover
        </h1>
        <p className="text-gray-600">Explore trending Cubbles and embark on cultural journeys</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Cubbles, cultures, creators..."
            className="pl-10 border-orange-200 focus:border-orange-400"
          />
        </div>
        <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => {
                setActiveFilter(filter.id);
                setShowRoadmap(filter.id === 'roadmap');
              }}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600' 
                  : 'border-orange-200 hover:bg-orange-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Cultural Journey Roadmap */}
      {showRoadmap && (
        <Card className="mb-6 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Map className="h-5 w-5 text-purple-500" />
              <span>Your Cultural Journey</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {culturalJourney.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2
                    ${step.completed ? 'bg-green-500 text-white border-green-500' : 
                      step.current ? 'bg-orange-500 text-white border-orange-500' : 
                      'bg-gray-100 text-gray-400 border-gray-200'}
                  `}>
                    {step.step}
                  </div>
                  <div className="ml-3 mr-6">
                    <p className="font-medium text-sm">{step.culture}</p>
                    <p className="text-xs text-gray-500">{step.theme}</p>
                  </div>
                  {index < culturalJourney.length - 1 && (
                    <div className={`w-8 h-0.5 ${step.completed ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Cubbles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingCubbles.map((cubble) => (
          <Card key={cubble.id} className="group hover:shadow-lg transition-all duration-300 border-orange-100 overflow-hidden">
            <div className="relative">
              <img 
                src={cubble.thumbnail} 
                alt={cubble.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-3 right-3">
                <Badge className="bg-orange-500 text-white">
                  {cubble.duration}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold mb-1">{cubble.title}</h3>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <img src="/placeholder.svg" alt={cubble.creator} />
                  </Avatar>
                  <span className="text-white text-sm">{cubble.creator}</span>
                  <Badge variant="outline" className="text-white border-white text-xs">
                    {cubble.culture}
                  </Badge>
                </div>
              </div>
              <Button 
                size="sm" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm hover:bg-white/30"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-1 mb-3">
                {cubble.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                    #{tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                <span>{cubble.views} views</span>
                <span>{cubble.likes} likes</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-pink-50">
                    <Heart className="h-4 w-4 text-pink-500" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-blue-50">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button size="sm" variant="ghost" className="p-2 hover:bg-purple-50">
                    <Share className="h-4 w-4 text-purple-500" />
                  </Button>
                </div>
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
                  Watch
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnhancedDiscoverSection;