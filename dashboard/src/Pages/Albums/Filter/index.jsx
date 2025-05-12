import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { AlbumsContext } from 'Context/Albums';
import React, { useContext } from 'react';
import SeasonSelect from './SeasonSelect';
import TypeSelect from './TypeSelect';
import Checkbox from './Checkbox';

export default function AlbumsFilter() {
  const [albums] = useContext(AlbumsContext);
  return (
    <PageFilter filter={albums.filter} data={albums}>
      <Grid item xs={4}>
        <SeasonSelect
          name="year"
          label="Выберите сезон"
          filter={albums.filter}
        />
        <Checkbox
          name="is_home"
          label="Показанные на главной"
          filter={albums.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <TypeSelect name="type" label="Тип галереи" filter={albums.filter} />
      </Grid>
    </PageFilter>
  );
}
