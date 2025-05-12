import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';

interface ILangs {
  ru: string;
  en: string;
}

type TLangAtom = 'ru' | 'en';

const LANGS: ILangs = {
  ru: 'En',
  en: 'Ру',
};

export default function LanguageButton() {
  const [lang, setLang] = useRecoilState<TLangAtom>(LangAtom);

  const onButtonClick = () => {
    setLang((prev: string) => (prev === 'ru' ? 'en' : 'ru'));
  };

  return (
    <button
      type="button"
      className="header__button header__button--lang"
      onClick={onButtonClick}
    >
      {LANGS[lang]}
    </button>
  );
}
