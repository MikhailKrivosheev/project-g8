/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import cn from 'classnames';
import useResize from 'Hooks/useResize';
import ErrorBoundary from 'Components/ErrorBoundary';

Modal.setAppElement('body');

const { body } = document;

// TODO write state and onClise correctly

interface IModalComponent {
  state: [boolean, any];
  children?: React.ReactNode;
  className?: string;
  isMenu?: boolean;
  isTooltip?: boolean;
  contentClassName?: string;
}

export default function ModalComponent({
  state,
  children,
  isMenu,
  className,
  contentClassName,
  isTooltip,
}: IModalComponent) {
  const [isOpen, setOpen] = state;
  const firstMount = useRef(true);
  const { isDesktop } = useResize();

  useEffect(() => {
    firstMount.current = false;
    return () => {
      firstMount.current = true;
    };
  }, []);

  useEffect(() => {
    if (isOpen && (!isMenu || !isDesktop)) {
      body.classList.add('body--stuck');
    } else {
      body.classList.remove('body--stuck');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const onAfterClose = () => {
    document.body.classList.remove('body--stuck');
  };

  const modalHolderClassNames = cn('modal', {
    'modal--menu': isMenu,
    'modal--tooltip': isTooltip,
  });
  const modalClassName = cn(className, 'modal__content');
  const contentClassNames = cn('modal__inner-content', contentClassName);

  return (
    <ErrorBoundary>
      <Modal
        bodyOpenClassName="body--stuck"
        portalClassName={modalHolderClassNames}
        onAfterClose={onAfterClose}
        className={modalClassName}
        overlayClassName="modal__overlay"
        onRequestClose={() => {
          setOpen(false);
        }}
        isOpen={isOpen}
      >
        <div className={contentClassNames}>{children}</div>
        {/* {!isMenu && (
        <button
          className="modal__close"
          type="button"
          onClick={() => setOpen(false)}
        >
          close
        </button>
      )} */}
      </Modal>
    </ErrorBoundary>
  );
}
