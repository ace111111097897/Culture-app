import React from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';

interface UniqueLayoutProps {
  children: React.ReactNode;
  withNavigation?: boolean;
}

const UniqueLayout: React.FC<UniqueLayoutProps> = ({ children, withNavigation = false }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <main
      className={cn(
        'min-h-screen transition-all duration-300',
        {
          'pb-24': isMobile && withNavigation, // Space for bottom nav
          'pl-20': isTablet && withNavigation, // Space for tablet sidebar
          'pl-72': isDesktop && withNavigation, // Space for desktop sidebar
        }
      )}
    >
      <div className={cn(
        'p-4 md:p-6 lg:p-8',
        {
          'pt-20': isMobile, // Space for mobile premium button
        }
      )}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-purple-100 p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UniqueLayout;