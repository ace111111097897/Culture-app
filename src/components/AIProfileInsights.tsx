import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Heart, 
  Share2,
  MessageCircle,
  Calendar,
  Clock,
  Target,
  Sparkles,
  Map,
  Trophy
} from 'lucide-react';

export const AIProfileInsights: React.FC = () => {
  const [timeframe, setTimeframe] = useState('week');

  const engagementData = {
    profileViews: { current: 1234, change: 15, trend: 'up' },
    contentLikes: { current: 2456, change: 23, trend: 'up' },
    contentShares: { current: 789, change: -5, trend: 'down' },
    messages: { current: 156, change: 8, trend: 'up' }
  };

  const culturalJourney = [
    {
      date: '2024-01-01',
      milestone: 'Joined Cubble Community',
      type: 'registration',
      impact: 'Started cultural exploration journey'
    },
    {
      date: '2024-01-15',
      milestone: 'First Cultural Event Participation',
      type: 'event',
      impact: 'Increased engagement by 45%'
    },
    {
      date: '2024-02-01',
      milestone: 'Cultural Ambassador Badge',
      type: 'achievement',
      impact: 'Profile visibility increased 3x'
    },
    {
      date: '2024-02-15',
      milestone: 'Top Cultural Contributor',
      type: 'recognition',
      impact: 'Community impact score: 92%'
    }
  ];

  const contentInsights = [
    {
      category: 'Cultural Dance Videos',
      performance: 'Excellent',
      avgLikes: 145,
      avgShares: 23,
      bestTime: 'Weekends 7-9 PM',
      recommendation: 'Post more dance content during peak hours'
    },
    {
      category: 'Festival Photos',
      performance: 'Good',
      avgLikes: 89,
      avgShares: 12,
      bestTime: 'Weekdays 6-8 PM',
      recommendation: 'Add more context and cultural background'
    },
    {
      category: 'Cultural Stories',
      performance: 'Moderate',
      avgLikes: 67,
      avgShares: 8,
      bestTime: 'Sunday mornings',
      recommendation: 'Use more engaging storytelling techniques'
    }
  ];

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Moderate': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Engagement Dashboard */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Dynamic Engagement Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Eye className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{engagementData.profileViews.current}</div>
              <div className="text-sm text-gray-600">Profile Views</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{engagementData.profileViews.change}%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Heart className="w-6 h-6 text-pink-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-600">{engagementData.contentLikes.current}</div>
              <div className="text-sm text-gray-600">Content Likes</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{engagementData.contentLikes.change}%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Share2 className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{engagementData.contentShares.current}</div>
              <div className="text-sm text-gray-600">Content Shares</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-red-500 rotate-180" />
                <span className="text-xs text-red-600">{engagementData.contentShares.change}%</span>
              </div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <MessageCircle className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{engagementData.messages.current}</div>
              <div className="text-sm text-gray-600">Messages</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-600">+{engagementData.messages.change}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cultural Journey Mapping */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-700 flex items-center gap-2">
            <Map className="w-5 h-5" />
            Personalized Cultural Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {culturalJourney.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  {milestone.type === 'achievement' ? (
                    <Trophy className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Calendar className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-purple-800">{milestone.milestone}</h4>
                    <Badge variant="outline" className="text-xs text-purple-600">
                      {milestone.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-purple-600 mb-1">{milestone.impact}</p>
                  <p className="text-xs text-gray-500">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-teal-700 flex items-center gap-2">
            <Target className="w-5 h-5" />
            Content Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contentInsights.map((insight, index) => (
              <div key={index} className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-teal-800">{insight.category}</h4>
                  <Badge className={getPerformanceColor(insight.performance)}>
                    {insight.performance}
                  </Badge>
                </div>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Avg Likes:</span>
                    <span className="font-medium text-teal-700 ml-2">{insight.avgLikes}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Avg Shares:</span>
                    <span className="font-medium text-teal-700 ml-2">{insight.avgShares}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Best Time:</span>
                    <span className="font-medium text-teal-700 ml-2">{insight.bestTime}</span>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-teal-100 rounded text-sm">
                  <Sparkles className="w-4 h-4 text-teal-600 inline mr-1" />
                  <span className="text-teal-700">{insight.recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-700 mb-1">Optimal Posting Schedule</h4>
              <p className="text-sm text-orange-600">
                Based on your audience, post cultural content on weekends between 7-9 PM for maximum engagement.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-1">Content Strategy</h4>
              <p className="text-sm text-green-600">
                Your dance videos perform 3x better than other content. Consider creating a weekly dance series.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-700 mb-1">Community Engagement</h4>
              <p className="text-sm text-blue-600">
                Engage with 5-7 similar profiles daily to increase your visibility by up to 40%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};