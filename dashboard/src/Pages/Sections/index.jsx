import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { SectionsContextProvider } from 'Context/Sections';
import React from 'react';
import SectionsInfo from './SectionsInfo';

export default function Sections() {
  return (
    <TableLayout title="Секции" createLink={routes.sectionCreate()}>
      <SectionsContextProvider>
        <SectionsInfo />
      </SectionsContextProvider>
    </TableLayout>
  );
}
