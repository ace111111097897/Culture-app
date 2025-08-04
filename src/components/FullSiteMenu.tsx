import React from 'react';
import { X, LogOut, Bot, Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Home, Search, Heart, Users, MessageSquare, Gamepad2, 
  Calendar, Globe, User, Settings, Shield, MessageCircle, 
  Lightbulb, Star 
} from 'lucide-react';

interface FullSiteMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
}

const FullSiteMenu: React.FC<FullSiteMenuProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
  onLogout
}) => {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'cubbles', label: 'Cubbles', icon: Hexagon, highlight: true },
    { id: 'cubbleton', label: 'CubbletonAI', icon: Bot, highlight: true },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'matches', label: 'Matches', icon: Heart },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Globe },

    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'tips', label: 'Tips', icon: Lightbulb }
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Site Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 ${
                  item.highlight 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700' 
                    : isActive 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            );
          })}
          
          <div className="border-t pt-4 mt-4">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default FullSiteMenu;