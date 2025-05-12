import Api from 'Api';
import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { AlbumsContext, AlbumsContextProvider } from 'Context/Albums';
import React from 'react';
import Filter from './Filter';
import AlbumsInfo from './AlbumsInfo';

export default function Albums() {
  return (
    <TableLayout title="Галерея" createLink={routes.albumCreate()}>
      <AlbumsContextProvider>
        <Filter context={AlbumsContext} />
        <AlbumsInfo />
      </AlbumsContextProvider>
    </TableLayout>
  );
}
