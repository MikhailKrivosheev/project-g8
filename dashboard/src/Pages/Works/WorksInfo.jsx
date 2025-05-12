import { makeStyles } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { WorksContext } from 'Context/Works';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteWork from './DeleteEntity';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}));

export default function WorksInfo() {
  const [works, , updatePagination] = useContext(WorksContext);
  const classes = useStyles();
  // const dictionary = useContext(DictionaryContext);

  const columns = useMemo(
    () => [
      { Header: 'Сезон', accessor: 'season', Cell: ({ value }) => value || '' },
      {
        Header: 'Наименование',
        accessor: 'name_ru',
        Cell: ({ cell, value }) => {
          return value ? (
            <Link to={routes.workPage(cell.row.original.id)}>{value}</Link>
          ) : (
            <Link to={routes.workPage(cell.row.original.id)}>
              {cell.row.original.name_en}
            </Link>
          );
        },
      },
      {
        Header: 'Участник',
        accessor: 'client_name_ru',
        Cell: ({ value }) => value || '',
      },
      {
        Header: 'Статус',
        accessor: 'status',
        Cell: ({ value }) => value || '',
      },
      {
        Header: 'Номинации',
        accessor: 'nominations',
        Cell: ({ value }) => {
          return (
            <ul className={classes.list}>
              {value.map((item) => {
                return (
                  <li>
                    <Link to="/">{item?.name}</Link>
                    <br />
                    {item?.pivot?.stage_code_full &&
                      `Статус: ${item?.pivot?.stage_code_full};`}
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        Header: 'Кол-во лайков',
        accessor: 'likes_count',
        Cell: ({ value }) => value || 0,
      },
      {
        Header: 'Категория',
        accessor: '',
        Cell: ({ value, cell }) => {
          return (
            <Link
              to={routes.contestPage(
                cell.row.original.nominations[0]?.contest?.id
              )}
            >
              {cell.row.original.nominations[0]?.contest?.name_ru}
            </Link>
          );
        },
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteWork
              entity={cell.row.original.id}
              deleteUrl={Api.routes.work}
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
      data={works.results}
      meta={works.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
