import React from 'react';
import Button from 'Components/UI/Button';
import useRoutes from 'Hooks/useRoutes';

export default function LonglistButton({ workCount }: any) {
  const ROUTES = useRoutes();
  return (
    <Button
      color="gray"
      link={ROUTES.work(workCount?.work_longlist_random_id)}
      className={`works-jury__link ${
        !workCount?.work_longlist_random_id && 'button--disabled'
      }`}
    >
      {workCount?.work_longlist_random_id
        ? `Оценить работы`
        : 'Все работы оценены'}
    </Button>
  );
}
