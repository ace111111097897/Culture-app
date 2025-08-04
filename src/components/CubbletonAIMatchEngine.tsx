import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Sparkles, Users, TrendingUp, Calendar, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface AIInsight {
  type: 'cultural_trend' | 'event_based' | 'compatibility' | 'discovery';
  title: string;
  description: string;
  action?: string;
  priority: 'high' | 'medium' | 'low';
}

const CubbletonAIMatchEngine: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIInsights = async () => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          message: 'Generate matching insights for cultural compatibility and discovery',
          context: 'matching_engine'
        }
      });

      if (data) {
        const mockInsights: AIInsight[] = [
          {
            type: 'cultural_trend',
            title: 'Trending Cultural Interest',
            description: 'Users interested in K-Pop culture are 40% more active this week. Perfect time to connect!',
            action: 'Explore K-Pop matches',
            priority: 'high'
          },
          {
            type: 'event_based',
            title: 'Upcoming Cultural Event',
            description: 'Diwali celebration next week - 12 potential matches are attending similar events.',
            action: 'View event matches',
            priority: 'high'
          },
          {
            type: 'compatibility',
            title: 'Enhanced Compatibility',
            description: 'Your cultural preferences show 85% compatibility with Mediterranean cultures.',
            action: 'Discover Mediterranean matches',
            priority: 'medium'
          },
          {
            type: 'discovery',
            title: 'Cultural Discovery',
            description: 'Explore African art and music - 3 highly compatible users share this interest.',
            action: 'Expand cultural horizons',
            priority: 'medium'
          }
        ];
        
        setInsights(mockInsights);
      }
    } catch (error) {
      console.error('Error generating AI insights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateAIInsights();
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'cultural_trend': return <TrendingUp className="h-4 w-4" />;
      case 'event_based': return <Calendar className="h-4 w-4" />;
      case 'compatibility': return <Users className="h-4 w-4" />;
      case 'discovery': return <Globe className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <span className="text-purple-800">Cubbleton AI Match Engine</span>
          <Badge className="bg-purple-500">
            <Sparkles className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-purple-600 mb-4">
          AI-powered insights to enhance your cultural connections
        </div>
        
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-purple-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${getPriorityColor(insight.priority)}`}>
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{insight.title}</h4>
                    <p className="text-xs opacity-80 mb-2">{insight.description}</p>
                    {insight.action && (
                      <Button size="sm" variant="outline" className="text-xs h-6">
                        {insight.action}
                      </Button>
                    )}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {insight.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="pt-3 border-t border-purple-200">
          <Button 
            onClick={generateAIInsights}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <Brain className="h-4 w-4 mr-2" />
            {isLoading ? 'Analyzing...' : 'Refresh AI Insights'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CubbletonAIMatchEngine;