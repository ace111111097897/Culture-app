import * as React from "react"

export function useResponsive() {
  const [screenSize, setScreenSize] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    width: number;
  }>({ isMobile: false, isTablet: false, isDesktop: true, width: 1024 });

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width
      });
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return screenSize;
}