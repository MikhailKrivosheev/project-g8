import React, { useState } from 'react';
import useResize from 'Hooks/useResize';
import ModalComponent from 'Components/UI/Modal';

interface ITooltipWhite {
  children: React.ReactNode;
  setOpen: any;
  modalOpen: boolean;
}

export default function TooltipWhite({ children, state }: ITooltipWhite) {
  const [, setModal] = state;
  const { isDesktop } = useResize();

  return isDesktop ? (
    <div className="tooltip__content">
      <button
        className="tooltip__close"
        type="button"
        onClick={() => setModal(false)}
      >
        close
      </button>
      <div className="tooltip__content-inner">{children}</div>
    </div>
  ) : (
    <ModalComponent state={state} isTooltip>
      <>
        <button
          className="tooltip__close"
          type="button"
          onClick={() => setModal(false)}
        >
          close
        </button>
        {children}
      </>
    </ModalComponent>
  );
}
