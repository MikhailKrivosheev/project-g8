/* eslint-disable react/jsx-props-no-spreading */
import PageTable from 'Components/PageTable';
import { SponsorsContext } from 'Context/Sponsors';
import React, { useContext, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export default function Table() {
  const [sponsors, setSponsors, updatePagination] = useContext(SponsorsContext);
  const { url } = useRouteMatch();

  const columns = useMemo(
    () => [
      {
        Header: 'Спонсор',
        accessor: 'logo_url',
        Cell: ({ value, cell }) => (
          <>
            <p>{cell.row.original.name}</p>
            <Link to={`${url}/${cell.row.original.id}`}>
              <img width="150" height="100" src={value} alt="logo" />
            </Link>
          </>
        ),
      },
    ],
    []
  );

  return (
    <PageTable
      data={sponsors.results}
      meta={sponsors.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
