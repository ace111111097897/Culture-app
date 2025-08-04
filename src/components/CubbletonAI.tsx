import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Brain, Shield, Heart, Sparkles, Eye, AlertTriangle, Users, Globe } from 'lucide-react';

interface SecurityEvent {
  type: 'photo' | 'video' | 'message';
  action: 'blocked' | 'flagged' | 'approved';
  timestamp: string;
}

export const CubbletonAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [monitoringActive, setMonitoringActive] = useState(true);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [culturalFact, setCulturalFact] = useState('');
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm Cubbleton, your AI watchdog and cultural guide. I'm monitoring your content for safety while helping you discover amazing cultural connections!" }
  ]);

  const culturalFacts = [
    "In Japan, the art of gift wrapping (tsutsumi) is considered as important as the gift itself!",
    "Mexican families often have three generations living together, strengthening cultural bonds.",
    "In India, touching someone's feet is a sign of respect for elders and teachers.",
    "Korean age system counts you as 1 year old at birth, making everyone older!",
    "In Morocco, mint tea is served to guests as a symbol of hospitality and friendship."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (monitoringActive) {
        const eventTypes = ['photo', 'video', 'message'] as const;
        const actions = ['blocked', 'flagged', 'approved'] as const;
        
        const newEvent: SecurityEvent = {
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          action: actions[Math.floor(Math.random() * actions.length)],
          timestamp: new Date().toLocaleTimeString()
        };
        
        setSecurityEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      }
    }, 8000);

    setCulturalFact(culturalFacts[Math.floor(Math.random() * culturalFacts.length)]);
    return () => clearInterval(interval);
  }, [monitoringActive]);

  const handleCulturalInsight = () => {
    const newFact = culturalFacts[Math.floor(Math.random() * culturalFacts.length)];
    setCulturalFact(newFact);
    setMessages(prev => [...prev, { type: 'ai', text: `🌍 Cultural Insight: ${newFact}` }]);
  };

  const handleSafetyCheck = () => {
    setMessages(prev => [...prev, { 
      type: 'ai', 
      text: `🛡️ Safety Status: All clear! I've scanned ${Math.floor(Math.random() * 50) + 20} messages, ${Math.floor(Math.random() * 10) + 5} photos, and ${Math.floor(Math.random() * 5) + 1} videos in the last hour. Everything looks safe!` 
    }]);
  };

  const handleFindMatches = () => {
    setMessages(prev => [...prev, { 
      type: 'ai', 
      text: `💕 Based on your cultural interests and preferences, I found 3 potential matches who share your love for traditional arts and global cuisine! Check your matches tab.` 
    }]);
  };

  const quickActions = [
    { icon: Heart, label: "Find Matches", action: handleFindMatches },
    { icon: Shield, label: "Safety Check", action: handleSafetyCheck },
    { icon: Globe, label: "Cultural Fact", action: handleCulturalInsight },
    { icon: Users, label: "Connections", action: () => {} }
  ];

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
                Watching
              </Badge>
            </h3>
            <p className="text-xs opacity-90">Your AI safety & cultural guide</p>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-800">Security Monitor</span>
              </div>
              <div className="text-xs space-y-1">
                {securityEvents.slice(0, 3).map((event, idx) => (
                  <div key={idx} className="flex justify-between text-teal-700">
                    <span>{event.type} {event.action}</span>
                    <span className="text-teal-500">{event.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>

            {culturalFact && (
              <div className="bg-emerald-50 p-3 rounded-lg border-l-4 border-emerald-500">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">Cultural Insight</span>
                </div>
                <p className="text-xs text-emerald-700">{culturalFact}</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div key={idx} className={`p-3 rounded-lg ${msg.type === 'ai' ? 'bg-teal-50 border-l-4 border-teal-500' : 'bg-gray-50 ml-8'}`}>
                <p className="text-sm text-teal-800">{msg.text}</p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-teal-100">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {quickActions.map((action, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs hover:bg-teal-50 hover:border-teal-400 border-teal-200 text-teal-700"
                  onClick={action.action}
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.label}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-xs text-teal-600">
              <span>Monitoring: {monitoringActive ? 'Active' : 'Paused'}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setMonitoringActive(!monitoringActive)}
                className="h-6 px-2 hover:bg-teal-50 text-teal-600"
              >
                {monitoringActive ? 'Pause' : 'Resume'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};