import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { PlacesContext } from 'Context/Places';
import React, { useContext } from 'react';
import SeasonSelect from './SeasonSelect';

export default function PlacesFilter() {
  const [places] = useContext(PlacesContext);
  return (
    <PageFilter filter={places.filter} data={places}>
      <Grid item xs={4}>
        <SeasonSelect
          name="season_id"
          label="Выберите сезон"
          filter={places.filter}
        />
      </Grid>
    </PageFilter>
  );
}
