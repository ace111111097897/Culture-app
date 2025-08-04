import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Heart,
  MessageCircle,
  Share2,
  Play,
  Star,
  Zap,
  Eye,
  ThumbsUp,
  Calendar,
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SmartHomeContentProps {
  username: string;
}

interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'post' | 'match' | 'event' | 'recommendation';
  thumbnail?: string;
  creator: string;
  engagement: number;
  isNew: boolean;
  aiScore: number;
  timestamp: string;
  description?: string;
  tags: string[];
}

const SmartHomeContent: React.FC<SmartHomeContentProps> = ({ username }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    fetchSmartContent();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchSmartContent, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [username]);

  const fetchSmartContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          action: 'get_smart_home_content',
          username,
          filter: activeFilter,
          timestamp: new Date().toISOString()
        },
      });

      if (data?.content) {
        setContent(data.content);
        setLastUpdated(new Date());
      } else {
        // Fallback content
        setContent([
          {
            id: '1',
            title: 'Cultural Dance Workshop',
            type: 'video',
            creator: 'Maya Chen',
            engagement: 89,
            isNew: true,
            aiScore: 95,
            timestamp: '2 hours ago',
            description: 'Learn traditional dance moves from around the world',
            tags: ['culture', 'dance', 'workshop']
          },
          {
            id: '2',
            title: 'Perfect Match Found!',
            type: 'match',
            creator: 'Cubbleton AI',
            engagement: 100,
            isNew: true,
            aiScore: 98,
            timestamp: '1 hour ago',
            description: 'We found someone who shares your love for cultural exploration',
            tags: ['match', 'culture', 'compatibility']
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching smart content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'match': return <Heart className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      case 'post': return <MessageCircle className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-600';
      case 'match': return 'bg-pink-100 text-pink-600';
      case 'event': return 'bg-blue-100 text-blue-600';
      case 'post': return 'bg-green-100 text-green-600';
      default: return 'bg-purple-100 text-purple-600';
    }
  };

  const filters = [
    { id: 'all', label: 'All Content', icon: Sparkles },
    { id: 'video', label: 'Videos', icon: Play },
    { id: 'match', label: 'Matches', icon: Heart },
    { id: 'event', label: 'Events', icon: Calendar }
  ];

  return (
    <div className="space-y-6">
      {/* Header with AI Insights */}
      <Card className="bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-teal-500 to-purple-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Smart Home Feed</h2>
              <p className="text-sm text-gray-600">Powered by Cubbleton AI</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              Updated {lastUpdated.toLocaleTimeString()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Personalized for {username}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{content.length} recommendations</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white' 
                  : 'hover:bg-teal-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Content Grid */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content
            .filter(item => activeFilter === 'all' || item.type === activeFilter)
            .map((item) => (
            <Card key={item.id} className="hover:shadow-lg transition-all duration-200 group">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    {item.isNew && (
                      <Badge className="bg-green-100 text-green-700 text-xs">New</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{item.aiScore}%</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>by {item.creator}</span>
                  <span>{item.timestamp}</span>
                </div>
                
                {item.tags && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{item.engagement}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>12</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="h-3 w-3" />
                      <span>5</span>
                    </div>
                  </div>
                  
                  <Button size="sm" variant="ghost" className="text-teal-600 hover:bg-teal-50">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <Button 
          onClick={fetchSmartContent}
          disabled={loading}
          className="bg-gradient-to-r from-teal-500 to-purple-600 text-white hover:from-teal-600 hover:to-purple-700"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          {loading ? 'Updating...' : 'Refresh Feed'}
        </Button>
      </div>
    </div>
  );
};

export default SmartHomeContent;