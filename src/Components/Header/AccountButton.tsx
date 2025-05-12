/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import useRoutes from 'Hooks/useRoutes';
import useUserActions from 'Hooks/useUserActions';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import useTranslate from 'Hooks/useTranslate';
import LazyLoad from 'Components/LazyLoad';

export default function AccountButton({ isModal }: { isModal?: boolean }) {
  const user = useRecoilValue(userAtom);
  const { signOut } = useUserActions();
  const ROUTES = useRoutes();
  const translate = useTranslate();

  const headerAccountClassNames = classNames('header__account', {
    'header__account--wide': isModal && user?.logged,
  });

  return (
    <Link
      to={user.logged ? ROUTES.account() : ROUTES.signIn()}
      className={headerAccountClassNames}
    >
      {user?.image_url ? (
        <LazyLoad
          className="header__account-image"
          src={user?.image_url}
          alt="accountImage"
        />
      ) : (
        <div className="header__account-holder">
          <svg
            width="10"
            height="11"
            xmlns="http://www.w3.org/2000/svg"
            className="header__account-icon"
          >
            <circle cx="5" cy="2" r="2" />
            <path d="M5 6A5.001 5.001 0 0 0 .393 9.053C-.037 10.07.895 11 2 11h6c1.105 0 2.037-.93 1.607-1.947A5.001 5.001 0 0 0 5 6Z" />
          </svg>
        </div>
      )}
      {isModal && user?.logged && (
        <span className="header__account-text" onClick={signOut}>
          {translate('Выйти')}
        </span>
      )}
    </Link>
  );
}
