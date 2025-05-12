import TableLayout from 'Components/TableLayout';
import { WorksContextProvider } from 'Context/Works';
import React from 'react';
import Filter from './Filter';
import WorksInfo from './WorksInfo';

export default function Works() {
  return (
    <TableLayout title="Работы">
      <WorksContextProvider>
        <Filter />
        <WorksInfo />
      </WorksContextProvider>
    </TableLayout>
  );
}
