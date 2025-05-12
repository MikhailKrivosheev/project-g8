import BuyTicketButton from 'Components/BuyTicketButton';
import RequestWorkButton from 'Components/RequestWorkButton';
import useResize from 'Hooks/useResize';
import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';

export default function ModalMenuButton() {
  const { isDesktop } = useResize();
  const season = useRecoilValue(seasonAtom);

  if (isDesktop) {
    return null;
  }

  if (season?.show_request_work_button) {
    return <RequestWorkButton className="home__request-work-button" />;
  }

  if (season?.show_buy_ticket_button) {
    return <BuyTicketButton className="home__request-work-button" />;
  }
  return null;
}
