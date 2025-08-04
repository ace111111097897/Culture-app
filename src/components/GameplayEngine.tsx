import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface GameplayEngineProps {
  gameType: string;
  onMove: (move: any) => void;
  gameState: any;
  isPlayerTurn: boolean;
}

export const GameplayEngine: React.FC<GameplayEngineProps> = ({ 
  gameType, 
  onMove, 
  gameState, 
  isPlayerTurn 
}) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    initializeGame();
  }, [gameType]);

  const initializeGame = () => {
    switch (gameType) {
      case 'tic-tac-toe':
        setBoard(Array(9).fill(null));
        break;
      case 'connect-four':
        setBoard(Array(42).fill(null));
        break;
      case 'chess':
        setBoard(initializeChessBoard());
        break;
      case 'checkers':
        setBoard(initializeCheckersBoard());
        break;
      default:
        setBoard([]);
    }
  };

  const initializeChessBoard = () => {
    const board = Array(64).fill(null);
    const pieces = ['♜','♞','♝','♛','♚','♝','♞','♜'];
    pieces.forEach((piece, i) => {
      board[i] = { piece, color: 'black' };
      board[i + 8] = { piece: '♟', color: 'black' };
      board[48 + i] = { piece: '♙', color: 'white' };
      board[56 + i] = { piece: pieces[i].replace(/♜|♞|♝|♛|♚/g, 
        m => ({'♜':'♖','♞':'♘','♝':'♗','♛':'♕','♚':'♔'}[m] || m)), color: 'white' };
    });
    return board;
  };

  const initializeCheckersBoard = () => {
    const board = Array(64).fill(null);
    for (let i = 0; i < 64; i++) {
      const row = Math.floor(i / 8);
      const col = i % 8;
      if ((row + col) % 2 === 1) {
        if (row < 3) board[i] = { piece: '●', color: 'black' };
        if (row > 4) board[i] = { piece: '●', color: 'red' };
      }
    }
    return board;
  };

  const handleTicTacToeMove = (index: number) => {
    if (board[index] || !isPlayerTurn) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    onMove({ type: 'tic-tac-toe', position: index, player: 'X' });
  };

  const handleConnectFourMove = (col: number) => {
    if (!isPlayerTurn) return;
    for (let row = 5; row >= 0; row--) {
      const index = row * 7 + col;
      if (!board[index]) {
        const newBoard = [...board];
        newBoard[index] = 'red';
        setBoard(newBoard);
        onMove({ type: 'connect-four', position: index, player: 'red' });
        break;
      }
    }
  };

  const renderTicTacToe = () => (
    <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
      {board.map((cell, index) => (
        <Button
          key={index}
          onClick={() => handleTicTacToeMove(index)}
          className="h-20 w-20 text-2xl font-bold bg-white/20 hover:bg-white/30 border-2 border-white/40"
          disabled={!isPlayerTurn || cell}
        >
          {cell}
        </Button>
      ))}
    </div>
  );

  const renderConnectFour = () => (
    <div className="grid grid-cols-7 gap-1 bg-blue-600 p-4 rounded-lg mx-auto w-fit">
      {Array.from({ length: 42 }, (_, index) => {
        const col = index % 7;
        return (
          <div
            key={index}
            onClick={() => handleConnectFourMove(col)}
            className={`w-12 h-12 rounded-full border-2 cursor-pointer ${
              board[index] === 'red' ? 'bg-red-500' : 
              board[index] === 'yellow' ? 'bg-yellow-500' : 
              'bg-white/20 hover:bg-white/30'
            }`}
          />
        );
      })}
    </div>
  );

  const renderChess = () => (
    <div className="grid grid-cols-8 gap-0 w-80 h-80 mx-auto border-2 border-white/40">
      {board.map((cell, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isLight = (row + col) % 2 === 0;
        return (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center text-2xl cursor-pointer ${
              isLight ? 'bg-amber-100' : 'bg-amber-800'
            } hover:bg-blue-300`}
            onClick={() => onMove({ type: 'chess', from: selectedCard, to: index })}
          >
            {cell?.piece}
          </div>
        );
      })}
    </div>
  );

  const renderCheckers = () => (
    <div className="grid grid-cols-8 gap-0 w-80 h-80 mx-auto border-2 border-white/40">
      {board.map((cell, index) => {
        const row = Math.floor(index / 8);
        const col = index % 8;
        const isLight = (row + col) % 2 === 0;
        return (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center text-2xl cursor-pointer ${
              isLight ? 'bg-red-200' : 'bg-red-800'
            } hover:bg-blue-300`}
            onClick={() => onMove({ type: 'checkers', from: selectedCard, to: index })}
          >
            <span className={cell?.color === 'black' ? 'text-black' : 'text-red-600'}>
              {cell?.piece}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20">
      <CardHeader>
        <CardTitle className="text-white text-center">
          {gameType.replace('-', ' ').toUpperCase()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        {gameType === 'tic-tac-toe' && renderTicTacToe()}
        {gameType === 'connect-four' && renderConnectFour()}
        {gameType === 'chess' && renderChess()}
        {gameType === 'checkers' && renderCheckers()}
      </CardContent>
    </Card>
  );
};

export default GameplayEngine;