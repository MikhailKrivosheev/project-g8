/* eslint-disable react/prop-types */
import classNames from 'classnames';
import Button, { IButtonFilled } from 'Components/UI/Button';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';

export default function BuyTicketButton({
  className,
  insideRef,
}: IButtonFilled) {
  const ROUTES = useRoutes();
  const season = useRecoilValue(seasonAtom);

  const buttonClassNames = classNames('buy-ticket-button', className);

  if (!season?.show_buy_ticket_button) return null;

  return (
    <Button
      className={buttonClassNames}
      color="black"
      arrowColor="white"
      icon="plus"
      insideRef={insideRef}
      link={ROUTES.price()}
    >
      Купить билет
    </Button>
  );
}
