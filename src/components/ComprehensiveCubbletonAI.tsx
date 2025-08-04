import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Brain, Heart, MessageCircle, Star, Users } from 'lucide-react';
import { CubbletonRecommendations } from './CubbletonRecommendations';
import { CubbletonAITabs } from './CubbletonAITabs';

export const ComprehensiveCubbletonAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommendations');
  const [zodiacSign] = useState('Leo');
  const [culturalScore] = useState(85);

  const recommendations = [
    { type: 'Event', title: 'Japanese Tea Ceremony Workshop', match: '95%', reason: 'Based on your interest in mindfulness and cultural traditions' },
    { type: 'Profile', title: 'Maria from Mexico', match: '88%', reason: 'Shares your love for traditional cooking and art' },
    { type: 'Bubble', title: 'Ancient Wisdom Circle', match: '92%', reason: 'Perfect for your philosophical discussions' }
  ];

  const zodiacInsights = {
    Leo: {
      personality: 'Natural leader with creative flair and warm heart',
      cultural: 'Drawn to vibrant festivals and expressive arts',
      compatibility: 'Best matches with Aries, Sagittarius, and Gemini'
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
            Cubbleton AI Hub
          </h1>
        </div>
        <p className="text-teal-700 text-lg">Your Versatile Hub of Personalized Cultural Features</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-teal-50">
          <TabsTrigger value="recommendations" className="text-teal-700 data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <Heart className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="matchmaking" className="text-blue-700 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
            <Users className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Matchmaking</span>
          </TabsTrigger>
          <TabsTrigger value="insights" className="text-purple-700 data-[state=active]:bg-purple-500 data-[state=active]:text-white">
            <Star className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Insights</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-teal-700 data-[state=active]:bg-teal-500 data-[state=active]:text-white">
            <MessageCircle className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Chat</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="mt-6">
          <CubbletonRecommendations recommendations={recommendations} />
        </TabsContent>

        <CubbletonAITabs 
          zodiacSign={zodiacSign} 
          culturalScore={culturalScore} 
          zodiacInsights={zodiacInsights} 
        />
      </Tabs>
    </div>
  );
};