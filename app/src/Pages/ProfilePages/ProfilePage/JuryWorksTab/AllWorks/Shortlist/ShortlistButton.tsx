import Button from 'Components/UI/Button';
import useRoutes from 'Hooks/useRoutes';
import React, { useRef } from 'react';

export default function ShortlistButton({ workCount }: any) {
  const ROUTES = useRoutes();
  const { current: worksVoteCount } = useRef(
    workCount?.work_shortlist_count - workCount?.work_shortlist_voting_count
  );

  return (
    <Button
      color="gray"
      link={ROUTES.work(workCount?.work_shortlist_random_id)}
      className={`works-jury__link ${
        worksVoteCount <= 0 && 'button--disabled'
      }`}
    >
      {worksVoteCount > 0 ? `Оценить работы` : 'Все работы оценены'}
    </Button>
  );
}
