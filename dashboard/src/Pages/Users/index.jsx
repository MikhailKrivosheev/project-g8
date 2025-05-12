import Api from 'Api';
import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { UsersContext, UsersContextProvider } from 'Context/Users';
import React from 'react';
import Filter from './Filter';
import UsersInfo from './UsersInfo';

export default function Users() {
  return (
    <TableLayout title="Пользователи" createLink={routes.userCreate()}>
      <UsersContextProvider>
        <Filter context={UsersContext} />
        <UsersInfo />
      </UsersContextProvider>
    </TableLayout>
  );
}
