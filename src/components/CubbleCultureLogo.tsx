import React from 'react';
import { Heart, Globe, Users, Sparkles } from 'lucide-react';

interface CubbleCultureLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

const CubbleCultureLogo: React.FC<CubbleCultureLogoProps> = ({ 
  onClick, 
  size = 'md',
  showTagline = false 
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
      onClick={onClick}
    >
      <div className="relative">
        {/* Main culture bubble cluster */}
        <div className="relative w-16 h-12 flex items-center justify-center">
          {/* Central bubble */}
          <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg z-10">
            <Heart className="h-4 w-4 text-white" />
          </div>
          {/* Surrounding culture bubbles */}
          <div className="absolute -top-1 -left-2 w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center opacity-80">
            <Globe className="h-2.5 w-2.5 text-white" />
          </div>
          <div className="absolute -top-1 -right-2 w-5 h-5 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center opacity-80">
            <Users className="h-2.5 w-2.5 text-white" />
          </div>
          <div className="absolute -bottom-1 left-0 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full opacity-60"></div>
          <div className="absolute -bottom-1 right-0 w-4 h-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full opacity-60"></div>
        </div>
        {/* Connection lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-8 border border-emerald-300/30 rounded-full"></div>
        </div>
        {/* Floating sparkles */}
        <Sparkles className="absolute -top-2 right-1 h-3 w-3 text-emerald-400 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <h1 className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-teal-600 via-emerald-600 to-green-700 bg-clip-text text-transparent tracking-tight`}>
          Cubble
        </h1>
        {showTagline && (
          <p className="text-xs text-emerald-600 font-medium -mt-1">Cultural Bubbles • Connect</p>
        )}
      </div>
    </div>
  );
};

export default CubbleCultureLogo;