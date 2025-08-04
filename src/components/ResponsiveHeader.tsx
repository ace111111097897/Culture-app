import React from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bell, Search, Menu, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import CubbleBrandLogo from './CubbleBrandLogo';

interface ResponsiveHeaderProps {
  username: string;
  onMenuToggle?: () => void;
  onNotifications?: () => void;
  onSearch?: () => void;
  onCultureAI?: () => void;
  onHomeClick?: () => void;
  className?: string;
}

const ResponsiveHeader: React.FC<ResponsiveHeaderProps> = ({
  username,
  onMenuToggle,
  onNotifications,
  onSearch,
  onCultureAI,
  onHomeClick,
  className
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <header className={cn(
      'bg-gradient-to-r from-orange-50 to-pink-50 border-b border-orange-200 sticky top-0 z-30',
      className
    )}>
      <div className={cn(
        'flex items-center justify-between h-16',
        {
          'px-4': isMobile,
          'px-6': isTablet,
          'px-8': isDesktop,
        }
      )}>
        {/* Left side */}
        <div className="flex items-center gap-4">
          {isMobile && onMenuToggle && (
            <Button variant="ghost" size="sm" onClick={onMenuToggle}>
              <Menu className="h-5 w-5 text-orange-600" />
            </Button>
          )}
          
          <CubbleBrandLogo 
            size={isMobile ? 'sm' : 'md'} 
            showText={!isMobile}
            onClick={onHomeClick}
          />
        </div>

        {/* Center - Search (desktop/tablet only) */}
        {!isMobile && onSearch && (
          <div className="flex-1 max-w-md mx-8">
            <Button
              variant="outline"
              onClick={onSearch}
              className="w-full justify-start text-gray-500 hover:text-gray-700 border-orange-200 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50"
            >
              <Search className="h-4 w-4 mr-2 text-orange-500" />
              Search connections, cultures...
            </Button>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center gap-2">
          {isMobile && onSearch && (
            <Button variant="ghost" size="sm" onClick={onSearch}>
              <Search className="h-5 w-5 text-orange-600" />
            </Button>
          )}
          
          {onCultureAI && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCultureAI}
              className="relative hover:bg-gradient-to-r hover:from-orange-100 hover:to-pink-100"
              title="Cubbleton AI Assistant"
            >
              <Bot className="h-5 w-5 text-orange-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full border-2 border-white" />
            </Button>
          )}
          
          {onNotifications && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onNotifications} 
              className="relative hover:bg-gradient-to-r hover:from-orange-100 hover:to-pink-100"
            >
              <Bell className="h-5 w-5 text-orange-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                3
              </Badge>
            </Button>
          )}
          
          <Avatar className={cn(
            'ring-2 ring-orange-200',
            {
              'h-8 w-8': isMobile,
              'h-9 w-9': isTablet || isDesktop,
            }
          )}>
            <AvatarImage src={`/api/placeholder/32/32`} alt={username} />
            <AvatarFallback className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {!isMobile && (
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-900">{username}</p>
              <p className="text-xs text-gray-500">Verified User</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ResponsiveHeader;