import React, { useState, useEffect } from 'react';
import { Search, Filter, Brain, Sparkles, Video, TrendingUp, Activity, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CubbletonVideoRecommendations from '../CubbletonVideoRecommendations';
import { BackendMonitorDashboard } from '../BackendMonitorDashboard';
import { supabase } from '@/lib/supabase';

const DiscoverPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState('videos');
  const [backendHealth, setBackendHealth] = useState<any>(null);

  const viewOptions = [
    { id: 'videos', label: 'Video Content', icon: Video },
    { id: 'trending', label: 'Trending Now', icon: TrendingUp },
    { id: 'ai-picks', label: 'AI Picks', icon: Brain },
    { id: 'backend', label: 'Backend Status', icon: Activity }
  ];

  useEffect(() => {
    checkBackendHealth();
  }, []);

  const checkBackendHealth = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('backend-monitor', {
        body: { action: 'healthCheck' }
      });
      if (!error) setBackendHealth(data);
    } catch (error) {
      console.error('Backend health check failed:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Discover
        </h1>
        <p className="text-gray-600">Explore personalized video content powered by Cubbleton AI</p>
        {backendHealth && (
          <Badge variant={backendHealth.overallHealth === 'healthy' ? 'default' : 'destructive'} className="mt-2">
            Backend: {backendHealth.overallHealth}
          </Badge>
        )}
      </div>

      <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          {viewOptions.map((option) => {
            const Icon = option.icon;
            return (
              <TabsTrigger key={option.id} value={option.id} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for cultural videos, tutorials, stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <Card className="bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 rounded-full">
                  <Sparkles className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-teal-800">Enhanced by Cubbleton AI</h3>
                  <p className="text-sm text-teal-700">
                    Discover culturally relevant videos with robust backend architecture
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <CubbletonVideoRecommendations />
        </TabsContent>

        <TabsContent value="trending">
          <CubbletonVideoRecommendations />
        </TabsContent>

        <TabsContent value="ai-picks">
          <CubbletonVideoRecommendations />
        </TabsContent>

        <TabsContent value="backend">
          <BackendMonitorDashboard />
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-purple-50 to-teal-50 border-purple-200 mt-8">
        <CardHeader>
          <CardTitle className="text-center text-purple-700 flex items-center justify-center gap-2">
            <Database className="h-5 w-5" />
            Robust Backend Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold mb-1">Microservices Architecture</h4>
              <p className="text-sm text-gray-600">Scalable services for video processing, AI recommendations, and user management</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="font-semibold mb-1">Real-time Monitoring</h4>
              <p className="text-sm text-gray-600">Comprehensive health checks and performance metrics tracking</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">🛡️</div>
              <h4 className="font-semibold mb-1">Enhanced Security</h4>
              <p className="text-sm text-gray-600">Row-level security, data encryption, and compliance monitoring</p>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold mb-1">Analytics & Insights</h4>
              <p className="text-sm text-gray-600">Advanced analytics for content optimization and user engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiscoverPage;