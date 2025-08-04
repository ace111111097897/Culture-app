import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Brain, MessageCircle, Users, Trophy, AlertTriangle } from 'lucide-react';
import GameChatInterface from './GameChatInterface';
import { supabase } from '@/lib/supabase';

interface Player {
  id: string;
  name: string;
  skillLevel: string;
  culturalBackground?: string;
}

interface AIInsight {
  type: 'strategy' | 'cultural' | 'social';
  message: string;
  confidence: number;
}

interface EnhancedGameSessionProps {
  gameType: string;
  gameId: string | null;
  onBack: () => void;
}

const EnhancedGameSession: React.FC<EnhancedGameSessionProps> = ({
  gameType,
  gameId,
  onBack
}) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [gameState, setGameState] = useState('waiting');
  const [showChat, setShowChat] = useState(true);
  const [performanceData, setPerformanceData] = useState({
    movesPlayed: 0,
    accuracy: 0,
    timePerMove: 0
  });

  useEffect(() => {
    initializeGame();
    generateAIInsights();
  }, [gameId, gameType]);

  const initializeGame = () => {
    // Simulate matched players with cultural backgrounds
    const mockPlayers: Player[] = [
      {
        id: 'player1',
        name: 'You',
        skillLevel: 'Intermediate',
        culturalBackground: 'Caribbean'
      },
      {
        id: 'player2',
        name: 'Maria',
        skillLevel: 'Intermediate',
        culturalBackground: 'Latin American'
      }
    ];
    setPlayers(mockPlayers);
  };

  const generateAIInsights = async () => {
    try {
      // Simulate AI analysis
      const insights: AIInsight[] = [
        {
          type: 'social',
          message: 'Maria also enjoys Caribbean culture - great conversation starter!',
          confidence: 92
        },
        {
          type: 'strategy',
          message: 'Based on your play history, consider a defensive strategy early on.',
          confidence: 85
        },
        {
          type: 'cultural',
          message: 'This game has roots in Latin culture - ask Maria about regional variations!',
          confidence: 78
        }
      ];
      setAiInsights(insights);
    } catch (error) {
      console.error('Error generating AI insights:', error);
    }
  };

  const handleGameMove = (move: any) => {
    setPerformanceData(prev => ({
      ...prev,
      movesPlayed: prev.movesPlayed + 1,
      accuracy: Math.random() * 100, // Simulate accuracy calculation
      timePerMove: Math.random() * 30 + 5 // Simulate time tracking
    }));
  };

  const handleSendFeedback = async (rating: number, feedback: string) => {
    try {
      await supabase.functions.invoke('game-manager', {
        body: {
          action: 'feedback',
          gameId,
          rating,
          feedback,
          performanceData
        }
      });
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strategy': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'cultural': return <Users className="w-4 h-4 text-green-400" />;
      case 'social': return <MessageCircle className="w-4 h-4 text-purple-400" />;
      default: return <Brain className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
        <Badge className="bg-green-600 text-white">
          {gameState === 'waiting' ? 'Waiting for Players' : 'Game Active'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Board Area */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">{gameType}</h2>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Score: 0</span>
                </div>
              </div>

              {/* Game Board Placeholder */}
              <div className="bg-white/5 rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
                <div className="text-white/70">
                  <div className="text-6xl mb-4">🎮</div>
                  <p className="text-lg">Game board for {gameType} will appear here</p>
                  <p className="text-sm mt-2">AI is monitoring your gameplay for insights</p>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{performanceData.movesPlayed}</div>
                  <div className="text-sm text-white/60">Moves</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{performanceData.accuracy.toFixed(0)}%</div>
                  <div className="text-sm text-white/60">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{performanceData.timePerMove.toFixed(1)}s</div>
                  <div className="text-sm text-white/60">Avg Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Players */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Players
              </h3>
              <div className="space-y-2">
                {players.map((player) => (
                  <div key={player.id} className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{player.name}</div>
                      <div className="text-xs text-white/60">{player.skillLevel}</div>
                      {player.culturalBackground && (
                        <Badge variant="outline" className="text-xs border-blue-400 text-blue-400">
                          {player.culturalBackground}
                        </Badge>
                      )}
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Cubbleton AI Insights
              </h3>
              <div className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      {getInsightIcon(insight.type)}
                      <span className="text-xs text-white/60 capitalize">{insight.type}</span>
                      <Badge variant="outline" className="text-xs border-green-400 text-green-400">
                        {insight.confidence}% confident
                      </Badge>
                    </div>
                    <p className="text-sm text-white">{insight.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          {showChat && (
            <GameChatInterface
              gameId={gameId || 'default'}
              currentUserId="player1"
              onSendMessage={(message) => console.log('Message sent:', message)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedGameSession;