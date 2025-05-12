import Description from 'Components/UI/Description';
import useTranslate from 'Hooks/useTranslate';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';
import { get as getCookie, write as writeCookie } from 'Utilities/cookie';

export default function Cookies() {
  const [visible, setVisible] = useState(!getCookie('COOKIE_APPLY'));
  const lang = useRecoilValue(LangAtom);
  const translate = useTranslate();

  const handleClick = () => {
    writeCookie({
      name: 'COOKIE_APPLY',
      value: true,
    });
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookies">
      <div className="cookies__holder">
        <Description className="cookies__description">
          {translate('Мы используем ')}
          {translate('файлы cookie')}
          {translate(', чтобы вам было удобнее, а вы даете')}{' '}
          <a
            href="https://g8.art/storage/docs/CookiesPolicy.pdf"
            target="_blank"
            className="cookies__link"
            rel="noreferrer"
          >
            {translate('согласие')}
          </a>
        </Description>

        <button type="button" className="cookies__button" onClick={handleClick}>
          Ок
        </button>
      </div>
    </div>
  );
}
