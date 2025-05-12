import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import Api from 'Api';
import AsyncSelect from './AsyncSelect';

export default function NominationSelectWrapper({
  filter,
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

  useEffect(() => {
    if (!filter?.nomination_id) {
      setCurrentNomination(null);
    }
  }, [filter]);

  useEffect(() => {
    if (filter?.nomination_id) {
      const getCurrentNomination = async () => {
        const response = await Api.get(
          Api.routes.nomination(filter.nomination_id)
        );
        const currentNominationOption = {
          value: response?.results?.id,
          label: response?.results?.name,
        };
        setCurrentNomination(currentNominationOption);
      };
      getCurrentNomination();
    }
  }, []);

  return (
    <Grid item xs={4}>
      <AsyncSelect
        selectName={asyncSelectName}
        label="Фильтр по номинации"
        currentSeason={currentSeason || null}
        currentContest={currentContest || null}
        currentNomination={currentNomination}
        onChangeSelect={(nomination) => setCurrentNomination(nomination)}
      />
    </Grid>
  );
}
