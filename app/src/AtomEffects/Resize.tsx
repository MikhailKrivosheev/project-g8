import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import resizeAtom from 'Recoil/Atoms/Resize';

const WIDE_THRESHOLD = 1736;
const DESKTOP_THRESHOLD = 1200;
const MOBILE_THRESHOLD = 768;

export default function ResizeEffect() {
  const setResize = useSetRecoilState(resizeAtom);

  useEffect(() => {
    function handleResize() {
      setResize({
        isWide: window.innerWidth >= WIDE_THRESHOLD,
        isDesktop: window.innerWidth >= DESKTOP_THRESHOLD,
        isTablet:
          window.innerWidth < DESKTOP_THRESHOLD &&
          window.innerWidth >= MOBILE_THRESHOLD,
        isPhone: window.innerWidth < MOBILE_THRESHOLD,
        breakpoints: {
          phone: MOBILE_THRESHOLD,
          desktop: DESKTOP_THRESHOLD,
          wide: WIDE_THRESHOLD,
        },
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return null;
}
