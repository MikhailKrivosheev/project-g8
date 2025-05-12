import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import AsyncSelect from 'Pages/Works/Filter/NominationSelect/AsyncSelect';

export default function WorkNomination({
  seasonName,
  contestName,
  asyncSelectName,
}) {
  const [currentSeason, setCurrentSeason] = useState();
  const [currentContest, setCurrentContest] = useState();
  const [currentNomination, setCurrentNomination] = useState();

  const { watch } = useFormContext();

  const currentSeasonWatcher = watch(seasonName);
  const currentContestWatcher = watch(contestName);

  useEffect(() => {
    setCurrentSeason(currentSeasonWatcher);
  }, [currentSeasonWatcher]);

  useEffect(() => {
    setCurrentContest(currentContestWatcher);
  }, [currentContestWatcher]);

  return (
    <Grid item xs={4}>
      <AsyncSelect
        selectName={asyncSelectName}
        label="Номинация поданной работы"
        currentSeason={currentSeason || null}
        currentContest={currentContest || null}
        currentNomination={currentNomination}
        onChangeSelect={(nomination) => setCurrentNomination(nomination)}
      />
    </Grid>
  );
}
