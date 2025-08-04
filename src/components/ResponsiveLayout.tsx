import React from 'react';
import { useResponsive } from '@/hooks/use-responsive';
import { cn } from '@/lib/utils';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
  withNavigation?: boolean;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  className,
  withNavigation = true 
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50',
      {
        // Mobile layout
        'pb-20': isMobile && withNavigation,
        'px-4 py-4': isMobile,
        
        // Tablet layout
        'px-6 py-6': isTablet,
        'pl-20 pb-6': isTablet && withNavigation,
        
        // Desktop layout
        'px-8 py-8': isDesktop,
        'pl-72 pr-8': isDesktop && withNavigation,
      },
      className
    )}>
      <div className={cn(
        'mx-auto',
        {
          'max-w-full': isMobile,
          'max-w-4xl': isTablet,
          'max-w-7xl': isDesktop,
        }
      )}>
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout;