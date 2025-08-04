import React from 'react';

interface CubbleBrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  onClick?: () => void;
}

const CubbleBrandLogo: React.FC<CubbleBrandLogoProps> = ({ 
  size = 'md', 
  className = '',
  showText = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      <div className={`${sizeClasses[size]} relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5EEAD4" />
              <stop offset="100%" stopColor="#DDD6FE" />
            </linearGradient>
            <linearGradient id="cGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="94" height="94" rx="18" ry="18" 
                fill="url(#borderGradient)" stroke="none" />
          <rect x="8" y="8" width="84" height="84" rx="14" ry="14" 
                fill="url(#bgGradient)" />
          <path d="M 62 28 C 68 28, 72 32, 72 38 C 72 42, 70 45, 67 46 L 67 54 C 70 55, 72 58, 72 62 C 72 68, 68 72, 62 72 L 42 72 C 36 72, 32 68, 32 62 L 32 38 C 32 32, 36 28, 42 28 L 62 28 Z M 42 36 C 40 36, 38 38, 38 40 L 38 60 C 38 62, 40 64, 42 64 L 58 64 C 60 64, 62 62, 62 60 L 62 56 L 50 56 L 50 44 L 62 44 L 62 40 C 62 38, 60 36, 58 36 L 42 36 Z"
                fill="url(#cGradient)" />
          <rect x="65" y="32" width="4" height="8" rx="2" fill="#7C3AED" />
          <rect x="65" y="60" width="4" height="8" rx="2" fill="#7C3AED" />
        </svg>
      </div>
      {showText && (
        <span className={`font-bold ${textSizes[size]} bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent`}>
          Cubble
        </span>
      )}
    </div>
  );
};

export default CubbleBrandLogo;