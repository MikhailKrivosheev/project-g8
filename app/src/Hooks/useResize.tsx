import { useEffect, useMemo, useState } from 'react';

const WIDE_THRESHOLD = 1736;
const DESKTOP_THRESHOLD = 1200;
const MOBILE_THRESHOLD = 768;

export default function useResize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const sizes = useMemo(
    () => ({
      isWide: windowSize.width >= WIDE_THRESHOLD,
      isDesktop: windowSize.width >= DESKTOP_THRESHOLD,
      isTablet:
        windowSize.width < DESKTOP_THRESHOLD &&
        windowSize.width >= MOBILE_THRESHOLD,
      isPhone: windowSize.width < MOBILE_THRESHOLD,
      breakpoints: {
        phone: MOBILE_THRESHOLD,
        desktop: DESKTOP_THRESHOLD,
        wide: WIDE_THRESHOLD,
      },
      windowWidth: windowSize.width,
      windowHeight: windowSize.height,
    }),
    [windowSize]
  );

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return sizes;
}
