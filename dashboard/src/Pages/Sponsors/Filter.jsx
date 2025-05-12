import React, { useContext } from 'react';
import PageFilter from 'Components/PageFilter';
import { Grid } from '@material-ui/core';
import { SponsorsContext } from 'Context/Sponsors';
import SeasonsSelect from './SeasonsFilter';
import TypesSelect from './TypesFilter';

export default function Filter() {
  const [sponsors] = useContext(SponsorsContext);

  return (
    <PageFilter filter={sponsors.filter} data={sponsors}>
      <Grid item xs={4}>
        <SeasonsSelect
          name="season_id"
          label="Выберите сезон"
          filter={sponsors.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <TypesSelect
          name="sponsor_type_id"
          label="Выберите тип спонсора"
          filter={sponsors.filter}
        />
      </Grid>
    </PageFilter>
  );
}
