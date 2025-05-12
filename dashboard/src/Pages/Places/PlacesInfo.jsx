import { Button } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { DictionaryContext } from 'Context/Dictionaries';
import { PlacesContext } from 'Context/Places';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function PlacesInfo() {
  const [places, , updatePagination] = useContext(PlacesContext);
  // const dictionary = useContext(DictionaryContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'name_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.placePage(cell.row.original.id)}>{value}</Link>
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
        Header: 'Сезон',
        accessor: 'season',
        Cell: ({ value }) => value.year || '',
      },
      {
        Header: 'Комнаты',
        accessor: 'rooms',
        Cell: ({ cell, value }) => {
          return (
            <Link to={`${routes.rooms()}?place_id=${cell.row.original.id}`}>
              {value?.length || 0} Комнаты
            </Link>
          );
        },
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.place}
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
      data={places.results}
      meta={places.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
