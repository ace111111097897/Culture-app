import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CubbleStoryViewer from './CubbleStoryViewer';
import { 
  Plus, Clock, Users, Globe, 
  Play, Camera, Heart
} from 'lucide-react';

const VerticalCubblesSection: React.FC = () => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  const cubbleStories = [
    {
      id: '1',
      userId: 'user1',
      username: 'Maria_Salsa',
      avatar: '/api/placeholder/40/40',
      content: {
        type: 'image' as const,
        url: '/api/placeholder/400/600',
      },
      caption: 'Making abuela\'s famous empanadas! 🥟✨',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 10 * 60 * 60 * 1000),
      likes: 24,
      comments: 8,
      culturalTags: ['Latino', 'Food', 'Family Recipe'],
      preview: '/api/placeholder/80/80'
    },
    {
      id: '2',
      userId: 'user2',
      username: 'KpopDancer_Jin',
      avatar: '/api/placeholder/40/40',
      content: {
        type: 'video' as const,
        url: '/api/placeholder/400/600',
        thumbnail: '/api/placeholder/80/80'
      },
      caption: 'New choreography practice! Who wants to learn? 💃',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      expiresAt: new Date(Date.now() + 11 * 60 * 60 * 1000),
      likes: 89,
      comments: 23,
      culturalTags: ['K-Pop', 'Dance', 'Tutorial'],
      preview: '/api/placeholder/80/80'
    },
    {
      id: '3',
      userId: 'user3',
      username: 'AfricanArt_Zara',
      avatar: '/api/placeholder/40/40',
      content: {
        type: 'image' as const,
        url: '/api/placeholder/400/600',
      },
      caption: 'Traditional Ankara patterns I\'m working on 🎨',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      expiresAt: new Date(Date.now() + 11.5 * 60 * 60 * 1000),
      likes: 45,
      comments: 12,
      culturalTags: ['African', 'Art', 'Textile'],
      preview: '/api/placeholder/80/80'
    }
  ];

  const activeCubbles = [
    {
      id: 1,
      name: 'Latino Culture Hub',
      members: 2847,
      activeStories: 12,
      lastActivity: '2 min ago',
      category: 'Cultural',
      color: 'from-teal-500 to-blue-600'
    },
    {
      id: 2,
      name: 'K-Pop Universe',
      members: 3921,
      activeStories: 28,
      lastActivity: '5 min ago',
      category: 'Music & Dance',
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 3,
      name: 'African Heritage',
      members: 1856,
      activeStories: 8,
      lastActivity: '12 min ago',
      category: 'Art & Culture',
      color: 'from-teal-600 to-blue-500'
    }
  ];

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
    setShowStoryViewer(true);
  };

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diff = expiresAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="flex">
      {/* Main Content Area */}
      <div className="flex-1 pr-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg transform-gpu perspective-1000 rotate-y-12">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cubbles
              </h1>
              <p className="text-sm text-gray-500 italic">Culture Spheres - 12 Hour Stories</p>
            </div>
          </div>
          
          <Button className="bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Create Cubble Story
          </Button>
        </div>

        {/* Active Cubbles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCubbles.map((cubble) => (
            <Card key={cubble.id} className="bg-white/80 backdrop-blur-sm border-teal-100 hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className={`w-full h-32 bg-gradient-to-r ${cubble.color} rounded-lg mb-4 flex items-center justify-center transform-gpu perspective-1000 rotate-x-6`}>
                  <Globe className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{cubble.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {cubble.members.toLocaleString()} members
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {cubble.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">
                      {cubble.activeStories} active stories
                    </span>
                    <span className="text-gray-500">
                      {cubble.lastActivity}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-teal-600 via-blue-600 to-purple-600 hover:from-teal-700 hover:via-blue-700 hover:to-purple-700 text-white rounded-full">
                    Join Cubble
                  </Button>
                  <Button variant="outline" size="sm" className="px-3 rounded-full border-teal-200 hover:bg-teal-50">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Vertical Cubbles Sidebar */}
      <div className="w-24 flex flex-col items-center space-y-4 py-4 border-l border-teal-100">
        <div className="text-center mb-4">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Active Stories</h3>
          <Clock className="w-5 h-5 text-teal-600 mx-auto" />
        </div>
        
        {cubbleStories.map((story, index) => (
          <div
            key={story.id}
            onClick={() => handleStoryClick(index)}
            className="cursor-pointer group relative"
          >
            {/* 3D Spherical Story Preview */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 via-blue-500 to-purple-600 p-1 shadow-xl group-hover:scale-110 transition-all duration-300 transform-gpu perspective-1000 hover:rotate-y-12">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-inner">
                <img 
                  src={story.preview} 
                  alt={story.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Content Type Indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-lg border border-teal-200">
              {story.content.type === 'video' ? 
                <Play className="w-2.5 h-2.5 text-teal-600" /> : 
                <Camera className="w-2.5 h-2.5 text-teal-600" />
              }
            </div>
            
            {/* Timer */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-white/95 text-teal-600 text-xs px-1.5 py-0.5 shadow-sm">
                {getTimeRemaining(story.expiresAt)}
              </Badge>
            </div>
            
            <p className="text-center text-xs font-medium text-gray-600 mt-2 truncate w-16">
              {story.username.split('_')[0]}
            </p>
          </div>
        ))}
        
        {/* Add Story Button */}
        <div className="cursor-pointer group">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-300 flex items-center justify-center group-hover:border-teal-500 transition-colors transform-gpu perspective-1000 hover:rotate-y-12">
            <Plus className="w-6 h-6 text-teal-400 group-hover:text-teal-600" />
          </div>
          <p className="text-center text-xs font-medium text-gray-500 mt-2">
            Add Story
          </p>
        </div>
      </div>

      {/* Story Viewer */}
      {showStoryViewer && selectedStoryIndex !== null && (
        <CubbleStoryViewer
          stories={cubbleStories}
          currentIndex={selectedStoryIndex}
          onClose={() => setShowStoryViewer(false)}
          onNext={() => {
            if (selectedStoryIndex < cubbleStories.length - 1) {
              setSelectedStoryIndex(selectedStoryIndex + 1);
            }
          }}
          onPrevious={() => {
            if (selectedStoryIndex > 0) {
              setSelectedStoryIndex(selectedStoryIndex - 1);
            }
          }}
        />
      )}
    </div>
  );
};

export default VerticalCubblesSection;