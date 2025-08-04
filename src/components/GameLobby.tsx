import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Gamepad2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GameLobbyProps {
  onJoinGame: (gameId: string, gameType: 'UNO' | 'DOMINOES') => void;
}

interface ActiveGame {
  id: string;
  game_type: 'UNO' | 'DOMINOES';
  mode: string;
  players: string[];
  status: string;
  created_at: string;
}

const GameLobby: React.FC<GameLobbyProps> = ({ onJoinGame }) => {
  const [activeGames, setActiveGames] = useState<ActiveGame[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchActiveGames = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .in('status', ['waiting', 'in-progress'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActiveGames(data || []);
    } catch (error) {
      console.error('Error fetching games:', error);
      // Mock data fallback
      setActiveGames([
        {
          id: '1',
          game_type: 'UNO',
          mode: 'multiplayer',
          players: ['player1'],
          status: 'waiting',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          game_type: 'DOMINOES',
          mode: 'multiplayer',
          players: ['player1', 'player2'],
          status: 'in-progress',
          created_at: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveGames();
    const interval = setInterval(fetchActiveGames, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const getGameIcon = (gameType: string) => {
    return gameType === 'UNO' ? '🎴' : '🀫';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-500';
      case 'in-progress': return 'bg-green-500';
      case 'finished': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center">
          <Gamepad2 className="w-5 h-5 mr-2" />
          Active Games
        </h3>
        <Button
          onClick={fetchActiveGames}
          disabled={loading}
          variant="outline"
          size="sm"
          className="bg-white/20 border-white/30 text-white hover:bg-white/30"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      <div className="space-y-3">
        {activeGames.length === 0 ? (
          <Card className="bg-white/10 backdrop-blur border-white/20">
            <CardContent className="p-6 text-center">
              <p className="text-white/70">No active games found</p>
              <p className="text-white/50 text-sm mt-1">Create a new game to get started!</p>
            </CardContent>
          </Card>
        ) : (
          activeGames.map((game) => (
            <Card key={game.id} className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getGameIcon(game.game_type)}</span>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-white">{game.game_type}</h4>
                        <Badge className={`${getStatusColor(game.status)} text-white text-xs`}>
                          {game.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/70 mt-1">
                        <div className="flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {game.players.length} players
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatTimeAgo(game.created_at)}
                        </div>
                        <span className="capitalize">{game.mode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      onClick={() => onJoinGame(game.id, game.game_type)}
                      className={`${
                        game.status === 'waiting'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      {game.status === 'waiting' ? 'Join' : 'Watch'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default GameLobby;