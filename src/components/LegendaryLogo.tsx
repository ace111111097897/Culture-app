import React from 'react';
import { Sparkles, Zap, Star } from 'lucide-react';

interface LegendaryLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  animated?: boolean;
}

const LegendaryLogo: React.FC<LegendaryLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  animated = true 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${sizeClasses[size]} ${animated ? 'animate-pulse' : ''}`}>
        {/* Updated logo with hexagonal pattern */}
        <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl transform rotate-12 shadow-lg">
          <div className="absolute inset-1 bg-gradient-to-tr from-white/20 to-transparent rounded-lg">
            <div className="w-full h-full flex items-center justify-center">
              <div className="grid grid-cols-2 gap-0.5 w-3/4 h-3/4">
                <div className="bg-white/40 rounded-sm"></div>
                <div className="bg-white/60 rounded-sm"></div>
                <div className="bg-white/60 rounded-sm"></div>
                <div className="bg-white/40 rounded-sm"></div>
              </div>
            </div>
          </div>
        </div>
        {/* Floating elements */}
        {animated && (
          <>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-300"></div>
          </>
        )}
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent ${textSizes[size]}`}>
            Culture
          </span>
          <span className="text-xs text-gray-500 -mt-1">Connect • Create • Celebrate</span>
        </div>
      )}
    </div>
  );
};

export default LegendaryLogo;