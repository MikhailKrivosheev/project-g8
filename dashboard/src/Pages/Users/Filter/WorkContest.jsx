import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import AsyncSelect from 'Pages/Works/Filter/ContestSelect/AsyncSelect';

export default function WorkContest({ seasonName, asyncSelectName }) {
  const [currentSeason, setCurrentSeason] = useState();
  const [currentContest, setCurrentContest] = useState();
  const { watch } = useFormContext();

  const currentSeasonWatcher = watch(seasonName);

  useEffect(() => {
    setCurrentSeason(currentSeasonWatcher);
  }, [currentSeasonWatcher]);

  return (
    <Grid item xs={4}>
      <AsyncSelect
        selectName={asyncSelectName}
        label="Категория поданной работы"
        currentSeason={currentSeason || null}
        currentContest={currentContest}
        onChangeSelect={(contest) => {
          setCurrentContest(contest);
        }}
      />
    </Grid>
  );
}
