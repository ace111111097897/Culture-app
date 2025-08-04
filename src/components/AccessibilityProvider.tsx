import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'normal' | 'large' | 'xl';
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

interface AccessibilityProviderProps {
  children: React.ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for user's motion preferences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply accessibility classes to document
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    root.classList.remove('font-normal', 'font-large', 'font-xl');
    root.classList.add(`font-${fontSize}`);

    if (reducedMotion) {
      root.classList.add('reduce-motion');
    }
  }, [highContrast, fontSize, reducedMotion]);

  const toggleHighContrast = () => setHighContrast(!highContrast);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        reducedMotion,
        fontSize,
        toggleHighContrast,
        setFontSize
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};