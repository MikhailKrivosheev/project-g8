/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import cn from 'classnames';
import ModalComponent from 'Components/UI/Modal';
import useResize from 'Hooks/useResize';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import LogoIcon from 'Icons/Logo';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ButtonHeader from 'Recoil/Atoms/ButtonHeader';
import getLang from 'Utilities/lang';
import LogoIconEn from '../../../public/Images/logo.svg';
import AccountButton from './AccountButton';
import DesktopModal from './DesktopModal';
import LanguageButton from './LanguageButton';
import ModalMenuContent from './ModalMenuContent';
// import RequestWorkButton from './RequestWorkButton';
import ThemeButton from './ThemeButton';

export default function Header() {
  const translate = useTranslate();
  const ROUTES = useRoutes();
  const location = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);
  // const [isSelectOpened, setIsSelectOpened] = useState(false);
  const { isDesktop } = useResize();
  const heroButtonIsVisible = useRecoilValue(ButtonHeader);
  const match = useMatch(ROUTES.home());
  const language = getLang();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (heroButtonIsVisible) {
      setMenuOpen(false);
    }
  }, [heroButtonIsVisible]);

  const restoreScroll = () => {
    window.scrollTo(0, 0);
  };

  const buttonWrapperClassNames = cn('header__button-wrapper', {
    'header__button-wrapper--hide': isMenuOpen,
  });

  const menuButtonClassNames = cn('header__menu-button', {
    'header__menu-button--open': isMenuOpen,
  });

  if (location.pathname.split('/').filter(Boolean).pop() === 'otzovik')
    return null;

  return (
    <header className="header">
      <div className="header__left-side">
        <NavLink to={ROUTES.home()} onClick={restoreScroll}>
          {language === 'ru' ? (
            <LogoIcon className="header__logo" />
          ) : (
            <img src={LogoIconEn} alt="logo" className="header__logo" />
          )}
        </NavLink>
        {isDesktop && (
          <>
            {/* <RequestWorkButton /> */}
            <div className={buttonWrapperClassNames}>
              <NavLink className="header__button" to={ROUTES.contests()}>
                {translate('G8 Creative Awards')}
              </NavLink>

              {/* <NavLink className="header__link" to={ROUTES.articles()}>
                  {translate('Журнал')}
                </NavLink> */}

              <NavLink className="header__button" to={ROUTES.works()}>
                {translate('Работы')}
              </NavLink>
              <NavLink className="header__button" to={ROUTES.conference()}>
                {translate('Конференция')}
              </NavLink>
              <NavLink className="header__button" to={ROUTES.price()}>
                {translate('Стоимость')}
              </NavLink>
              {!match && (
                <>
                  <NavLink
                    className="header__button header__button--journal"
                    to={ROUTES.articles()}
                  >
                    {translate('Журнал')}
                  </NavLink>
                  <NavLink
                    className="header__button header__button--jury"
                    to={ROUTES.jury()}
                  >
                    {translate('Жюри')}
                  </NavLink>
                </>
              )}
              {/* <a className="header__button" href="https://rshb.g8.art">
                {translate('РСХБ')}
              </a>
              <NavLink className="header__button" to={ROUTES.tildaStream()}>
                {translate('Трансляции')}
              </NavLink> */}
              {/* <div className="header__button-holder">
                <div className="header__button header__button-select">...</div>
                <div className="header__links-holder">
                  <NavLink
                    className="header__link header__link--select"
                    to={ROUTES.articles()}
                  >
                    {translate('Журнал')}
                  </NavLink>
                  <NavLink
                    className="header__link header__link--select"
                    to={ROUTES.jury()}
                  >
                    {translate('Жюри')}
                  </NavLink>
                </div>
              </div> */}
            </div>
          </>
        )}
      </div>
      <div className="header__right-side">
        {isDesktop && heroButtonIsVisible && match && (
          <>
            <NavLink
              className="header__button header__button--journal"
              to={ROUTES.articles()}
            >
              {translate('Журнал')}
            </NavLink>
            <NavLink
              className="header__button header__button--jury"
              to={ROUTES.jury()}
            >
              {translate('Жюри')}
            </NavLink>
            <LanguageButton />
            <ThemeButton />
          </>
        )}
        {(!isDesktop || !heroButtonIsVisible || !match) && (
          <button
            type="button"
            className={menuButtonClassNames}
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <span />
          </button>
        )}
        {isDesktop && heroButtonIsVisible && match && <AccountButton />}
      </div>
      <ModalComponent isMenu state={[isMenuOpen, setMenuOpen]}>
        {isDesktop ? (
          <DesktopModal />
        ) : (
          <ModalMenuContent setOpen={setMenuOpen} />
        )}
      </ModalComponent>
    </header>
  );
}
