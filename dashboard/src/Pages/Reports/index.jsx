import Api from 'Api';
import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { ReportsContext, ReportsContextProvider } from 'Context/Reports';
import React from 'react';
import Filter from './Filter';
import ReportsInfo from './ReportsInfo';

export default function Reports() {
  return (
    <TableLayout title="Доклады" createLink={routes.reportCreate()}>
      <ReportsContextProvider>
        <Filter />
        <ReportsInfo />
      </ReportsContextProvider>
    </TableLayout>
  );
}
