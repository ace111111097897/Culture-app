import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Star, Users, Heart, Shield, MessageSquare } from 'lucide-react';

const TipsSection: React.FC = () => {
  const tips = [
    {
      id: 1,
      category: 'Cultural Etiquette',
      title: 'Respectful Cultural Exchange',
      content: 'Always approach cultural differences with curiosity and respect. Ask questions politely and be open to learning.',
      icon: Users,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      category: 'Profile Optimization',
      title: 'Create an Engaging Profile',
      content: 'Share your cultural interests, add a meaningful quote, and showcase your authentic self to attract like-minded connections.',
      icon: Star,
      difficulty: 'Beginner'
    },
    {
      id: 3,
      category: 'Communication',
      title: 'Breaking the Ice',
      content: 'Start conversations by asking about cultural traditions, favorite foods, or interesting customs from their background.',
      icon: MessageSquare,
      difficulty: 'Intermediate'
    },
    {
      id: 4,
      category: 'Safety',
      title: 'Meeting Safely',
      content: 'When meeting someone new, choose public places and let friends know your plans. Trust your instincts.',
      icon: Shield,
      difficulty: 'Essential'
    },
    {
      id: 5,
      category: 'Relationships',
      title: 'Building Meaningful Connections',
      content: 'Focus on shared values and interests rather than just cultural differences. Genuine connections transcend backgrounds.',
      icon: Heart,
      difficulty: 'Advanced'
    },
    {
      id: 6,
      category: 'Events',
      title: 'Cultural Event Participation',
      content: 'Attend cultural events with an open mind. Participate respectfully and don\'t be afraid to ask about traditions.',
      icon: Users,
      difficulty: 'Intermediate'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Essential': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="h-8 w-8 text-yellow-600" />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tips & Advice</h1>
          <p className="text-gray-600">Expert guidance for cultural connections</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {tips.map((tip) => {
          const IconComponent = tip.icon;
          return (
            <Card key={tip.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tip.title}</CardTitle>
                      <p className="text-sm text-gray-600">{tip.category}</p>
                    </div>
                  </div>
                  <Badge className={getDifficultyColor(tip.difficulty)}>
                    {tip.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{tip.content}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-600" />
            Quick Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">💡 Be Patient</p>
              <p className="text-xs text-blue-700">Cultural understanding takes time</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">🌟 Stay Curious</p>
              <p className="text-xs text-green-700">Ask questions and learn actively</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-sm font-medium text-purple-900">🤝 Be Respectful</p>
              <p className="text-xs text-purple-700">Honor different perspectives</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <p className="text-sm font-medium text-orange-900">✨ Be Authentic</p>
              <p className="text-xs text-orange-700">Share your true self</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipsSection;