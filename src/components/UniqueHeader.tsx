import React, { useState } from 'react';
import { Search, Bell, Sparkles, Menu, HelpCircle, X, LogOut, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CubbleBrandLogo from './CubbleBrandLogo';

interface UniqueHeaderProps {
  username: string;
  onLogout: () => void;
  onOpenAITour?: () => void;
  notificationCount?: number;
  onNotificationsClick?: () => void;
  onMenuClick?: () => void;
}

const UniqueHeader: React.FC<UniqueHeaderProps> = ({ 
  username, 
  onLogout,
  onOpenAITour,
  notificationCount = 0,
  onNotificationsClick,
  onMenuClick
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      setShowUserMenu(!showUserMenu);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-purple-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <CubbleBrandLogo />
          </div>

          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search cubbles, events, people..."
                className="pl-10 pr-4 py-2 w-full bg-white/80 border-purple-200 focus:border-purple-400 rounded-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 relative">
            {onOpenAITour && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onOpenAITour}
                className="hidden md:flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm">Tour</span>
              </Button>
            )}
            
            <Button 
              onClick={onOpenAITour}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full px-4 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Cubbleton</span>
              <span className="md:hidden">AI</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              className="relative"
              onClick={onNotificationsClick}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 text-white">
                  {notificationCount}
                </Badge>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMenuClick}
              className="hover:bg-purple-50"
            >
              {showUserMenu ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-48 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{username}</p>
                  <p className="text-xs text-gray-500">Cubbleton Member</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <div className="border-t border-gray-100 mt-2">
                  <button 
                    onClick={onLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium text-gray-900">Welcome back,</p>
              <p className="text-xs text-purple-600 font-semibold">{username}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UniqueHeader;