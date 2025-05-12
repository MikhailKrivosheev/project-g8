import Api from 'Api';
import TableLayout from 'Components/TableLayout';
import routes from 'Dictionaries/routes';
import { RoomsContext, RoomsContextProvider } from 'Context/Rooms';
import React from 'react';
import Filter from './Filter';
import RoomsInfo from './RoomsInfo';

export default function Rooms() {
  return (
    <TableLayout title="Комнаты" createLink={routes.roomCreate()}>
      <RoomsContextProvider>
        <Filter context={RoomsContext} />
        <RoomsInfo />
      </RoomsContextProvider>
    </TableLayout>
  );
}
