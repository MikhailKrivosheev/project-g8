import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import Api from 'Api';
import AsyncSelect from './AsyncSelect';

export default function ContestSelectWrapper({
  filter,
  seasonName,
  asyncSelectName,
}) {
  const [currentSeason, setCurrentSeason] = useState();
  const [currentContest, setCurrentContest] = useState();
  const { watch } = useFormContext();

  const currentSeasonWatcher = watch(seasonName);

  useEffect(() => {
    setCurrentSeason(currentSeasonWatcher);
  }, [currentSeasonWatcher]);

  useEffect(() => {
    if (!filter?.contest_id) {
      setCurrentContest(null);
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.contest_id) {
      const getCurrentContest = async () => {
        const response = await Api.get(Api.routes.contest(filter.contest_id));
        const currentContestOption = {
          value: response?.results?.id,
          label: response?.results?.name,
        };
        setCurrentContest(currentContestOption);
      };
      getCurrentContest();
    }
  }, []);

  return (
    <Grid item xs={4}>
      <AsyncSelect
        selectName={asyncSelectName}
        label="Фильтр по категории"
        currentSeason={currentSeason || null}
        currentContest={currentContest}
        onChangeSelect={(contest) => setCurrentContest(contest)}
      />
    </Grid>
  );
}
