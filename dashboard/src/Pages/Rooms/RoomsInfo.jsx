import { Button } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { DictionaryContext } from 'Context/Dictionaries';
import { RoomsContext } from 'Context/Rooms';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function RoomsInfo() {
  const [rooms, , updatePagination] = useContext(RoomsContext);
  // const dictionary = useContext(DictionaryContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'name_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.roomPage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: 'Статус',
        accessor: 'published',
        Cell: ({ value }) =>
          value === true ? 'Опубликовано' : 'Не опубликовано',
      },
      {
        Header: 'Место проведения',
        accessor: 'place.name',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.placePage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.room}
              reloadPage
            />
          );
        },
      },
    ],
    []
  );

  return (
    <PageTable
      data={rooms.results}
      meta={rooms.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
