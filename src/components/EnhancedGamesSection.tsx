import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Gamepad2, Users, Plus, Library, Trophy, Zap, Brain, Shield, MessageCircle } from 'lucide-react';
import EnhancedGameSession from './EnhancedGameSession';
import GameLobby from './GameLobby';
import GameLibrary from './GameLibrary';
import AIGameRecommendations from './AIGameRecommendations';
import { supabase } from '@/lib/supabase';

type ActiveView = 'lobby' | 'UNO' | 'DOMINOES' | 'chess' | 'checkers' | 'tic-tac-toe' | 'connect-four';

const EnhancedGamesSection: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('lobby');
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('ai-recommendations');
  const [aiMonitoring, setAiMonitoring] = useState(true);

  const quickPlayGames = [
    { 
      id: 'uno', 
      name: 'UNO', 
      icon: '🎴', 
      color: 'from-red-500 to-yellow-500', 
      players: '2-4',
      aiFeatures: ['Smart Matching', 'Strategy Tips', 'Cultural Icebreakers']
    },
    { 
      id: 'dominoes', 
      name: 'Caribbean Dominoes', 
      icon: '🀫', 
      color: 'from-purple-500 to-pink-500', 
      players: '2-4',
      aiFeatures: ['Cultural Context', 'Skill Matching', 'Regional Variations']
    },
    { 
      id: 'chess', 
      name: 'Chess', 
      icon: '♟️', 
      color: 'from-gray-700 to-gray-900', 
      players: '2',
      aiFeatures: ['Move Analysis', 'Skill Assessment', 'Learning Path']
    }
  ];

  const createNewGame = async (gameType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('game-manager', {
        body: {
          action: 'create',
          gameType: gameType.toUpperCase(),
          players: ['current-user'],
          mode: 'ai-enhanced',
          aiMonitoring: true
        }
      });
      
      if (error) throw error;
      setCurrentGameId(data?.game?.id || `${gameType}-${Date.now()}`);
      setActiveView(gameType as ActiveView);
    } catch (error) {
      console.error('Error creating game:', error);
      setCurrentGameId(`${gameType}-${Date.now()}`);
      setActiveView(gameType as ActiveView);
    }
  };

  const handlePlayGame = (gameId: string, gameName: string) => {
    createNewGame(gameId);
  };

  const handleJoinGame = (gameId: string, gameType: 'UNO' | 'DOMINOES') => {
    setCurrentGameId(gameId);
    setActiveView(gameType);
  };

  const handleBackToLobby = () => {
    setActiveView('lobby');
    setCurrentGameId(null);
  };

  if (activeView !== 'lobby') {
    return (
      <EnhancedGameSession
        gameType={activeView.toUpperCase()}
        gameId={currentGameId}
        onBack={handleBackToLobby}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-teal-600 flex items-center">
          <Gamepad2 className="w-8 h-8 mr-3 text-teal-600" />
          AI-Enhanced Game Center
        </h2>
        <div className="flex items-center space-x-2">
          <Badge className={`${aiMonitoring ? 'bg-teal-600 text-white' : 'bg-gray-600 text-white'}`}>
            <Brain className="w-3 h-3 mr-1" />
            Cubbleton AI {aiMonitoring ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gray-100">
          <TabsTrigger value="ai-recommendations" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-teal-700 font-medium">
            <Brain className="w-4 h-4 mr-2" />
            AI Picks
          </TabsTrigger>
          <TabsTrigger value="quick-play" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Quick Play
          </TabsTrigger>
          <TabsTrigger value="multiplayer" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-700 font-medium">
            <Users className="w-4 h-4 mr-2" />
            Multiplayer
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-teal-700 font-medium">
            <Library className="w-4 h-4 mr-2" />
            Library
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700 font-medium">
            <Trophy className="w-4 h-4 mr-2" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ai-recommendations" className="space-y-6">
          <AIGameRecommendations
            userId="current-user"
            onPlayGame={handlePlayGame}
          />
          
          <Card className="bg-white border-teal-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-teal-600" />
                AI Safety & Moderation
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                  <MessageCircle className="w-8 h-8 text-teal-600 mb-2" />
                  <h4 className="text-teal-800 font-medium mb-1">Chat Monitoring</h4>
                  <p className="text-teal-700 text-sm">AI filters inappropriate content in real-time</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <Users className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="text-blue-800 font-medium mb-1">Smart Matching</h4>
                  <p className="text-blue-700 text-sm">Paired with compatible players based on skill & culture</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                  <Brain className="w-8 h-8 text-purple-600 mb-2" />
                  <h4 className="text-purple-800 font-medium mb-1">Learning Insights</h4>
                  <p className="text-purple-700 text-sm">Get personalized tips to improve your gameplay</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-play" className="space-y-6">
          <Card className="bg-white border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                AI-Enhanced Quick Play
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {quickPlayGames.map((game) => (
                  <div key={game.id} className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl">{game.icon}</span>
                        <div>
                          <h4 className="text-teal-800 font-semibold">{game.name}</h4>
                          <p className="text-teal-700 text-sm">{game.players} players</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => createNewGame(game.id)}
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        Play Now
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-blue-800 text-sm font-medium">AI Features:</p>
                      {game.aiFeatures.map((feature, index) => (
                        <Badge key={index} className="text-xs bg-blue-100 text-blue-800 border-blue-300 mr-1">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multiplayer" className="space-y-6">
          <GameLobby onJoinGame={handleJoinGame} />
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <GameLibrary onPlayGame={handlePlayGame} />
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card className="bg-white border-purple-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-800 mb-2">AI-Powered Tournaments Coming Soon!</h3>
              <p className="text-purple-700 mb-4">Compete in skill-matched tournaments with AI-generated brackets.</p>
              <Button disabled className="bg-purple-400 text-white">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedGamesSection;