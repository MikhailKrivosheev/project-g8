import classNames from 'classnames';
import G8Logo from 'Icons/G8Logo';
import React from 'react';

interface IPopup {
  children?: React.ReactNode;
  className?: string;
  state: any[];
}

export default function Popup({ children, state, className }: IPopup) {
  const [isPopupOpen, setPopupOpen] = state;

  const popupClassNames = classNames('popup', className);

  if (!isPopupOpen) return null;

  return (
    <div className={popupClassNames}>
      <div className="popup__header">
        <G8Logo />
        <button
          type="button"
          className="popup__close"
          color="transparent"
          onClick={() => setPopupOpen(!isPopupOpen)}
        >
          close popup
        </button>
      </div>
      <div className="popup__content">{children}</div>
    </div>
  );
}
