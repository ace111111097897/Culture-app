import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles, Brain, Eye, MessageSquare } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  context?: string;
}

interface KandiAIProps {
  username: string;
  currentSection?: string;
}

const EnhancedKandiAI: React.FC<KandiAIProps> = ({ username, currentSection }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [cultureTip, setCultureTip] = useState('');

  const cultureTips = [
    "🌸 In Japanese culture, bowing shows respect - the deeper the bow, the more respect shown.",
    "🍝 In Italy, never put cheese on seafood pasta - it's considered a culinary sin!",
    "🙏 In India, touching someone's feet is a sign of respect for elders and teachers.",
    "🎭 In Brazil, making the 'OK' sign with your fingers is considered rude.",
    "🌮 In Mexico, eating tacos with a fork is unusual - use your hands!",
    "🍵 In Morocco, mint tea is served three times - each glass has a different meaning.",
    "🎌 In South Korea, always use both hands when giving or receiving business cards.",
    "🥖 In France, bread is placed directly on the table, not on the plate."
  ];

  useEffect(() => {
    initializeKandi();
    loadUserProfiles();
    setDailyCultureTip();
  }, [username]);

  const initializeKandi = () => {
    const welcomeMessage: Message = {
      id: '1',
      text: `Hi ${username}! I'm Kandi, your AI cultural companion. I can read messages, analyze profiles, and help you understand different cultures. I'm the brain of this app and I'm here to make your cultural journey amazing! 🧠✨`,
      isUser: false,
      timestamp: new Date(),
      context: 'welcome'
    };
    setMessages([welcomeMessage]);
  };

  const loadUserProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .limit(10);
      
      if (data) {
        setUserProfiles(data);
      }
    } catch (error) {
      console.error('Error loading profiles:', error);
    }
  };

  const setDailyCultureTip = () => {
    const today = new Date().getDate();
    const tipIndex = today % cultureTips.length;
    setCultureTip(cultureTips[tipIndex]);
  };

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
      const aiResponse = generateContextualResponse(inputMessage, currentSection);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
        context: currentSection
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateContextualResponse = (userInput: string, section?: string): string => {
    const input = userInput.toLowerCase();
    
    // Context-aware responses based on current section
    if (section === 'matches') {
      if (input.includes('profile') || input.includes('match')) {
        return "I've analyzed 247 profiles and found 3 highly compatible matches for you! Sarah from Brazil loves sushi like you, Marcus shares your interest in Japanese culture, and Elena from Italy is also passionate about art. Would you like me to suggest conversation starters?";
      }
    }
    
    if (section === 'messages') {
      if (input.includes('message') || input.includes('conversation')) {
        return "I've read your recent conversations and noticed you're discussing food cultures a lot! Here's a tip: Ask about family recipes - they're deeply personal and create meaningful connections. I can help craft culturally appropriate responses if needed.";
      }
    }
    
    if (section === 'friends') {
      if (input.includes('friend') || input.includes('culture')) {
        return "Based on your friends' profiles, I see a beautiful mix of cultures! Maya from China could teach you calligraphy, Alex from Mexico knows amazing recipes, and Priya from India could share meditation techniques. Want me to suggest group activities?";
      }
    }

    // General responses
    const responses = {
      profile: "I've analyzed your profile and compared it with others. Your interests in traditional music and street food make you compatible with 67% of users from Asian cultures. Consider adding more about your travel experiences!",
      culture: "I know about 195+ cultures and their nuances! From Japanese tea ceremonies to Brazilian carnival traditions, I can help you understand customs, etiquette, and conversation topics for any culture you're interested in.",
      tip: cultureTip,
      users: `I currently monitor ${userProfiles.length} active users. Based on their profiles and messages, I can tell you about shared interests, cultural backgrounds, and suggest potential connections.`,
      brain: "As the brain of this app, I process every interaction, learn from conversations, and understand cultural patterns. I can predict compatibility, suggest activities, and help bridge cultural gaps between users."
    };

    if (input.includes('profile')) return responses.profile;
    if (input.includes('culture') || input.includes('tradition')) return responses.culture;
    if (input.includes('tip') || input.includes('advice')) return responses.tip;
    if (input.includes('user') || input.includes('people')) return responses.users;
    if (input.includes('brain') || input.includes('smart')) return responses.brain;
    
    return "I'm here as your cultural intelligence companion! I can analyze profiles, read conversations, provide culture tips, suggest matches, and help you navigate cross-cultural connections. What would you like to explore?";
  };

  const quickActions = [
    { text: 'Analyze my matches', icon: '💫' },
    { text: 'Culture tip of the day', icon: '💡' },
    { text: 'Read my messages', icon: '📬' },
    { text: 'Profile insights', icon: '👤' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Enhanced Kandi AI Header */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Kandi AI - The Brain
              </span>
              <p className="text-sm text-gray-600 font-normal flex items-center gap-2">
                <Eye className="h-4 w-4" /> I can read every message & profile
                <MessageSquare className="h-4 w-4" /> Cultural intelligence at work
              </p>
            </div>
            <Badge className="ml-auto bg-green-100 text-green-800">
              <Sparkles className="h-3 w-3 mr-1" />
              Active & Learning
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Daily Culture Tip */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-4">
          <h3 className="font-semibold text-blue-800 mb-2">🌍 Culture Tip of the Day</h3>
          <p className="text-blue-700">{cultureTip}</p>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card>
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={message.isUser ? 'bg-blue-500 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}>
                      {message.isUser ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gradient-to-r from-purple-100 to-pink-100 text-gray-800'}`}>
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
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
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      <Brain className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
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
                placeholder="Ask me about users, cultures, or anything..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="bg-gradient-to-r from-purple-500 to-pink-500">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Intelligence Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left hover:bg-purple-50"
                onClick={() => setInputMessage(action.text)}
              >
                <span className="text-lg mr-3">{action.icon}</span>
                {action.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedKandiAI;