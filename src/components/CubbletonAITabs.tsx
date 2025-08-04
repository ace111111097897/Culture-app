import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TabsContent } from './ui/tabs';
import { Users, Star, MessageCircle, BookOpen, TrendingUp, Shield } from 'lucide-react';

interface CubbletonAITabsProps {
  zodiacSign: string;
  culturalScore: number;
  zodiacInsights: any;
}

export const CubbletonAITabs: React.FC<CubbletonAITabsProps> = ({ zodiacSign, culturalScore, zodiacInsights }) => {
  return (
    <>
      <TabsContent value="matchmaking" className="mt-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Intelligent Matchmaking
            </h3>
            <p className="text-blue-700 mb-4">AI-powered matching based on cultural backgrounds and interests</p>
            
            <div className="grid gap-4">
              <Card className="p-4 bg-white border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Friend Recommendations</h4>
                <p className="text-sm text-blue-600 mb-3">5 like-minded users found based on your cultural profile</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">View Matches</Button>
              </Card>
              
              <Card className="p-4 bg-white border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Event-Based Matching</h4>
                <p className="text-sm text-blue-600 mb-3">Perfect partners for tonight's cultural trivia game</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Find Partners</Button>
              </Card>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="insights" className="mt-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
            <h3 className="text-xl font-bold text-purple-800 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Enhanced Profile Insights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4 bg-white border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-3">Zodiac Insights - {zodiacSign}</h4>
                <div className="space-y-2 text-sm">
                  <p className="text-purple-700"><strong>Personality:</strong> {zodiacInsights[zodiacSign]?.personality}</p>
                  <p className="text-purple-700"><strong>Cultural Style:</strong> {zodiacInsights[zodiacSign]?.cultural}</p>
                  <p className="text-purple-700"><strong>Best Matches:</strong> {zodiacInsights[zodiacSign]?.compatibility}</p>
                </div>
              </Card>
              
              <Card className="p-4 bg-white border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-3">Activity Analytics</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Cultural Impact Score</span>
                    <Badge className="bg-purple-600 text-white">{culturalScore}/100</Badge>
                  </div>
                  <div className="text-sm text-purple-600">
                    <p>• 15 cultural discussions started</p>
                    <p>• 8 successful cultural matches</p>
                    <p>• 23 community interactions</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="chat" className="mt-6">
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-50 to-green-50 p-6 rounded-lg border border-teal-200">
            <h3 className="text-xl font-bold text-teal-800 mb-2 flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Interactive Chat & Communication
            </h3>
            <p className="text-teal-700 mb-4">Enhanced messaging with AI-powered suggestions and safety</p>
            
            <div className="grid gap-4">
              <Card className="p-4 bg-white border-teal-100">
                <h4 className="font-semibold text-teal-800 mb-2">AI Chat Assistant</h4>
                <p className="text-sm text-teal-600 mb-3">Get conversation starters and cultural icebreakers</p>
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">Start Chat</Button>
              </Card>
              
              <Card className="p-4 bg-white border-teal-100">
                <h4 className="font-semibold text-teal-800 mb-2">Safety Monitoring</h4>
                <p className="text-sm text-teal-600 mb-3">AI-powered moderation for respectful conversations</p>
                <Badge className="bg-green-500 text-white">All Clear</Badge>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Cultural Discovery & Learning
            </h3>
            <p className="text-blue-700 mb-4">Interactive cultural courses and personalized learning modules</p>
            
            <div className="grid gap-4">
              <Card className="p-4 bg-white border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Daily Cultural Facts</h4>
                <p className="text-sm text-blue-600 mb-3">Learn something new about cultures worldwide every day</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Today's Fact</Button>
              </Card>
              
              <Card className="p-4 bg-white border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-2">Personalized Learning</h4>
                <p className="text-sm text-blue-600 mb-3">Interactive courses tailored to your cultural interests</p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Learning</Button>
              </Card>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trend Analysis & Support
            </h3>
            <p className="text-green-700 mb-4">Real-time trend monitoring and AI assistance</p>
            
            <div className="grid gap-4">
              <Card className="p-4 bg-white border-green-100">
                <h4 className="font-semibold text-green-800 mb-2">Cultural Trends</h4>
                <p className="text-sm text-green-600 mb-3">Stay updated with emerging cultural movements</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">View Trends</Button>
              </Card>
              
              <Card className="p-4 bg-white border-green-100">
                <h4 className="font-semibold text-green-800 mb-2">AI Support</h4>
                <p className="text-sm text-green-600 mb-3">Get help navigating the platform and maximizing your experience</p>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Get Help</Button>
              </Card>
            </div>
          </div>
        </div>
      </TabsContent>
    </>
  );
};