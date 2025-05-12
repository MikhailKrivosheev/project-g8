import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { CostsContextProvider } from 'Context/Costs';
import React from 'react';
import CostsInfo from './CostsInfo';

export default function Costs() {
  return (
    <TableLayout title="Блоки стоимости" createLink={routes.costCreate()}>
      <CostsContextProvider>
        <CostsInfo />
      </CostsContextProvider>
    </TableLayout>
  );
}
