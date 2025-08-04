import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import VideoSharingBox from './VideoSharingBox';

interface VideoRecommendation {
  id: string;
  title: string;
  creator: {
    name: string;
    avatar?: string;
    culturalBackground: string;
  };
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  tags: string[];
  description: string;
  timestamp: string;
  relevanceScore: number;
  category: 'trending' | 'cultural' | 'personal' | 'community';
}

const CubbletonVideoRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<VideoRecommendation[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Simulate Cubbleton AI recommendations
    const mockRecommendations: VideoRecommendation[] = [
      {
        id: '1',
        title: 'Traditional Japanese Tea Ceremony Explained',
        creator: {
          name: 'Yuki Tanaka',
          culturalBackground: 'Japanese'
        },
        thumbnail: '🍵',
        duration: '8:45',
        views: 12500,
        likes: 890,
        comments: 156,
        tags: ['Japanese', 'Culture', 'Tea', 'Traditional'],
        description: 'Learn the ancient art of Japanese tea ceremony and its cultural significance.',
        timestamp: '2h ago',
        relevanceScore: 95,
        category: 'cultural'
      },
      {
        id: '2',
        title: 'Mexican Street Food Tour in Mexico City',
        creator: {
          name: 'Carlos Rodriguez',
          culturalBackground: 'Mexican'
        },
        thumbnail: '🌮',
        duration: '12:30',
        views: 8900,
        likes: 654,
        comments: 89,
        tags: ['Mexican', 'Food', 'Street Food', 'Travel'],
        description: 'Exploring the best street food vendors in Mexico City with local insights.',
        timestamp: '5h ago',
        relevanceScore: 88,
        category: 'trending'
      },
      {
        id: '3',
        title: 'Indian Classical Dance Tutorial - Bharatanatyam',
        creator: {
          name: 'Priya Sharma',
          culturalBackground: 'Indian'
        },
        thumbnail: '💃',
        duration: '15:20',
        views: 6700,
        likes: 445,
        comments: 67,
        tags: ['Indian', 'Dance', 'Classical', 'Tutorial'],
        description: 'Step-by-step guide to basic Bharatanatyam movements and expressions.',
        timestamp: '1d ago',
        relevanceScore: 82,
        category: 'personal'
      },
      {
        id: '4',
        title: 'African Drumming Circle - Community Event',
        creator: {
          name: 'Kwame Asante',
          culturalBackground: 'Ghanaian'
        },
        thumbnail: '🥁',
        duration: '6:15',
        views: 4200,
        likes: 298,
        comments: 45,
        tags: ['African', 'Music', 'Community', 'Drumming'],
        description: 'Join our weekly drumming circle and connect with African rhythms.',
        timestamp: '3d ago',
        relevanceScore: 76,
        category: 'community'
      }
    ];

    setRecommendations(mockRecommendations);
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'cultural', label: 'Cultural', icon: Brain },
    { id: 'community', label: 'Community', icon: Users }
  ];

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === activeCategory);

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-teal-700">
            <Brain className="h-5 w-5" />
            Cubbleton AI Recommendations
          </CardTitle>
          <p className="text-sm text-gray-600">
            Personalized video content based on your cultural interests and engagement patterns
          </p>
        </CardHeader>
      </Card>

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer whitespace-nowrap px-3 py-2 ${
                activeCategory === category.id 
                  ? 'bg-teal-600 hover:bg-teal-700' 
                  : 'hover:bg-teal-50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <Icon className="h-3 w-3 mr-1" />
              {category.label}
            </Badge>
          );
        })}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecommendations.map((video) => (
          <VideoSharingBox key={video.id} {...video} />
        ))}
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-purple-50 to-teal-50 border-purple-200">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="font-medium text-purple-700">AI Insights</span>
          </div>
          <p className="text-sm text-gray-600">
            Based on your viewing patterns, you show high engagement with cultural tutorials and traditional arts. 
            Cubbleton suggests exploring more dance and music content from diverse cultures.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CubbletonVideoRecommendations;