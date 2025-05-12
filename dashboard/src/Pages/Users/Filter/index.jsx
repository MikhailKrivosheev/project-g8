import { Grid } from '@material-ui/core';
import PageFilter from 'Components/PageFilter';
import { UsersContext } from 'Context/Users';
import React, { useContext } from 'react';
import SearchByName from './SearchByName';
import SortSelect from './SortSelect';
import UsersExportForm from './UsersExportForm';

export default function UsersFilter() {
  const [users] = useContext(UsersContext);

  return (
    <>
      <span className="users-export">Сортировка таблицы</span>
      <PageFilter filter={users.filter} data={users}>
        <Grid item xs={12}>
          <SearchByName
            name="name"
            label="Поиск по имени"
            filter={users.filter}
          />
        </Grid>
        <Grid item xs={4}>
          <SortSelect
            name="role"
            label="Тип пользователя"
            filter={users.filter}
          />
        </Grid>
      </PageFilter>
      <UsersExportForm />
    </>
  );
}
