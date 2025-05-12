import React from 'react';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import GrandPrixNomination, { INominationWorks } from './GrandPrixStage';
import WinnersNomination from './WinnersStage';

export default function ChairmanNomination({
  activeNomination,
  setActiveNomination,
}: INominationWorks) {
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);

  return isGrandPrixStage ? (
    <GrandPrixNomination
      activeNomination={activeNomination}
      setActiveNomination={setActiveNomination}
    />
  ) : (
    <WinnersNomination
      activeNomination={activeNomination}
      setActiveNomination={setActiveNomination}
    />
  );
}
