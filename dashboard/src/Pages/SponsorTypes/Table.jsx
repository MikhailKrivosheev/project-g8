/* eslint-disable react/jsx-props-no-spreading */
import PageTable from 'Components/PageTable';
import { SponsorTypesContext } from 'Context/SponsorTypes';
import routes from 'Dictionaries/routes';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function Table() {
  const [sponsorTypes, setSponsorTypes, updatePagination] =
    useContext(SponsorTypesContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'title_ru',
        Cell: ({ value, cell }) => (
          <Link to={routes.sponsorTypePage(cell.row.original.id)}>{value}</Link>
        ),
      },
    ],
    []
  );

  return (
    <PageTable
      data={sponsorTypes.results}
      meta={sponsorTypes.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
