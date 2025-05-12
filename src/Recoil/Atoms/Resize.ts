import { atom } from 'recoil';

interface IBreakpoints {
  phone: number;
  desktop: number;
  wide: number;
}

interface IResizeAtom {
  isWide: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isPhone: boolean;
  breakpoints: IBreakpoints;
  windowWidth: number;
  windowHeight: number;
}

const resizeAtom = atom({
  key: 'resizeAtom',
  default: {} as IResizeAtom,
});

export default resizeAtom;
