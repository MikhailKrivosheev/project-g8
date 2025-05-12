import { Button, Chip, makeStyles } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { DictionaryContext } from 'Context/Dictionaries';
import { ReportsContext } from 'Context/Reports';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteReport from './DeleteEntity';

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

export default function ReportsInfo() {
  const [reports, , updatePagination] = useContext(ReportsContext);
  // const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const columns = useMemo(
    () => [
      {
        Header: 'Наименование',
        accessor: 'name_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.reportPage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: 'Спикеры',
        accessor: 'speakers',
        Cell: ({ value }) => {
          return (
            <ul className={classes.list}>
              {value.map((item) => {
                return (
                  <li>
                    <Link to="/">
                      {item.first_name_ru} {item.last_name_ru}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        Header: 'Куратор',
        accessor: 'curators',
        Cell: ({ value }) => {
          return (
            <ul className={classes.list}>
              {value.map((item) => {
                return (
                  <li>
                    <Link to="/">
                      {item.first_name_ru} {item.last_name_ru}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        },
      },
      {
        Header: 'Тэги',
        accessor: 'tags',
        Cell: ({ value }) => {
          return (
            <div className={classes.root}>
              {value.map((item) => {
                return (
                  <Chip
                    label={item?.name}
                    component="a"
                    href="#"
                    clickable
                    key={item?.id}
                  />
                );
              })}
            </div>
          );
        },
      },
      {
        Header: 'Место',
        accessor: 'place.name_ru',
        Cell: ({ value }) => value || '',
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteReport
              entity={cell.row.original.id}
              deleteUrl={Api.routes.report}
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
      data={reports.results}
      meta={reports.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
