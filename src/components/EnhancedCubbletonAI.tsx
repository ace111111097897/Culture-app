import React, { useState } from 'react';
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { CubbletonAIChat } from './CubbletonAIChat';
import { 
  MessageCircle, 
  Brain, 
  Shield, 
  Heart, 
  Globe, 
  Users, 
  Send,
  Loader2,
  Eye,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const EnhancedCubbletonAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(true);
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/cubbleton-chat',
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: "Hi! I'm Cubbleton, your AI assistant. I'm here to help with cultural insights, safety tips, and finding meaningful connections!"
      }
    ]
  });

  const quickActions = [
    { 
      icon: Heart, 
      label: "Find Matches", 
      prompt: "Help me find culturally compatible matches based on my interests"
    },
    { 
      icon: Shield, 
      label: "Safety Tips", 
      prompt: "Give me some dating safety tips for meeting new people"
    },
    { 
      icon: Globe, 
      label: "Cultural Insight", 
      prompt: "Share an interesting cultural fact or tradition"
    },
    { 
      icon: Users, 
      label: "Conversation Starters", 
      prompt: "Suggest some cultural conversation starters for my matches"
    }
  ];

  const handleQuickAction = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any);
    handleSubmit();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 shadow-xl z-50 border-2 border-white/20"
      >
        <div className="relative">
          <Brain className="w-6 h-6 text-white" />
          {monitoringActive && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-pulse" />
          )}
        </div>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 z-50 flex flex-col shadow-2xl border-teal-200">
          <div className="p-4 border-b bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-t-lg">
            <h3 className="font-bold flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Cubbleton AI
              <Badge className="bg-white/20 flex items-center gap-1 text-white">
                <Eye className="w-3 h-3" />
                Active
              </Badge>
            </h3>
            <p className="text-xs opacity-90">Your AI cultural & dating guide</p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg ${
                    message.role === 'assistant' 
                      ? 'bg-teal-50 border-l-4 border-teal-500' 
                      : 'bg-gray-50 ml-8'
                  }`}
                >
                  <p className="text-sm text-teal-800">{message.content}</p>
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

          <div className="p-4 border-t border-teal-100 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs hover:bg-teal-50 hover:border-teal-400 border-teal-200 text-teal-700"
                  onClick={() => handleQuickAction(action.prompt)}
                  disabled={isLoading}
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask Cubbleton anything..."
                className="text-sm border-teal-200 focus:border-teal-400"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="sm" 
                className="bg-teal-500 hover:bg-teal-600"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};