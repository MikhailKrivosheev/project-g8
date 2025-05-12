import cn from 'classnames';
import React from 'react';
import useRoutes from 'Hooks/useRoutes';
import { useMatch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ButtonHeader from 'Recoil/Atoms/ButtonHeader';
import RequestWorkButton from 'Components/RequestWorkButton';
import seasonAtom from 'Recoil/Atoms/Season';
import BuyTicketButton from 'Components/BuyTicketButton';

export default function WorkHeaderButton() {
  const heroButtonIsVisible = useRecoilValue(ButtonHeader);
  const season = useRecoilValue(seasonAtom);
  const ROUTES = useRoutes();
  const match = useMatch(ROUTES.home());

  const submissionButtonClassNames = cn('header__button-submission', {
    'header__button-submission--shown': !heroButtonIsVisible || !match,
  });

  if (season?.show_buy_ticket_button) {
    return <BuyTicketButton className={submissionButtonClassNames} />;
  }
  if (season?.show_request_work_button) {
    return <RequestWorkButton className={submissionButtonClassNames} />;
  }
  return null;
}
