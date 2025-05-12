import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { RoomsContext } from 'Context/Rooms';
import React, { useContext } from 'react';
import SeasonSelect from './PlaceSelect';

export default function RoomsFilter() {
  const [rooms] = useContext(RoomsContext);
  return (
    <PageFilter filter={rooms.filter} data={rooms}>
      <Grid item xs={4}>
        <SeasonSelect
          name="place_id"
          label="Выберите место"
          filter={rooms.filter}
        />
      </Grid>
    </PageFilter>
  );
}
