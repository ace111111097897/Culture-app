import React from 'react';
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';
import { Send, Loader2, Brain, Sparkles } from 'lucide-react';

interface CubbletonAIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CubbletonAIChat: React.FC<CubbletonAIChatProps> = ({ isOpen, onClose }) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/cubbleton-chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Cubbleton, your AI cultural guide and dating assistant. How can I help you today? 🌍✨"
      }
    ]
  });

  if (!isOpen) return null;

  return (
    <Card className="fixed inset-4 z-50 flex flex-col shadow-2xl border-teal-200 max-w-2xl mx-auto">
      <div className="p-4 border-b bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            <div>
              <h3 className="font-bold">Cubbleton AI Chat</h3>
              <p className="text-xs opacity-90">Your cultural dating assistant</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            ✕
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-teal-500 text-white ml-4' 
                  : 'bg-teal-50 border-l-4 border-teal-500 text-teal-800'
              }`}>
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-medium text-teal-600">Cubbleton AI</span>
                  </div>
                )}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-teal-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Cubbleton is thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-teal-100">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask Cubbleton about cultures, dating tips, or anything..."
            className="flex-1 border-teal-200 focus:border-teal-400"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-teal-500 hover:bg-teal-600"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
};