import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gamepad2, Users, Library, Trophy, Zap, Globe } from 'lucide-react';
import EnhancedGameSession from './EnhancedGameSession';
import GameLobby from './GameLobby';
import GameLibrary from './GameLibrary';
import CulturalGamesQuizzes from './CulturalGamesQuizzes';
import { Leaderboard } from './Leaderboard';

type ActiveView = 'lobby' | 'game' | 'leaderboard';

const UpdatedGamesSection: React.FC = () => {
  const [activeView, setActiveView] = useState<ActiveView>('lobby');
  const [currentGame, setCurrentGame] = useState<{ type: string; id?: string } | null>(null);
  const [activeTab, setActiveTab] = useState('quick-play');

  const quickPlayGames = [
    { id: 'uno', name: 'UNO', icon: '🎴', color: 'from-red-500 to-yellow-500', players: '2-4' },
    { id: 'dominoes', name: 'Dominoes', icon: '🀫', color: 'from-purple-500 to-pink-500', players: '2-4' },
    { id: 'chess', name: 'Chess', icon: '♟️', color: 'from-gray-700 to-gray-900', players: '2' },
    { id: 'checkers', name: 'Checkers', icon: '🔴', color: 'from-red-600 to-red-800', players: '2' },
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '❌', color: 'from-blue-500 to-cyan-500', players: '2' },
    { id: 'connect-four', name: 'Connect Four', icon: '🔵', color: 'from-blue-600 to-indigo-600', players: '2' }
  ];

  const handlePlayGame = (gameId: string, gameName: string) => {
    setCurrentGame({ type: gameId });
    setActiveView('game');
  };

  const handleJoinGame = (gameId: string, gameType: string) => {
    setCurrentGame({ type: gameType.toLowerCase(), id: gameId });
    setActiveView('game');
  };

  const handleBackToLobby = () => {
    setActiveView('lobby');
    setCurrentGame(null);
  };

  const showLeaderboard = () => {
    setActiveView('leaderboard');
  };

  if (activeView === 'game' && currentGame) {
    return (
      <EnhancedGameSession
        gameType={currentGame.type}
        gameId={currentGame.id}
        onBack={handleBackToLobby}
      />
    );
  }

  if (activeView === 'leaderboard') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleBackToLobby} className="text-white hover:bg-white/20">
            <Gamepad2 className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
        <Leaderboard />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white flex items-center">
          <Gamepad2 className="w-8 h-8 mr-3 text-purple-400" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Game Center
          </span>
        </h2>
        <Button 
          onClick={showLeaderboard}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Leaderboards
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur border-white/20 rounded-xl">
          <TabsTrigger value="quick-play" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white rounded-lg">
            <Zap className="w-4 h-4 mr-1" />
            Quick Play
          </TabsTrigger>
          <TabsTrigger value="cultural" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white rounded-lg">
            <Globe className="w-4 h-4 mr-1" />
            Cultural
          </TabsTrigger>
          <TabsTrigger value="library" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white rounded-lg">
            <Library className="w-4 h-4 mr-1" />
            Library
          </TabsTrigger>
          <TabsTrigger value="multiplayer" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white rounded-lg">
            <Users className="w-4 h-4 mr-1" />
            Multiplayer
          </TabsTrigger>
          <TabsTrigger value="tournaments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 text-white rounded-lg">
            <Trophy className="w-4 h-4 mr-1" />
            Tournaments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quick-play" className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border-white/20 shadow-xl">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Quick Play - Jump Right In!
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {quickPlayGames.map((game) => (
                  <Button
                    key={game.id}
                    onClick={() => handlePlayGame(game.id, game.name)}
                    className={`bg-gradient-to-r ${game.color} hover:scale-105 transform transition-all duration-200 text-white h-24 flex flex-col items-center justify-center space-y-1 shadow-lg rounded-xl border border-white/20`}
                  >
                    <span className="text-3xl">{game.icon}</span>
                    <span className="font-semibold text-sm">{game.name}</span>
                    <span className="text-xs opacity-80">{game.players} players</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cultural" className="space-y-6">
          <CulturalGamesQuizzes />
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <GameLibrary onPlayGame={handlePlayGame} />
        </TabsContent>

        <TabsContent value="multiplayer" className="space-y-6">
          <GameLobby onJoinGame={handleJoinGame} />
        </TabsContent>

        <TabsContent value="tournaments" className="space-y-6">
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border-white/20 shadow-xl">
            <CardContent className="p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Tournaments Coming Soon!</h3>
              <p className="text-white/70 mb-4">Compete against players worldwide in exciting tournaments.</p>
              <Button disabled className="bg-gray-600 text-white shadow-lg">
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdatedGamesSection;