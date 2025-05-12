import TableLayout from 'Components/TableLayout';
import { ArticlesContextProvider } from 'Context/Articles';
import routes from 'Dictionaries/routes';
import React from 'react';
import Table from './Table';

export default function Articles() {
  return (
    <TableLayout title="Журнал" createLink={routes.articleCreate()}>
      <ArticlesContextProvider>
        <Table />
      </ArticlesContextProvider>
    </TableLayout>
  );
}
