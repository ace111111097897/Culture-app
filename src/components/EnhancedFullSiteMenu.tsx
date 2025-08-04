import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EnhancedHomeTab from './EnhancedHomeTab';
import { 
  Home, 
  Users, 
  MessageSquare, 
  User, 
  Gamepad2, 
  Bell,
  Bot,
  Crown,
  Search,
  Calendar,
  Settings,
  Trophy,
  Heart,
  Globe
} from 'lucide-react';

interface EnhancedFullSiteMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
  notificationCount?: number;
  username?: string;
}

const EnhancedFullSiteMenu: React.FC<EnhancedFullSiteMenuProps> = ({
  activeSection,
  onSectionChange,
  isMobile = false,
  notificationCount = 0,
  username = 'User'
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, color: 'text-teal-600' },
    { id: 'discover', label: 'Discover', icon: Search, color: 'text-blue-600' },
    { id: 'cubbles', label: 'Cubbles', icon: Globe, color: 'text-purple-600' },
    { id: 'matches', label: 'Matches', icon: Heart, color: 'text-pink-600' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, color: 'text-teal-600' },
    { id: 'connections', label: 'Connections', icon: Users, color: 'text-blue-600' },
    { id: 'games', label: 'Games', icon: Gamepad2, color: 'text-purple-600' },
    { id: 'events', label: 'Events', icon: Calendar, color: 'text-teal-600' },
    { id: 'achievements', label: 'Achievements', icon: Trophy, color: 'text-teal-600' },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount, color: 'text-blue-600' },
    { id: 'profile', label: 'Profile', icon: User, color: 'text-purple-600' },
    { id: 'preferences', label: 'Settings', icon: Settings, color: 'text-teal-600' },
    { id: 'premium', label: 'Premium', icon: Crown, color: 'text-blue-600' }
  ];

  if (isMobile) {
    const primaryItems = menuItems.filter(item => 
      ['home', 'discover', 'cubbles', 'messages', 'profile'].includes(item.id)
    );
    
    return (
      <div className="flex justify-around items-center py-3 px-2 bg-white/95 backdrop-blur-sm">
        {primaryItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all duration-200 relative ${
                isActive 
                  ? `bg-gradient-to-t from-teal-100 to-blue-50 ${item.color} shadow-sm` 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className={`text-xs font-medium ${isActive ? 'text-current' : ''}`}>
                {item.label}
              </span>
              {item.badge && item.badge > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                  {item.badge > 9 ? '9+' : item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-1">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Navigation
        </h3>
      </div>
      
      {/* Enhanced Home Tab */}
      <EnhancedHomeTab
        username={username}
        isActive={activeSection === 'home'}
        onClick={() => onSectionChange('home')}
        hasUpdates={true}
      />
      
      {/* Other Menu Items */}
      {menuItems.filter(item => item.id !== 'home').map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 relative group ${
              isActive 
                ? `bg-gradient-to-r from-teal-50 to-purple-50 ${item.color} shadow-sm border-l-4 border-current` 
                : 'text-gray-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-gray-800'
            }`}
          >
            <Icon className={`h-5 w-5 ${isActive ? 'scale-110' : 'group-hover:scale-105'} transition-transform`} />
            <span className={`font-medium ${isActive ? 'text-current' : ''}`}>
              {item.label}
            </span>
            {item.badge && item.badge > 0 && (
              <Badge className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {item.badge > 99 ? '99+' : item.badge}
              </Badge>
            )}
            {isActive && (
              <div className="absolute right-2 w-2 h-2 bg-current rounded-full opacity-60"></div>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default EnhancedFullSiteMenu;