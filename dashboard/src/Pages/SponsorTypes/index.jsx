import TableLayout from 'Components/TableLayout';
import { SponsorTypesContextProvider } from 'Context/SponsorTypes';
import routes from 'Dictionaries/routes';
import React from 'react';
import Table from './Table';

export default function SponsorTypes() {
  return (
    <TableLayout title="Спонсоры: Типы" createLink={routes.sponsorTypeCreate()}>
      <SponsorTypesContextProvider>
        <Table />
      </SponsorTypesContextProvider>
    </TableLayout>
  );
}
