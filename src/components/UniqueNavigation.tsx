import React from 'react';
import { Home, Search, Heart, Users, MessageCircle, Gamepad2, Newspaper, Sparkles, Calendar, Compass, Globe, User, Crown, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface UniqueNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const UniqueNavigation: React.FC<UniqueNavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  onLogout 
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'cubbles', label: 'Cubbles', icon: Sparkles, featured: true },
    { id: 'matches', label: 'Matches', icon: Heart, badge: '3' },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: '12' },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'community', label: 'Community', icon: Globe },
    { id: 'safety', label: 'Tips & Safety', icon: Shield },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-purple-200 md:relative md:bg-transparent md:border-0">
      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-around p-2 overflow-x-auto">
        {navigationItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:bg-purple-100'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium mt-1">{item.label}</span>
              {item.badge && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                  {item.badge}
                </Badge>
              )}
              {item.featured && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-200 p-4 mx-4 mb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`relative flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105' 
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                  } ${item.featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                  
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                      {item.badge}
                    </Badge>
                  )}
                  
                  {item.featured && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse" />
                  )}
                  
                  {item.id === 'cubbles' && (
                    <Badge className="ml-auto bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1">
                      HOT
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Premium Button - Separate Row with proper spacing */}
          <div className="mt-6 pt-4 border-t border-purple-200">
            <Button 
              onClick={() => onSectionChange('subscription')}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Crown className="h-5 w-5 mr-2" />
              Premium - Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueNavigation;