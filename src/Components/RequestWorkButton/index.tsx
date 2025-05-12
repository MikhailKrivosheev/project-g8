import Button, { IButtonFilled } from 'Components/UI/Button';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { useRecoilValue } from 'recoil';
import seasonAtom from 'Recoil/Atoms/Season';

export default function RequestWorkButton({
  insideRef,
  onClick,
  className,
}: IButtonFilled) {
  const season = useRecoilValue(seasonAtom);
  const ROUTES = useRoutes();

  if (!season?.show_request_work_button || season?.status === 'finished') {
    return null;
  }

  return (
    <Button
      insideRef={insideRef}
      link={ROUTES.workCreate()}
      color="black"
      arrowColor="white"
      onClick={onClick}
      icon="star"
      className={className}
    >
      Подать работу
    </Button>
  );
}
