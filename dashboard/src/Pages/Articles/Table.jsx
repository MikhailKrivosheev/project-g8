/* eslint-disable react/jsx-props-no-spreading */
import PageTable from 'Components/PageTable';
import Api from 'Api';
import { ArticlesContext } from 'Context/Articles';
import routes from 'Dictionaries/routes';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Utilities from 'Utilities';
import DeleteUser from './DeleteUser';

export default function Table() {
  const [articles, setArticles, updatePagination] = useContext(ArticlesContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'title_ru',
        Cell: ({ value, cell }) => (
          <Link to={routes.articlePage(cell.row.original.id)}>{value}</Link>
        ),
      },
      {
        Header: 'Дата',
        accessor: 'created_at',
        Cell: ({ value }) =>
          Utilities.date.parseToDate(value, {
            formatString: 'dd-MM-yyyy',
          }),
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.article}
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
      data={articles.results}
      meta={articles.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
