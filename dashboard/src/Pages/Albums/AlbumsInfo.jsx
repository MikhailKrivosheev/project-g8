import { Button } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { DictionaryContext } from 'Context/Dictionaries';
import { AlbumsContext } from 'Context/Albums';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function AlbumsInfo() {
  const [albums, , updatePagination] = useContext(AlbumsContext);
  // const dictionary = useContext(DictionaryContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'title_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.albumPage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: 'Тип',
        accessor: 'type',
        Cell: ({ value }) => value || '',
      },
      {
        Header: 'Показать на главной',
        accessor: 'is_home',
        Cell: ({ value }) => (value === true ? 'Да' : 'Нет'),
      },
      {
        Header: 'Сезон',
        accessor: 'year',
        Cell: ({ value }) => value || '',
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.album}
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
      data={albums.results}
      meta={albums.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
