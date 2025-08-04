import React from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Search, 
  Heart, 
  Users, 
  MessageSquare, 
  Gamepad2, 
  Calendar, 
  Globe, 
  User,
  Settings,
  Shield,
  MessageCircle,
  Lightbulb,
  Star
} from 'lucide-react';

interface ReformedLayoutProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
}

const ReformedLayout: React.FC<ReformedLayoutProps> = ({
  activeSection,
  onSectionChange,
  children
}) => {
  const { isMobile } = useResponsive();

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'matches', label: 'Matches', icon: Heart },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'explore', label: 'Explore', icon: Globe },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'safety', label: 'Safety', icon: Shield },
    { id: 'feedback', label: 'Feedback', icon: MessageCircle },
    { id: 'tips', label: 'Tips', icon: Lightbulb }
  ];

  const NavButton = ({ item }: { item: any }) => {
    const IconComponent = item.icon;
    const isActive = activeSection === item.id;
    
    return (
      <Button
        key={item.id}
        onClick={() => onSectionChange(item.id)}
        variant={isActive ? 'default' : 'ghost'}
        className={`w-full justify-start gap-3 ${isActive 
          ? 'bg-purple-600 text-white hover:bg-purple-700' 
          : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
        }`}
      >
        <IconComponent className="h-5 w-5" />
        <span className={isMobile ? 'hidden' : 'block'}>{item.label}</span>
      </Button>
    );
  };

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4">
          {children}
        </main>
        <nav className="bg-white border-t border-gray-200 p-2">
          <div className="flex justify-around">
            {navigationItems.slice(0, 5).map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>
        </nav>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-white border-r border-gray-200 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavButton key={item.id} item={item} />
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ReformedLayout;