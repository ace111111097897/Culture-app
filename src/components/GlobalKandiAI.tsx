import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Users, Globe, Lightbulb, X } from 'lucide-react';

interface GlobalKandiAIProps {
  currentSection: string;
  isVisible: boolean;
  onClose: () => void;
}

const GlobalKandiAI: React.FC<GlobalKandiAIProps> = ({ currentSection, isVisible, onClose }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isKandi: boolean}>>([]);
  const [inputText, setInputText] = useState('');

  const cultureTips = [
    "🇯🇵 In Japan, bowing is a sign of respect - the deeper the bow, the more respect shown!",
    "🇮🇳 In India, touching someone's feet is a gesture of respect to elders and teachers.",
    "🇫🇷 In France, greeting with kisses on both cheeks is common among friends and family.",
    "🇧🇷 Brazilians are very warm - expect hugs and close conversation distances!",
    "🇰🇷 In Korea, using both hands when giving or receiving items shows respect."
  ];

  const getContextualResponse = () => {
    const responses = {
      matches: "I can help you understand potential matches better! I know their interests, cultural background, and communication style. Would you like insights about someone specific?",
      friends: "I've analyzed your friend connections and can suggest people with similar interests or complementary personalities. Want me to recommend some new connections?",
      messages: "I can help you craft culturally appropriate messages or explain cultural context behind conversations. What would you like to know?",
      discover: "Based on your profile, I found some fascinating cultural events and communities you might enjoy. Shall I share my recommendations?",
      community: "I can help you navigate cultural discussions and suggest topics that align with your interests. Want me to find relevant conversations?",
      default: "Hi! I'm Kandi, your cultural AI companion. I know everyone's profiles, read all messages (with permission), and can help you understand different cultures better!"
    };
    return responses[currentSection as keyof typeof responses] || responses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = { id: Date.now(), text: inputText, isKandi: false };
    setMessages(prev => [...prev, newMessage]);
    
    setTimeout(() => {
      const response = { 
        id: Date.now() + 1, 
        text: getContextualResponse(), 
        isKandi: true 
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
    
    setInputText('');
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-2xl border-2 border-purple-200 z-50">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-bold">Kandi AI</span>
            <Badge variant="secondary" className="text-xs">Brain of the App</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <div className="bg-purple-50 p-2 rounded-lg text-sm">
            <div className="flex items-center space-x-1 mb-1">
              <Lightbulb className="h-3 w-3 text-yellow-500" />
              <span className="font-medium text-purple-700">Culture Tip of the Day</span>
            </div>
            <p className="text-purple-600">{cultureTips[Math.floor(Math.random() * cultureTips.length)]}</p>
          </div>
          
          {messages.length === 0 && (
            <div className="bg-gray-50 p-2 rounded-lg text-sm text-gray-600">
              {getContextualResponse()}
            </div>
          )}
          
          {messages.map(msg => (
            <div key={msg.id} className={`p-2 rounded-lg text-sm ${
              msg.isKandi ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700 ml-4'
            }`}>
              {msg.text}
            </div>
          ))}
        </div>
        
        <div className="p-3 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Kandi anything..."
              className="flex-1 px-2 py-1 border rounded text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage}>
              <MessageCircle className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalKandiAI;