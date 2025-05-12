import { Grid } from '@material-ui/core';
import React from 'react';
import DateFrom from './From';
import DateTo from './To';

export default function PageDateFilter({ name }) {
  return (
    <Grid item container alignContent="flex-end" xs={12}>
      <Grid item>
        <DateFrom name={name.from} />
      </Grid>
      <Grid item>
        <DateTo name={name.to} />
      </Grid>
    </Grid>
  );
}
