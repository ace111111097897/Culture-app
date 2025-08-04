import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, MessageCircle, Users, Globe, Lightbulb, X, Copyright, Shield, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface GlobalCultureAIProps {
  currentSection: string;
  isVisible: boolean;
  onClose: () => void;
}

const GlobalCultureAI: React.FC<GlobalCultureAIProps> = ({ currentSection, isVisible, onClose }) => {
  const [messages, setMessages] = useState<Array<{id: number, text: string, isAI: boolean, type?: 'warning' | 'alert'}>>([]);
  const [inputText, setInputText] = useState('');
  const [safetyAlerts, setSafetyAlerts] = useState<Array<{id: string, message: string, severity: 'low' | 'medium' | 'high'}>>([]);

  const cultureTips = [
    "🇯🇵 In Japan, bowing is a sign of respect - the deeper the bow, the more respect shown!",
    "🇮🇳 In India, touching someone's feet is a gesture of respect to elders and teachers.",
    "🇫🇷 In France, greeting with kisses on both cheeks is common among friends and family.",
    "🇧🇷 Brazilians are very warm - expect hugs and close conversation distances!",
    "🇰🇷 In Korea, using both hands when giving or receiving items shows respect."
  ];

  // Safety monitoring simulation
  useEffect(() => {
    const monitorSafety = () => {
      // Simulate safety monitoring
      const potentialIssues = [
        { id: 'msg_001', message: 'Detected potentially inappropriate language in recent message', severity: 'medium' as const },
        { id: 'profile_002', message: 'User profile contains suspicious contact information', severity: 'high' as const },
        { id: 'behavior_003', message: 'Unusual messaging pattern detected - multiple rapid contacts', severity: 'low' as const }
      ];
      
      // Randomly trigger safety alerts for demo
      if (Math.random() > 0.8 && safetyAlerts.length === 0) {
        const randomAlert = potentialIssues[Math.floor(Math.random() * potentialIssues.length)];
        setSafetyAlerts([randomAlert]);
        
        // Add safety warning to chat
        const warningMessage = {
          id: Date.now(),
          text: `🛡️ Safety Alert: ${randomAlert.message}. I recommend reviewing this content for community guidelines compliance.`,
          isAI: true,
          type: 'warning' as const
        };
        setMessages(prev => [...prev, warningMessage]);
      }
    };

    const interval = setInterval(monitorSafety, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [safetyAlerts]);

  const getContextualResponse = () => {
    const responses = {
      matches: "I can help you understand potential matches better! I also monitor interactions for safety. Would you like insights about someone specific?",
      friends: "I've analyzed your friend connections and watch for any concerning behavior patterns. Want me to recommend some new connections?",
      messages: "I can help you craft culturally appropriate messages and monitor conversations for safety violations. What would you like to know?",
      discover: "Based on your profile, I found some fascinating cultural events. I also ensure all recommendations are from verified, safe sources.",
      safety: "I'm constantly monitoring the platform for safety violations, inappropriate content, and suspicious behavior patterns. Your safety is my priority!",

      default: "Hi! I'm your cultural AI companion and safety watchdog. I monitor all interactions to ensure a safe, respectful environment for everyone!"
    };
    return responses[currentSection as keyof typeof responses] || responses.default;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage = { id: Date.now(), text: inputText, isAI: false };
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate safety check on user input
    const hasPotentialIssue = inputText.toLowerCase().includes('unsafe') || inputText.toLowerCase().includes('inappropriate');
    
    setTimeout(() => {
      let response;
      if (hasPotentialIssue) {
        response = { 
          id: Date.now() + 1, 
          text: "⚠️ I've detected potentially concerning content in your message. Please remember to follow community guidelines and maintain respectful communication.", 
          isAI: true,
          type: 'warning' as const
        };
      } else {
        response = { 
          id: Date.now() + 1, 
          text: getContextualResponse(), 
          isAI: true 
        };
      }
      setMessages(prev => [...prev, response]);
    }, 1000);
    
    setInputText('');
  };

  const dismissSafetyAlert = (alertId: string) => {
    setSafetyAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  if (!isVisible) return null;

  return (
    <Card className="fixed bottom-20 right-4 w-80 h-96 shadow-2xl border-2 border-purple-200 z-50">
      <CardContent className="p-0 h-full flex flex-col">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span className="font-bold flex items-center gap-1">
              Culture AI
              <Copyright className="h-3 w-3" />
            </span>
            <Badge variant="secondary" className="text-xs flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Safety Monitor
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {/* Safety Alerts */}
          {safetyAlerts.map(alert => (
            <Alert key={alert.id} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-red-500 bg-red-50' :
              alert.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span className="text-sm">{alert.message}</span>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => dismissSafetyAlert(alert.id)}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </AlertDescription>
            </Alert>
          ))}
          
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
              msg.type === 'warning' ? 'bg-yellow-50 text-yellow-800 border border-yellow-200' :
              msg.isAI ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700 ml-4'
            }`}>
              {msg.type === 'warning' && <Shield className="h-3 w-3 inline mr-1" />}
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
              placeholder="Ask Culture AI anything..."
              className="flex-1 px-2 py-1 border rounded text-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button size="sm" onClick={handleSendMessage}>
              <MessageCircle className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Shield className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-600">Safety monitoring active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalCultureAI;