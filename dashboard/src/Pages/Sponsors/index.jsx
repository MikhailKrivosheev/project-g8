import TableLayout from 'Components/TableLayout';
import { SponsorsContextProvider } from 'Context/Sponsors';
import routes from 'Dictionaries/routes';
import React from 'react';
import Table from './Table';
import Filter from './Filter';

export default function Sponsors() {
  return (
    <TableLayout title="Спонсоры" createLink={routes.sponsorCreate()}>
      <SponsorsContextProvider>
        <Filter />
        <Table />
      </SponsorsContextProvider>
    </TableLayout>
  );
}
