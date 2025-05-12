import cn from 'classnames';
import useResize from 'Hooks/useResize';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { useRecoilValue } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';
import seasonAtom from 'Recoil/Atoms/Season';
import FooterLink from './FooterLink';

const YEARS = [
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
];

export default function Footer() {
  const location = useLocation();
  const { isDesktop } = useResize();
  const lang = useRecoilValue(LangAtom);
  const translate = useTranslate();
  const SeasonCurrent = useRecoilValue(seasonAtom);

  const footerClassname = cn('footer', {
    'footer--account-page': location.pathname.includes('/account'),
  });

  const handleYearChange = ({ value: year }) => {
    if (year) {
      const url = `https://${year}.ggggggggfest.com/ru`;
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.click();
    }
  };

  if (location.pathname.split('/').filter(Boolean).pop() === 'otzovik')
    return null;

  return (
    <footer className={footerClassname}>
      <div className="footer__left-side">
        <span className="footer__year">© REDKEDS 2025</span>

        <ul className="footer__links">
          <li className="footer__links-item">
            {SeasonCurrent && (
              <FooterLink
                pdf={SeasonCurrent?.short_rules_url || SeasonCurrent?.rules_url}
              >
                Правила
              </FooterLink>
            )}
          </li>
          <li className="footer__links-item">
            <FooterLink pdf="https://g8.art/storage/docs/PrivacyPolicy.pdf">
              {translate('Политика в отношении обработки персональных данных')}
            </FooterLink>
          </li>
          <li className="footer__links-item">
            <FooterLink pdf="https://g8.art/storage/docs/TermsOfUse.pdf">
              {translate('Пользовательское соглашение')}
            </FooterLink>
          </li>
          <li className="footer__links-item">
            {SeasonCurrent && (
              <FooterLink
                pdf={
                  SeasonCurrent?.short_guidebook_url ||
                  SeasonCurrent?.guidebook_url
                }
              >
                Гайдбук
              </FooterLink>
            )}
          </li>
          <li className="footer__links-item">
            <a href="mailto:info@g8.art" className="footer__link">
              info@g8.art
            </a>
          </li>
          {!isDesktop && (
            <>
              <li className="footer__links-item">
                <a
                  href="https://www.redkeds.com/"
                  target="_blank"
                  className="footer__link"
                  rel="noreferrer"
                >
                  {translate('Проект REDKEDS')}
                </a>
              </li>
              <li className="footer__links-item">
                <a
                  href={
                    lang === 'ru'
                      ? 'https://ruport.ru'
                      : 'https://ruportagency.com/'
                  }
                  target="_blank"
                  className="footer__link"
                  rel="noreferrer"
                >
                  {translate('Сделано в Ruport')}
                </a>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="footer__center-side">
        <span className="footer__archive">
          {translate('Архив g8.art 2017-2021')}
        </span>
        <Select
          value=""
          className="footer__year-select"
          classNamePrefix="footer-select"
          options={YEARS}
          onChange={handleYearChange}
          placeholder={translate('Предыдущие года')}
        />
      </div>

      {isDesktop && (
        <div className="footer__right-side">
          <ul className="footer__links">
            <li className="footer__links-item">
              <a
                href="https://www.redkeds.com/"
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                {translate('Проект REDKEDS')}
              </a>
            </li>
            <li className="footer__links-item">
              <a
                href={
                  lang === 'ru'
                    ? 'https://ruport.ru'
                    : 'https://ruportagency.com/'
                }
                target="_blank"
                className="footer__link"
                rel="noreferrer"
              >
                {translate('Сделано в Ruport')}
              </a>
            </li>
          </ul>
          <ul className="footer__socials">
            <li className="footer__social">
              <a
                href="https://vk.com/ggggggggfest"
                target="_blank"
                rel="noreferrer"
              >
                {translate('Вк')}
              </a>
            </li>
            <li className="footer__social">
              <a
                href="https://t.me/ggggggggfest"
                target="_blank"
                rel="noreferrer"
              >
                {translate('Тг')}
              </a>
            </li>
          </ul>
        </div>
      )}
    </footer>
  );
}
