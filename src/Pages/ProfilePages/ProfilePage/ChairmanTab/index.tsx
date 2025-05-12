import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import ChairmanNominations from './Nominations';
import ChairmanNomination from './Nomination';

export default function ChairmanTab() {
  const [activeNomination, setActiveNomination] = useState(null);
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);

  return isGrandPrixStage || activeNomination ? (
    <ChairmanNomination
      activeNomination={activeNomination}
      setActiveNomination={setActiveNomination}
    />
  ) : (
    <ChairmanNominations setActiveNomination={setActiveNomination} />
  );
}
