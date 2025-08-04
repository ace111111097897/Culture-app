import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Heart, 
  Users, 
  MessageCircle, 
  Gamepad2, 
  Bot, 
  Newspaper, 
  Sparkles, 
  Calendar, 
  Compass, 
  Globe, 
  User,
  LogOut,
  Home,
  Crown
} from 'lucide-react';

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    { id: 'feed', icon: Home, label: 'Home', color: 'text-teal-600' },
    { id: 'discover', icon: Search, label: 'Discover', color: 'text-emerald-600' },
    { id: 'matches', icon: Heart, label: 'Matches', color: 'text-purple-600', badge: '3' },
    { id: 'friends', icon: Users, label: 'Friends', color: 'text-teal-600' },
    { id: 'messages', icon: MessageCircle, label: 'Messages', color: 'text-emerald-600', badge: '2' },
    { id: 'games', icon: Gamepad2, label: 'Games', color: 'text-purple-600' },
    { id: 'kandi', icon: Bot, label: 'Kandi AI', color: 'text-teal-600' },
    { id: 'news', icon: Newspaper, label: 'News', color: 'text-gray-600' },
    { id: 'culture-bubbles', icon: Sparkles, label: 'Culture Bubbles', color: 'text-emerald-600' },
    { id: 'events', icon: Calendar, label: 'Events', color: 'text-purple-600' },
    { id: 'explore', icon: Compass, label: 'Explore', color: 'text-teal-600' },
    { id: 'community', icon: Globe, label: 'Community', color: 'text-emerald-600' },
    { id: 'preferences', icon: User, label: 'Profile', color: 'text-gray-700' },
    { id: 'subscription', icon: Crown, label: 'Premium', color: 'text-yellow-600' }
  ];

  // Show only essential items in bottom navigation for mobile
  const bottomNavItems = [
    navigationItems[0], // Home
    navigationItems[1], // Discover
    navigationItems[2], // Matches
    navigationItems[5], // Games
    navigationItems[12] // Profile
  ];
  
  return (
    <>
      {/* Bottom Navigation for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-50 pb-safe">
        <div className="flex justify-around items-center py-3 px-2">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-2 relative min-w-0 flex-1 ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-50 via-emerald-50 to-purple-50 text-teal-600' 
                    : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                <div className="relative">
                  <Icon className={`h-5 w-5 ${isActive ? item.color : ''}`} />
                  {item.badge && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className={`text-xs font-medium truncate ${
                  isActive ? 'text-teal-600' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Extended Navigation Menu for larger screens */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200 z-40 pt-20">
        <div className="p-4 space-y-2 max-h-full overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Navigation
            </h3>
          </div>
          
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => onSectionChange(item.id)}
                className={`w-full justify-start h-12 px-4 relative ${
                  isActive 
                    ? 'bg-gradient-to-r from-teal-50 via-emerald-50 to-purple-50 text-teal-600 border-r-2 border-teal-600' 
                    : 'text-gray-700 hover:text-teal-600 hover:bg-teal-50'
                }`}
              >
                <div className="flex items-center space-x-3 w-full">
                  <div className="relative">
                    <Icon className={`h-5 w-5 ${isActive ? item.color : ''}`} />
                    {item.badge && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center bg-gradient-to-r from-teal-500 to-emerald-500"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                  <span className="font-medium">{item.label}</span>
                  {item.id === 'kandi' && (
                    <Badge variant="secondary" className="ml-auto text-xs bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-700">
                      AI
                    </Badge>
                  )}
                  {item.id === 'subscription' && (
                    <Badge variant="default" className="ml-auto text-xs bg-gradient-to-r from-yellow-400 to-yellow-500">
                      PRO
                    </Badge>
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MobileNavigation;