import { IWorkCounterAtom } from 'Recoil/Atoms/WorksCounter';
import React from 'react';

interface IWinnersCounter {
  workCount: IWorkCounterAtom;
}

const getCount = (winnersCount?: number, grandPrixCount?: number) =>
  typeof winnersCount === 'number' ? winnersCount : grandPrixCount;

export default function WinnersCounter({ workCount }: IWinnersCounter) {
  return (
    <>
      <span className="popup-rate__number-rated">
        {getCount(
          workCount?.work_winners_voting_count,
          workCount?.work_grandprix_voting_count
        )}
      </span>
      /
      {getCount(workCount?.work_winners_count, workCount?.work_grandprix_count)}
    </>
  );
}
