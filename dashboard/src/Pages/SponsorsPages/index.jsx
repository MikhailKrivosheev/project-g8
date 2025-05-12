import TableLayout from 'Components/TableLayout';
import React from 'react';
import Content from './Content';

export default function SponsorsPages() {
  return (
    <TableLayout title="Список спонсоров" condition={false}>
      <Content />
    </TableLayout>
  );
}
