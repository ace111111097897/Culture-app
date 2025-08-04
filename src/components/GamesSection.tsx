import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Users, Plus, Library, Trophy, Zap } from 'lucide-react';
import GameSession from './GameSession';
import GameLobby from './GameLobby';
import GameLibrary from './GameLibrary';
import { supabase } from '@/lib/supabase';

interface Game {
  id: number;
  name: string;
  players: number;
  status: 'waiting' | 'playing' | 'finished';
  icon: string;
}

type ActiveView = 'lobby' | 'UNO' | 'DOMINOES' | 'chess' | 'checkers' | 'tic-tac-toe' | 'connect-four';

const GamesSection: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('lobby');
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('quick-play');

  const quickPlayGames = [
    { id: 'uno', name: 'UNO', icon: '🎴', color: 'from-teal-500 to-blue-500', players: '2-4' },
    { id: 'dominoes', name: 'Dominoes', icon: '🀫', color: 'from-purple-500 to-teal-500', players: '2-4' },
    { id: 'chess', name: 'Chess', icon: '♟️', color: 'from-blue-600 to-purple-600', players: '2' },
    { id: 'checkers', name: 'Checkers', icon: '🔴', color: 'from-teal-600 to-blue-600', players: '2' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '❌', color: 'from-blue-500 to-purple-500', players: '2' },
    { id: 'connect-four', name: 'Connect Four', icon: '🔵', color: 'from-purple-600 to-teal-600', players: '2' }
  ];

  const createNewGame = async (gameType: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('game-manager', {
        body: {
          action: 'create',
          gameType: gameType.toUpperCase(),
          players: ['current-user'],
          mode: 'singleplayer'
        }
      });
      
      if (error) throw error;
      setCurrentGameId(data.game.id);
      setActiveView(gameType as ActiveView);
    } catch (error) {
      console.error('Error creating game:', error);
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
      <GameSession
        gameType={activeView.toUpperCase() as any}
        gameId={currentGameId}
        onBack={handleBackToLobby}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-teal-700 flex items-center">
          <Gamepad2 className="w-8 h-8 mr-3 text-teal-600" />
          Game Center
        </h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white border border-teal-200">
          <TabsTrigger value="quick-play" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-teal-700">
            <Zap className="w-4 h-4 mr-2" />
            Quick Play
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-blue-700">
            <Library className="w-4 h-4 mr-2" />
            Library
          </TabsTrigger>
          <TabsTrigger value="multiplayer" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-purple-700">
            <Users className="w-4 h-4 mr-2" />
            Multiplayer
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-teal-700">
            <Trophy className="w-4 h-4 mr-2" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-play" className="space-y-6">
          <Card className="bg-teal-50 border border-teal-200">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-teal-800 mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-teal-600" />
                Quick Play - Jump Right In!
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {quickPlayGames.map((game) => (
                  <Button
                    key={game.id}
                    onClick={() => createNewGame(game.id)}
                    className={`bg-gradient-to-r ${game.color} hover:scale-105 transform transition-all duration-200 text-white h-20 flex flex-col items-center justify-center space-y-1 shadow-lg`}
                  >
                    <span className="text-2xl">{game.icon}</span>
                    <span className="font-semibold text-white">{game.name}</span>
                    <span className="text-xs text-white/90">{game.players} players</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <GameLibrary onPlayGame={handlePlayGame} />
        </TabsContent>

        <TabsContent value="multiplayer" className="space-y-6">
          <GameLobby onJoinGame={handleJoinGame} />
          
          <Card className="bg-purple-50 border border-purple-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-purple-600" />
                Create Multiplayer Game
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => createNewGame('uno')}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white h-16 flex flex-col items-center justify-center space-y-1"
                >
                  <span className="text-2xl">🎴</span>
                  <span className="text-white font-semibold">Host UNO Game</span>
                </Button>
                <Button 
                  onClick={() => createNewGame('dominoes')}
                  className="bg-gradient-to-r from-purple-500 to-teal-500 hover:from-purple-600 hover:to-teal-600 text-white h-16 flex flex-col items-center justify-center space-y-1"
                >
                  <span className="text-2xl">🀫</span>
                  <span className="text-white font-semibold">Host Dominoes Game</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card className="bg-blue-50 border border-blue-200">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-teal-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-800 mb-2">Tournaments Coming Soon!</h3>
              <p className="text-blue-700 mb-4">Compete against players worldwide in exciting tournaments.</p>
              <Button disabled className="bg-gray-400 text-gray-700">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GamesSection;