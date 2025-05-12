import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { set } from 'Utilities/localStorage';
import LangAtom from 'Recoil/Atoms/Lang';
import { useLocation } from 'react-router-dom';
import getLang from 'Utilities/lang';

const languages = ['ru', 'en'];

export default function LangEffect() {
  const lang = useRecoilValue(LangAtom);
  const location = useLocation();

  useEffect(() => {
    if (!languages.includes(lang)) {
      set('lang', 'ru');
      document.documentElement.lang = 'ru';
    } else {
      set('lang', lang || getLang());
      document.documentElement.lang = lang || getLang();
    }
  }, [location, lang]);

  return null;
}
