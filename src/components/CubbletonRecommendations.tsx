import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Calendar, User, MessageCircle, TrendingUp } from 'lucide-react';

interface Recommendation {
  type: string;
  title: string;
  match: string;
  reason: string;
}

interface CubbletonRecommendationsProps {
  recommendations: Recommendation[];
}

export const CubbletonRecommendations: React.FC<CubbletonRecommendationsProps> = ({ recommendations }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-200">
        <h3 className="text-xl font-bold text-teal-800 mb-2 flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Personalized Content Recommendations
        </h3>
        <p className="text-teal-700 mb-4">Tailored feed based on your cultural interests and past interactions</p>
        
        <div className="grid gap-4">
          {recommendations.map((rec, idx) => (
            <Card key={idx} className="p-4 bg-white border-teal-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {rec.type === 'Event' && <Calendar className="w-4 h-4 text-teal-600" />}
                  {rec.type === 'Profile' && <User className="w-4 h-4 text-blue-600" />}
                  {rec.type === 'Bubble' && <MessageCircle className="w-4 h-4 text-purple-600" />}
                  <Badge variant="outline" className="text-xs border-teal-300 text-teal-700">
                    {rec.type}
                  </Badge>
                </div>
                <Badge className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  {rec.match} Match
                </Badge>
              </div>
              
              <h4 className="font-semibold text-teal-800 mb-2">{rec.title}</h4>
              <p className="text-sm text-teal-600 mb-3">{rec.reason}</p>
              
              <div className="flex gap-2">
                <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                  Connect
                </Button>
                <Button size="sm" variant="outline" className="border-teal-300 text-teal-700 hover:bg-teal-50">
                  Learn More
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
        <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Dynamic Suggestions
        </h3>
        <p className="text-purple-700 mb-4">Real-time suggestions based on current trends and your activity</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">Trending Now</h4>
            <p className="text-sm text-purple-600 mb-3">Korean Beauty Rituals workshop starting in 2 hours</p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Join Now</Button>
          </Card>
          
          <Card className="p-4 bg-white border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-2">Perfect Match</h4>
            <p className="text-sm text-purple-600 mb-3">3 users with similar cultural trivia interests online</p>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Connect</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};