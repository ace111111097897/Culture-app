import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles, Copyright } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface CultureAIProps {
  username: string;
}

const CultureAI: React.FC<CultureAIProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hi ${username}! I'm your AI companion. I can help you find compatible matches based on your cultural interests and preferences. What would you like to explore today?`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const suggestions = [
    'Find matches with similar food interests',
    'Suggest conversation starters',
    'Help improve my profile',
    'Cultural event recommendations'
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = {
      food: "Based on your profile, I found 3 users who love Asian cuisine like you! Sarah enjoys Korean BBQ, Marcus loves sushi, and Elena is passionate about Thai food. Would you like me to suggest conversation starters?",
      profile: "Your profile looks great! Consider adding more details about your favorite cultural experiences. Maybe mention a memorable trip or a cultural tradition you love. This helps others connect with your story.",
      conversation: "Here are some great conversation starters: 'What's the most interesting cultural festival you've attended?' or 'If you could have dinner with someone from any culture, who would it be?' These questions spark meaningful discussions!",
      events: "There are some amazing cultural events this weekend! The International Food Festival is happening downtown, and there's a Japanese tea ceremony workshop. Both are perfect for meeting like-minded people!"
    };

    const input = userInput.toLowerCase();
    if (input.includes('food') || input.includes('cuisine')) return responses.food;
    if (input.includes('profile') || input.includes('improve')) return responses.profile;
    if (input.includes('conversation') || input.includes('starter')) return responses.conversation;
    if (input.includes('event') || input.includes('activity')) return responses.events;
    
    return "That's interesting! I'm here to help you connect with people who share your cultural interests. You can ask me about finding matches, improving your profile, or discovering cultural events in your area.";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Culture AI Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-purple-500 p-2 rounded-full">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                Culture AI
                <Copyright className="h-4 w-4 text-gray-600" />
              </span>
              <p className="text-sm text-gray-600 font-normal">Your intelligent cultural companion</p>
            </div>
            <Badge className="ml-auto bg-emerald-100 text-emerald-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Online
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={message.isUser ? 'bg-teal-500 text-white' : 'bg-purple-500 text-white'}>
                      {message.isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.isUser ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-teal-100' : 'text-gray-500'}`}>
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
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Culture AI anything about cultural connections..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Suggestions */}
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
                className="justify-start h-auto p-3 text-left"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Sparkles className="h-4 w-4 mr-2 text-teal-500" />
                {suggestion}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CultureAI;