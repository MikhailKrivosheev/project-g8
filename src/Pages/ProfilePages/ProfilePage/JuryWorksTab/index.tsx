import React, { useState } from 'react';
import { INomination } from 'Types';
import { useRecoilValue } from 'recoil';
import contestSeasonSelector from 'Recoil/Selectors/ContestSeason';
import NominationWorks from './NominationWorks';
import AllWorks from './AllWorks';

export default function JuryWorksTab() {
  const [activeNomination, setActiveNomination] = useState<INomination | null>(
    null
  );
  const { isGrandPrixStage } = useRecoilValue(contestSeasonSelector);

  return isGrandPrixStage || activeNomination ? (
    <NominationWorks
      activeNomination={activeNomination}
      setActiveNomination={setActiveNomination}
    />
  ) : (
    <AllWorks setActiveNomination={setActiveNomination} />
  );
}
