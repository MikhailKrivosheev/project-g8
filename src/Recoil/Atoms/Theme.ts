import { atom } from 'recoil';
import { get } from 'Utilities/localStorage';

const ThemeAtom = atom({
  key: 'themeAtom',
  default: get('theme') || 'light',
});

export default ThemeAtom;
