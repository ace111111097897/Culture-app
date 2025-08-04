import React, { useState } from 'react';
import { X, Sparkles, Send, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const GlobalCubbletonAI: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversation, setConversation] = useState([
    {
      type: 'ai',
      content: `Hello! I'm Cubbleton, your AI companion for navigating the culture bubble. I can help you discover new cultures, find events, connect with people, and make the most of your Cubble experience. What would you like to explore today?`,
      timestamp: new Date()
    }
  ]);

  const suggestions = ['Show me trending cubbles', 'Find cultural events near me', 'Suggest new connections', 'Help with cultural matching'];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    const aiResponse = {
      type: 'ai', 
      content: `I understand you're interested in "${message}". As your Cubbleton AI, I can help you explore this cultural topic. In the culture bubble, we believe every interest connects us to a broader cultural experience. Let me provide some personalized suggestions for you.`,
      timestamp: new Date()
    };

    setConversation(prev => [...prev, userMessage, aiResponse]);
    setMessage('');
  };

  const handleCubbletonClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Floating AI Button - positioned to not interfere with mobile nav */}
      <Button
        onClick={handleCubbletonClick}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg z-40 md:bottom-6"
      >
        <Sparkles className="w-6 h-6" />
      </Button>

      {/* AI Chat Interface */}
      {isVisible && (
        <div className="fixed bottom-36 right-6 z-50 md:bottom-24">
          <Card className={`bg-white/95 backdrop-blur-lg border-2 border-purple-200 shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Cubbleton AI</h3>
                  <p className="text-xs opacity-90">Your cultural guide</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-white hover:bg-white/20 p-1"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Status Badge */}
                <div className="p-3 bg-purple-50 border-b border-purple-100">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Online & Ready to Help
                  </Badge>
                </div>

                {/* Conversation */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-64">
                  {conversation.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Suggestions */}
                <div className="p-3 border-t border-purple-100">
                  <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setMessage(suggestion)}
                        className="text-xs h-7 px-2 border-purple-200 hover:bg-purple-50"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-purple-200">
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ask Cubbleton anything about culture..."
                      className="flex-1 border-purple-200 focus:border-purple-400"
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default GlobalCubbletonAI;