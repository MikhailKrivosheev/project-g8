import { Button, IconButton, makeStyles } from '@material-ui/core';
import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { UsersContext } from 'Context/Users';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

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

export default function UsersInfo() {
  const [users, , updatePagination] = useContext(UsersContext);
  const classes = useStyles();
  // const dictionary = useContext(DictionaryContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Имя',
        accessor: 'name',
        Cell: ({ cell }) => {
          return (
            <Link to={routes.userPage(cell.row.original.id)}>
              {`${cell.row.original.first_name_ru} ${cell.row.original.last_name_ru}`}
            </Link>
          );
        },
      },
      {
        Header: 'Ссылка на профиль',
        accessor: 'id',
        Cell: ({ value, cell }) => {
          return (
            <IconButton
              style={{ padding: 0 }}
              onClick={() => {
                window.open(`${routes.profile(value)}`, '_blank');
              }}
              color="inherit"
            >
              <AccountBoxIcon />
            </IconButton>
          );
        },
      },
      {
        Header: 'Роль',
        accessor: 'roles',
        Cell: ({ value }) => {
          return (
            <ul className={classes.list}>
              {value.map((item) => {
                return <li>{item?.name}</li>;
              })}
            </ul>
          );
        },
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.user}
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
      data={users.results}
      meta={users.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
