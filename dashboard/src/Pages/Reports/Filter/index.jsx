import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { ReportsContext } from 'Context/Reports';
import React, { useContext } from 'react';
import SeasonSelect from './SeasonSelect';
import SectionSelect from './SectionSelect';
import PlaceSelect from './PlaceSelect';

export default function ReportsFilter() {
  const [reports] = useContext(ReportsContext);
  return (
    <PageFilter filter={reports?.filter} data={reports}>
      <Grid item xs={4}>
        <SeasonSelect
          name="season_id"
          label="Выберите сезон"
          filter={reports?.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <SectionSelect
          name="section_id"
          label="Выберите секцию"
          filter={reports?.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <PlaceSelect
          name="place_id"
          label="Выберите место"
          filter={reports?.filter}
        />
      </Grid>
    </PageFilter>
  );
}
