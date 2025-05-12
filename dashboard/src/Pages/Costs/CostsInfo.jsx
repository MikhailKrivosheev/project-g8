import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { CostsContext } from 'Context/Costs';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function CostsInfo() {
  const [costs, , updatePagination] = useContext(CostsContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'title_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.costPage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: 'Цена',
        accessor: 'price',
        Cell: ({ value }) => `${value} руб.`,
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.cost}
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
      data={costs.results}
      meta={costs.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
