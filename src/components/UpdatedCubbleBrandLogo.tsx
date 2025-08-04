import React from 'react';
import { Users, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  onClick?: () => void;
}

export default function UpdatedCubbleBrandLogo({ size = 'md', showText = true, onClick }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div 
      className={`flex items-center gap-3 ${onClick || true ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {/* Original bubble design */}
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-teal-500 via-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg`}>
          <Users className="w-1/2 h-1/2 text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-1/4 h-1/4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-md"></div>
        <Sparkles className="absolute -bottom-1 -left-1 w-1/3 h-1/3 text-teal-400" />
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 bg-clip-text text-transparent ${textSizes[size]}`}>
            Cubble
          </h1>
          {size === 'lg' || size === 'xl' ? (
            <p className="text-sm text-gray-600 -mt-1">Cultural Connections</p>
          ) : null}
        </div>
      )}
    </div>
  );
}

export { UpdatedCubbleBrandLogo };