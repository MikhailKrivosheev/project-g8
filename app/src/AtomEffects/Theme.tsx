import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { set } from 'Utilities/localStorage';
import ThemeAtom from 'Recoil/Atoms/Theme';

const html = document.documentElement;

const blackColor = '#201f1e';
const whiteColor = '#fcfaf8';

export default function ThemeEffect() {
  const theme = useRecoilValue(ThemeAtom);
  const firstMount = useRef(true);

  useEffect(() => {
    if (theme === 'light') {
      html.style.setProperty('--primary-color', whiteColor);
      html.style.setProperty('--secondary-color', blackColor);
      document.body.classList.remove('body--dark');
    } else {
      html.style.setProperty('--primary-color', blackColor);
      html.style.setProperty('--secondary-color', whiteColor);
      document.body.classList.add('body--dark');
    }
    set('theme', theme);
  }, [theme]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return null;
}
