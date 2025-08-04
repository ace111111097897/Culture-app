import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FunctionalCubbletonAIProps {
  username: string;
}

const FunctionalCubbletonAI: React.FC<FunctionalCubbletonAIProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${username}! I'm Cubbleton, your AI companion. I can help you find compatible matches, suggest conversation starters, and provide cultural insights. What would you like to explore today?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    'Find matches with similar interests',
    'Suggest conversation starters',
    'Help improve my profile',
    'Cultural event recommendations',
    'Dating safety tips',
    'Plan a cultural date'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const { data, error } = await supabase.functions.invoke('cubbleton-ai-chat', {
        body: { 
          message: currentInput,
          username: username,
          context: 'dating_app'
        }
      });

      if (error) throw error;

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || 'Sorry, I encountered an issue. Please try again.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Chat Error:', error);
      const fallbackResponse = generateFallbackResponse(currentInput);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateFallbackResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('match') || lowerInput.includes('find')) {
      return "I'd love to help you find compatible matches! Based on your interests, I can suggest people who share your cultural background or hobbies. What specific qualities are you looking for in a match?";
    }
    
    if (lowerInput.includes('conversation') || lowerInput.includes('starter')) {
      return "Great conversation starters include asking about favorite cultural traditions, travel experiences, or food preferences. Try: 'What's a cultural tradition from your background that you love?' or 'What's the most interesting place you've visited?'";
    }
    
    if (lowerInput.includes('profile') || lowerInput.includes('improve')) {
      return "To improve your profile, consider adding more details about your cultural interests, hobbies, and what you're looking for. Authentic photos and genuine descriptions work best. What aspect of your profile would you like to enhance?";
    }
    
    if (lowerInput.includes('event') || lowerInput.includes('date')) {
      return "Cultural events make great dates! Consider visiting museums, cultural festivals, cooking classes, or art exhibitions. These activities provide natural conversation topics and shared experiences. What type of cultural activities interest you?";
    }
    
    if (lowerInput.includes('safety') || lowerInput.includes('safe')) {
      return "Safety is crucial in online dating. Always meet in public places, tell someone where you're going, trust your instincts, and take time to get to know someone before meeting. Would you like specific safety tips for first dates?";
    }
    
    return "That's an interesting question! I'm here to help with dating advice, finding matches, cultural insights, and making meaningful connections. Feel free to ask me about any aspect of your dating journey, and I'll do my best to provide helpful guidance.";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                Cubbleton AI
              </span>
              <p className="text-sm text-gray-600 font-normal">Your intelligent dating companion</p>
            </div>
            <Badge className="ml-auto bg-blue-100 text-blue-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={message.isUser ? 'bg-blue-500 text-white' : 'bg-purple-500 text-white'}>
                      {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.isUser ? 'bg-blue-500 text-white' : 'bg-purple-50 text-purple-800 border border-purple-200'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-purple-600'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-purple-500 text-white">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                    <p className="text-sm text-purple-600">Cubbleton is thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Cubbleton anything about dating and connections..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 border-blue-200 focus:border-blue-400"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600"
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left border-blue-200 hover:bg-blue-50 hover:border-blue-400"
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isTyping}
              >
                <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunctionalCubbletonAI;