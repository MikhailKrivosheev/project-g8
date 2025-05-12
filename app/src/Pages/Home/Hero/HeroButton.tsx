import BuyTicketButton from 'Components/BuyTicketButton';
import RequestWorkButton from 'Components/RequestWorkButton';
import useObserver from 'Hooks/useIntersectionObserver';
import useResize from 'Hooks/useResize';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ButtonHeader from 'Recoil/Atoms/ButtonHeader';
import seasonAtom from 'Recoil/Atoms/Season';

export default function HeroWorkButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isDesktop } = useResize();
  const season = useRecoilValue(seasonAtom);

  const setVisibilityButtonHeader = useSetRecoilState(ButtonHeader);

  const onIntersection = ([entry]: any) => {
    setVisibilityButtonHeader(entry.isIntersecting);
  };

  const { setObservable, destroyObservable } = useObserver({
    callback: onIntersection,
  });

  useEffect(() => {
    if (isDesktop) {
      setObservable(buttonRef.current);
    }
    return () => {
      if (isDesktop) {
        destroyObservable();
      }
    };
  }, []);

  if (!isDesktop) return null;

  if (season?.show_request_work_button) {
    return <RequestWorkButton insideRef={buttonRef} />;
  }

  if (season?.show_buy_ticket_button) {
    return <BuyTicketButton insideRef={buttonRef} />;
  }
  return null;
}
