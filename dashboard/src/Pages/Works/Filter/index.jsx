import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { WorksContext } from 'Context/Works';
import React, { useContext } from 'react';
import SearchByName from './SearchByName';
import SeasonSelect from './SeasonSelect';
import Checkbox from './Checkbox';
import IndependentSelect from './IndependentSelect';
import ContestSelectWrapper from './ContestSelect/ContestSelectWrapper';
import NominationSelectWrapper from './NominationSelect/NominationSelectWrapper';

export default function WorksFilter() {
  const [works] = useContext(WorksContext);

  return (
    <PageFilter filter={works?.filter} data={works} exportBtn>
      <Grid item xs={4}>
        <SearchByName
          name="name_ru"
          label="Поиск по наименованию"
          filter={works?.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <SearchByName
          name="client_name"
          label="Поиск по имени участника"
          filter={works?.filter}
        />
      </Grid>
      <Grid item xs={4}>
        <SearchByName
          name="email"
          label="Поиск по почте участника"
          filter={works?.filter}
        />
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <SearchByName
          name="search"
          label="Поиск по параметрам (слово)"
          filter={works?.filter}
        />
      </Grid>
      <Grid item xs={4} />

      <Grid container item xs={4}>
        <SeasonSelect
          name="season_id"
          label="Фильтр по сезону"
          filter={works?.filter}
        />
      </Grid>
      <ContestSelectWrapper
        filter={works?.filter}
        seasonName="season_id"
        asyncSelectName="contest_id"
      />
      <NominationSelectWrapper
        seasonName="season_id"
        contestName="contest_id"
        asyncSelectName="nomination_id"
        filter={works?.filter}
      />
      <Grid item xs={4}>
        <IndependentSelect
          name="nomination_stage"
          label="Фильтр по этапу"
          filter={works?.filter}
          filterType="nomination_work_stage"
        />
      </Grid>
      <Grid item xs={4}>
        <IndependentSelect
          name="status"
          label="Фильтр по статусу"
          filter={works?.filter}
          filterType="work_status"
        />
      </Grid>
      <Grid container item spacing={2} style={{ marginBottom: '50px' }}>
        <Grid item xs={4}>
          <IndependentSelect
            name="sort_field"
            label="Сортировка по полю"
            filter={works?.filter}
            filterType="export_work_sort_fields"
          />
        </Grid>
        <Grid item xs={4}>
          <IndependentSelect
            name="sort_direction"
            label="Сортировка по направлению"
            filter={works?.filter}
            filterType="export_work_sort_direction"
          />
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            marginLeft: 'auto',
            transform: 'translateY(10%)',
            textAlign: 'end',
          }}
        >
          <Checkbox
            name="sort_like"
            label="Сортировать по лайкам"
            filter={works?.filter}
          />
        </Grid>
      </Grid>
    </PageFilter>
  );
}
