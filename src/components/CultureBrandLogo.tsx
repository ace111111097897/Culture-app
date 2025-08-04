import React from 'react';

interface CultureBrandLogoProps {
  onClick?: () => void;
  className?: string;
}

const CultureBrandLogo: React.FC<CultureBrandLogoProps> = ({ onClick, className = '' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${className}`}
      onClick={handleClick}
    >
      {/* Updated Culture Logo - Matching Cubble Style */}
      <div className="relative">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl transform rotate-12 shadow-lg">
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
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
      </div>
      
      {/* Brand Name */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Culture
          </h1>
          <span className="text-xs text-gray-500 font-medium">™</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <span>®</span>
          <span className="font-medium">2024</span>
        </div>
      </div>
    </div>
  );
};

export default CultureBrandLogo;