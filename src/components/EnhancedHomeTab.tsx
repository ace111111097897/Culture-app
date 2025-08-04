import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Users, 
  Heart,
  MessageCircle,
  Share2,
  Play,
  Star,
  Zap
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EnhancedHomeTabProps {
  username: string;
  isActive: boolean;
  onClick: () => void;
  hasUpdates?: boolean;
}

interface RecommendedContent {
  id: string;
  title: string;
  type: 'video' | 'post' | 'match' | 'event';
  thumbnail?: string;
  creator: string;
  engagement: number;
  isNew: boolean;
  aiScore: number;
}

const EnhancedHomeTab: React.FC<EnhancedHomeTabProps> = ({
  username,
  isActive,
  onClick,
  hasUpdates = false
}) => {
  const [recommendations, setRecommendations] = useState<RecommendedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch personalized content when tab becomes active
  useEffect(() => {
    if (isActive) {
      fetchPersonalizedContent();
    }
  }, [isActive, username]);

  const fetchPersonalizedContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          action: 'get_home_recommendations',
          username,
          timestamp: new Date().toISOString()
        },
      });

      if (data?.recommendations) {
        setRecommendations(data.recommendations);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = () => {
    onClick();
    // Add visual feedback animation
    const element = document.getElementById('home-tab-button');
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => element.classList.remove('animate-pulse'), 300);
    }
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Home Tab Button */}
      <button
        id="home-tab-button"
        onClick={handleTabClick}
        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 relative group ${
          isActive 
            ? 'bg-gradient-to-r from-teal-500 to-purple-600 text-white shadow-lg transform scale-105' 
            : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-purple-50 hover:text-teal-700 hover:shadow-md'
        }`}
      >
        <div className={`p-2 rounded-lg ${isActive ? 'bg-white/20' : 'bg-teal-100'}`}>
          <Home className={`h-6 w-6 ${isActive ? 'text-white' : 'text-teal-600'} transition-transform group-hover:scale-110`} />
        </div>
        
        <div className="flex-1 text-left">
          <div className={`font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
            Home
          </div>
          <div className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
            Your personalized feed
          </div>
        </div>

        {/* Update notification badge */}
        {hasUpdates && (
          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
            New
          </Badge>
        )}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute right-3 w-3 h-3 bg-white rounded-full opacity-80 animate-pulse"></div>
        )}

        {/* Sparkle effect for active state */}
        {isActive && (
          <Sparkles className="absolute top-2 right-2 h-4 w-4 text-white/60 animate-spin" />
        )}
      </button>

      {/* Dynamic Content Preview (when active) */}
      {isActive && (
        <Card className="bg-white/90 backdrop-blur-sm border-teal-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Cubbleton AI Picks for You
              <Badge variant="secondary" className="text-xs">
                Updated {lastUpdated.toLocaleTimeString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="flex items-center gap-2 text-gray-500">
                <Zap className="h-4 w-4 animate-spin" />
                <span>Personalizing your content...</span>
              </div>
            ) : (
              <div className="space-y-2">
                {recommendations.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                    <div className={`p-1 rounded ${
                      item.type === 'video' ? 'bg-red-100 text-red-600' :
                      item.type === 'match' ? 'bg-pink-100 text-pink-600' :
                      item.type === 'event' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.type === 'video' ? <Play className="h-3 w-3" /> :
                       item.type === 'match' ? <Heart className="h-3 w-3" /> :
                       item.type === 'event' ? <Users className="h-3 w-3" /> :
                       <MessageCircle className="h-3 w-3" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {item.creator}
                      </div>
                    </div>
                    {item.isNew && (
                      <Badge className="bg-green-100 text-green-700 text-xs">New</Badge>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-gray-600">{item.aiScore}%</span>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3 text-teal-600 border-teal-200 hover:bg-teal-50"
                  onClick={fetchPersonalizedContent}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Refresh Recommendations
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedHomeTab;