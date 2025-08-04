import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Calendar, MessageCircle, Heart, TrendingUp, Globe, Zap } from 'lucide-react';

interface InteractiveLogoProps {
  onSectionChange: (section: string) => void;
}

const InteractiveLogo: React.FC<InteractiveLogoProps> = ({ onSectionChange }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="space-y-6">
      <Card 
        className="p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border-purple-200 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="text-center space-y-4">
          {/* Updated Logo with Hexagonal Pattern */}
          <div className={`mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl transform rotate-12 shadow-lg transition-all duration-500 ${
            isHovered ? 'scale-110' : ''
          }`}>
            <div className="absolute inset-1 bg-gradient-to-tr from-white/20 to-transparent rounded-lg">
              <div className="w-full h-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-3/4 h-3/4">
                  <div className="bg-white/40 rounded-sm"></div>
                  <div className="bg-white/60 rounded-sm"></div>
                  <div className="bg-white/60 rounded-sm"></div>
                  <div className="bg-white/40 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to Culture™
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Your gateway to global connections
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Users className="h-4 w-4 text-purple-600" />
                <span className="text-lg font-bold text-gray-900">2.4K</span>
                <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0">+12%</Badge>
              </div>
              <p className="text-xs text-gray-500">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-lg font-bold text-gray-900">47</span>
                <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0">+8%</Badge>
              </div>
              <p className="text-xs text-gray-500">Live Events</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-lg font-bold text-gray-900">195</span>
                <Badge className="text-xs bg-green-100 text-green-700 px-1 py-0">+3%</Badge>
              </div>
              <p className="text-xs text-gray-500">Cultures</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveLogo;