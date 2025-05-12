import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountButton from './AccountButton';
import LanguageButton from './LanguageButton';
import ThemeButton from './ThemeButton';

export default function DesktopModal() {
  const translate = useTranslate();
  const ROUTES = useRoutes();
  return (
    <nav className="header__menu-navigation">
      <div className="header__left-side">
        <NavLink className="header__button" to={ROUTES.contests()}>
          {translate('Конкурсы')}
        </NavLink>
        <NavLink className="header__button" to={ROUTES.works()}>
          {translate('Работы')}
        </NavLink>
        <NavLink className="header__button" to={ROUTES.conference()}>
          {translate('Конференция')}
        </NavLink>
        <NavLink className="header__button" to={ROUTES.price()}>
          {translate('Стоимость')}
        </NavLink>
        {/* <NavLink className="header__button" to={ROUTES.tildaOtzovik()}>
          {translate('Отзовик')}
        </NavLink> */}
        {/* <a className="header__button" href="https://rshb.g8.art">
          {translate('РСХБ')}
        </a>
        <NavLink className="header__button" to={ROUTES.tildaStream()}>
          {translate('Трансляции')}
        </NavLink> */}
        <NavLink className="header__link" to={ROUTES.articles()}>
          {translate('Журнал')}
        </NavLink>
        <NavLink className="header__link" to={ROUTES.jury()}>
          {translate('Жюри')}
        </NavLink>
      </div>
      <div className="header__right-side">
        <LanguageButton />
        <ThemeButton />
        <AccountButton isModal />
      </div>
    </nav>
  );
}
