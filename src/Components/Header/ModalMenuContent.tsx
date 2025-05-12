import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import ModalMenuButton from 'Pages/Home/ModalMenuButton';
import React from 'react';
import { Link } from 'react-router-dom';
import AccountButton from './AccountButton';
import LanguageButton from './LanguageButton';
import ThemeButton from './ThemeButton';

export default function ModalMenuContent(setOpen: any) {
  const ROUTES = useRoutes();
  const translate = useTranslate();
  const { isDesktop } = useResize();

  return (
    <div className="header__menu">
      <div className="header__menu-header">
        <LanguageButton />
        <ThemeButton />
        <AccountButton isModal />
      </div>
      <nav className="header__menu-navigation">
        {!isDesktop && (
          <>
            <Link
              className="header__link"
              onClick={() => {
                setOpen(false);
              }}
              to={ROUTES.contests()}
            >
              {translate('Конкурсы')}
            </Link>
            <Link
              className="header__link"
              onClick={() => {
                setOpen(false);
              }}
              to={ROUTES.works()}
            >
              {translate('Работы')}
            </Link>
            <Link
              className="header__link"
              onClick={() => {
                setOpen(false);
              }}
              to={ROUTES.conference()}
            >
              {translate('Конференция')}
            </Link>
            <Link
              className="header__link"
              onClick={() => {
                setOpen(false);
              }}
              to={ROUTES.price()}
            >
              {translate('Стоимость')}
            </Link>
            {/* <Link className="header__link" to={ROUTES.tildaOtzovik()}>
              {translate('Отзовик')}
            </Link> */}
            {/* <a className="header__link" href="https://rshb.g8.art">
              {translate('РСХБ')}
            </a>
            <Link className="header__link" to={ROUTES.tildaStream()}>
              {translate('Трансляции')}
            </Link> */}
          </>
        )}
        <Link className="header__link" to={ROUTES.albums()}>
          {translate('Галерея')}
        </Link>
        <Link className="header__link" to={ROUTES.jury()}>
          {translate('Жюри')}
        </Link>
      </nav>
      <ul className="header__socials">
        <li className="header__social">
          <a
            href="https://vk.com/ggggggggfest"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate('Вк')}
          </a>
        </li>
        <li className="header__social">
          <a
            href="https://t.me/ggggggggfest"
            target="_blank"
            rel="noopener noreferrer"
          >
            {translate('Тг')}
          </a>
        </li>
      </ul>
      <ModalMenuButton />
    </div>
  );
}
