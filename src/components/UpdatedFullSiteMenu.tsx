import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Link
} from 'lucide-react';

interface UpdatedFullSiteMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
  notificationCount?: number;
}

const UpdatedFullSiteMenu: React.FC<UpdatedFullSiteMenuProps> = ({
  activeSection,
  onSectionChange,
  isMobile = false,
  notificationCount = 0
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'matches', label: 'Matches', icon: Users },
    { id: 'connections', label: 'Connections', icon: Link },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'ai', label: 'Cubbleton AI', icon: Bot },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: notificationCount },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'premium', label: 'Premium', icon: Crown }
  ];

  if (isMobile) {
    return (
      <div className="flex justify-around items-center py-2">
        {menuItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center gap-1 p-2 relative ${
                isActive 
                  ? 'text-teal-600 bg-teal-50' 
                  : 'text-gray-600 hover:text-teal-600 hover:bg-teal-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500 text-white">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <Button
            key={item.id}
            variant="ghost"
            onClick={() => onSectionChange(item.id)}
            className={`w-full justify-start gap-3 p-3 relative ${
              isActive 
                ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-600 border-r-2 border-teal-500' 
                : 'text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 hover:text-teal-600'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
            {item.badge && item.badge > 0 && (
              <Badge className="ml-auto bg-red-500 text-white">
                {item.badge}
              </Badge>
            )}
          </Button>
        );
      })}
    </div>
  );
};

export default UpdatedFullSiteMenu;