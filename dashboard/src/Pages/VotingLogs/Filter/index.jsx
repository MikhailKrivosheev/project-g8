import { Grid } from '@material-ui/core';
import SearchByName from 'Components/Form/SearchByName';
import PageFilter from 'Components/PageFilter';
import { VotingLogsContext } from 'Context/VotingLogs';
import React, { useContext } from 'react';
import ContestSelect from './ContestSelect';
import StageSelect from './SortSelect';
import SeasonSelect from './SeasonSelect';

export default function VotingLogsFilter() {
  const [votingLogs] = useContext(VotingLogsContext);
  return (
    <PageFilter filter={votingLogs?.filter} data={votingLogs} exportBtn>
      <Grid item xs={12}>
        <SearchByName
          name="name"
          label="Поиск по имени"
          filter={votingLogs.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <ContestSelect
          name="contest_id"
          label="Выберите конкурс"
          filter={votingLogs.filter}
        />
      </Grid>

      <Grid item xs={4}>
        <StageSelect
          name="stage_code"
          label="Этап"
          filter={votingLogs.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <SeasonSelect
          name="season_id"
          label="Сортировать по сезону"
          filter={votingLogs.filter}
        />
      </Grid>
    </PageFilter>
  );
}
