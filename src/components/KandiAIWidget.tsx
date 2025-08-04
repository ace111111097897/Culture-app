import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, MessageCircle, X, Sparkles } from 'lucide-react';

interface KandiAIWidgetProps {
  currentSection?: string;
  contextData?: any;
}

const KandiAIWidget: React.FC<KandiAIWidgetProps> = ({ currentSection, contextData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tip, setTip] = useState('');

  const cultureTips = {
    matches: "💡 Tip: Look for shared cultural experiences in profiles - they're great conversation starters!",
    friends: "🌍 Tip: Friends from different cultures can introduce you to amazing new traditions and perspectives.",
    messages: "💬 Tip: Ask about cultural celebrations or favorite dishes to spark meaningful conversations.",
    games: "🎮 Tip: Playing games together breaks cultural barriers and creates instant connections!",
    discover: "🔍 Tip: Try exploring events from cultures you're curious about - it's a great way to learn!",
    community: "👥 Tip: Join cultural groups that interest you - they're welcoming to newcomers!",
    default: "✨ Daily Tip: Every culture has unique ways of showing friendship - be open to learning them!"
  };

  React.useEffect(() => {
    const sectionTip = cultureTips[currentSection as keyof typeof cultureTips] || cultureTips.default;
    setTip(sectionTip);
  }, [currentSection]);

  const getContextualAdvice = () => {
    switch (currentSection) {
      case 'matches':
        return "I can help you understand cultural compatibility and suggest conversation topics based on shared interests!";
      case 'friends':
        return "I know all your friends' cultural backgrounds and can suggest activities you'd all enjoy together!";
      case 'messages':
        return "I've read your conversations and can suggest culturally appropriate responses and topics!";
      default:
        return "I'm here to help you navigate cultural connections and learn about different traditions!";
    }
  };

  return (
    <>
      {/* Floating Kandi Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>

      {/* Kandi Widget */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-80">
          <Card className="shadow-xl border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-purple-600">Kandi AI</h3>
                  <p className="text-xs text-gray-500">Cultural Intelligence</p>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-purple-800">{tip}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700">{getContextualAdvice()}</p>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                onClick={() => {/* Navigate to full Kandi AI */}}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat with Kandi
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default KandiAIWidget;