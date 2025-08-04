import React from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, Search, Heart, Users, MessageCircle, Gamepad2, 
  Sparkles, Newspaper, Calendar, Compass, Globe, 
  User, LogOut, Bot, CreditCard, Copyright
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResponsiveNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({
  activeSection,
  onSectionChange,
  onLogout
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'matches', icon: Heart, label: 'Matches', badge: '3' },
    { id: 'friends', icon: Users, label: 'Friends' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'explore', icon: Compass, label: 'Explore' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  const handleNavClick = (id: string) => {
    onSectionChange(id);
  };

  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'flex flex-col items-center p-2 h-auto min-w-0',
                  activeSection === item.id ? 'bg-teal-100 text-teal-700' : 'text-gray-600'
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {item.badge && (
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-teal-500">
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs mt-1 truncate">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40',
      {
        'w-16': isTablet,
        'w-64': isDesktop,
      }
    )}>
      <div className="p-4">
        <div className={cn(
          'flex items-center gap-3 mb-8',
          { 'justify-center': isTablet }
        )}>
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full flex items-center justify-center">
            <Globe className="h-5 w-5 text-white" />
          </div>
          {isDesktop && (
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-1">
              Culture
              <Copyright className="h-3 w-3 text-gray-600" />
            </span>
          )}
        </div>

        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  'w-full justify-start relative',
                  {
                    'px-3': isTablet,
                    'bg-teal-100 text-teal-700': activeSection === item.id,
                  }
                )}
              >
                <Icon className={cn('h-5 w-5', { 'mr-3': isDesktop })} />
                {isDesktop && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-teal-500">{item.badge}</Badge>
                    )}
                  </>
                )}
              </Button>
            );
          })}

          {onLogout && (
            <Button
              variant="ghost"
              onClick={onLogout}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className={cn('h-5 w-5', { 'mr-3': isDesktop })} />
              {isDesktop && 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveNavigation;