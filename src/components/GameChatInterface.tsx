import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile, AlertTriangle, Flag } from 'lucide-react';

interface Message {
  id: string;
  userId: string;
  username: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'icebreaker';
}

interface GameChatInterfaceProps {
  gameId: string;
  currentUserId: string;
  onSendMessage?: (message: string) => void;
}

const GameChatInterface: React.FC<GameChatInterfaceProps> = ({
  gameId,
  currentUserId,
  onSendMessage
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReactions = ['👍', '😄', '🎉', '🤔', '😮', '👏'];
  
  const aiIcebreakers = [
    "What's your favorite cultural tradition?",
    "Which game strategy works best for you?",
    "What brought you to this game today?",
    "Any gaming tips you'd like to share?"
  ];

  useEffect(() => {
    // Add AI icebreaker on game start
    const icebreaker = aiIcebreakers[Math.floor(Math.random() * aiIcebreakers.length)];
    setMessages([{
      id: 'icebreaker-1',
      userId: 'cubbleton-ai',
      username: 'Cubbleton AI',
      content: `💡 ${icebreaker}`,
      timestamp: new Date(),
      type: 'icebreaker'
    }]);
  }, [gameId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: 'You',
      content: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    onSendMessage?.(newMessage);
    setNewMessage('');
  };

  const handleQuickReaction = (emoji: string) => {
    const message: Message = {
      id: Date.now().toString(),
      userId: currentUserId,
      username: 'You',
      content: emoji,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    onSendMessage?.(emoji);
  };

  const handleReportMessage = (messageId: string) => {
    console.log('Reporting message:', messageId);
    // Implement reporting logic
  };

  return (
    <Card className="bg-white/10 backdrop-blur border-white/20 h-96 flex flex-col">
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Game Chat</h3>
          <div className="flex space-x-1">
            {quickReactions.map((emoji) => (
              <Button
                key={emoji}
                size="sm"
                variant="ghost"
                onClick={() => handleQuickReaction(emoji)}
                className="text-lg hover:bg-white/20 p-1 h-8 w-8"
              >
                {emoji}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 mb-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.userId === currentUserId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-2 rounded-lg ${
                  message.type === 'icebreaker'
                    ? 'bg-blue-500/30 border border-blue-400/50'
                    : message.userId === currentUserId
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs opacity-70">{message.username}</span>
                  {message.userId !== currentUserId && message.type !== 'icebreaker' && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleReportMessage(message.id)}
                      className="p-0 h-4 w-4 hover:bg-red-500/20"
                    >
                      <Flag className="w-3 h-3" />
                    </Button>
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-50">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white/10 border-white/20 text-white placeholder-white/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameChatInterface;