import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Users, Gamepad2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface GameSessionProps {
  gameType: 'UNO' | 'DOMINOES';
  gameId?: string | null;
  onBack: () => void;
}

interface GameState {
  id: string;
  type: string;
  mode: string;
  players: string[];
  currentTurn: string;
  status: string;
  moves: any[];
}

const GameSession: React.FC<GameSessionProps> = ({ gameType, gameId: initialGameId, onBack }) => {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameId, setGameId] = useState(initialGameId || '');
  const [moveText, setMoveText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialGameId) {
      fetchGameState(initialGameId);
    }
  }, [initialGameId]);

  const fetchGameState = async (id: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('game-manager', {
        body: { action: 'get', gameId: id }
      });
      if (error) throw error;
      setGameState(data.game);
    } catch (error) {
      console.error('Error fetching game:', error);
    }
  };

  const createGame = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('game-manager', {
        body: {
          action: 'create',
          gameType,
          players: ['current-user'],
          mode: 'singleplayer'
        }
      });
      
      if (error) throw error;
      setGameState(data.game);
      setGameId(data.game.id);
    } catch (error) {
      console.error('Error creating game:', error);
      const mockGame: GameState = {
        id: Math.random().toString(36).substr(2, 9),
        type: gameType,
        mode: 'singleplayer',
        players: ['current-user'],
        currentTurn: 'current-user',
        status: 'in-progress',
        moves: []
      };
      setGameState(mockGame);
      setGameId(mockGame.id);
    } finally {
      setLoading(false);
    }
  };

  const makeMove = async () => {
    if (!gameState || !moveText) return;
    setLoading(true);
    try {
      await supabase.functions.invoke('game-manager', {
        body: {
          action: 'move',
          gameId: gameState.id,
          userId: 'current-user',
          move: { description: moveText }
        }
      });
      
      const updatedGame = {
        ...gameState,
        moves: [...gameState.moves, { 
          player: 'current-user', 
          move: moveText, 
          timestamp: Date.now() 
        }],
        currentTurn: 'AI'
      };
      setGameState(updatedGame);
      setMoveText('');
      
      // AI response simulation
      setTimeout(() => {
        const aiMoves = gameType === 'UNO' ? ['Draw +2', 'Skip', 'Wild Card'] : ['Play 6-4', 'Draw tile', 'Pass'];
        const aiMove = aiMoves[Math.floor(Math.random() * aiMoves.length)];
        setGameState(prev => prev ? {
          ...prev,
          moves: [...prev.moves, { player: 'AI', move: aiMove, timestamp: Date.now() }],
          currentTurn: 'current-user'
        } : null);
      }, 2000);
    } catch (error) {
      console.error('Error making move:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="text-teal-700 hover:bg-teal-50 hover:text-teal-800">
          <ArrowLeft className="w-4 h-4 mr-2" />Back
        </Button>
        <h2 className="text-2xl font-bold text-teal-700 flex items-center">
          <Gamepad2 className="w-6 h-6 mr-2 text-teal-600" />{gameType}
        </h2>
      </div>

      {!gameState ? (
        <Card className="bg-teal-50 border border-teal-200">
          <CardHeader><CardTitle className="text-teal-800">Start {gameType}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={createGame} disabled={loading} className="w-full bg-teal-600 hover:bg-teal-700 text-white">
              {loading ? 'Creating...' : 'Play vs AI'}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="bg-teal-50 border border-teal-200">
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-teal-800">
              <div><p className="text-sm text-teal-600">Game ID</p><p className="font-mono text-sm text-teal-800">{gameState.id}</p></div>
              <div><p className="text-sm text-teal-600">Turn</p><p className="text-teal-800">{gameState.currentTurn}</p></div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border border-blue-200">
            <CardHeader><CardTitle className="text-blue-800">Your Move</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder={`Enter ${gameType} move...`}
                value={moveText}
                onChange={(e) => setMoveText(e.target.value)}
                className="bg-white border-blue-300 text-blue-800 placeholder:text-blue-500"
                disabled={gameState.currentTurn !== 'current-user'}
              />
              <Button
                onClick={makeMove}
                disabled={loading || !moveText || gameState.currentTurn !== 'current-user'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? 'Processing...' : 'Submit Move'}
              </Button>
            </CardContent>
          </Card>

          {gameState.moves.length > 0 && (
            <Card className="bg-purple-50 border border-purple-200">
              <CardHeader><CardTitle className="text-purple-800">Game History</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {gameState.moves.map((move, index) => (
                    <div key={index} className="text-purple-800 text-sm p-2 bg-white rounded border border-purple-100">
                      <span className="font-medium text-purple-600">{move.player}:</span> {move.move}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default GameSession;