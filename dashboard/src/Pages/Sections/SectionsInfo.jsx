import Api from 'Api';
import routes from 'Dictionaries/routes';
import PageTable from 'Components/PageTable';
import { SectionsContext } from 'Context/Sections';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import DeleteUser from './DeleteUser';

export default function SectionsInfo() {
  const [sections, , updatePagination] = useContext(SectionsContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Название',
        accessor: 'name_ru',
        Cell: ({ cell, value }) => {
          return (
            <Link to={routes.sectionPage(cell.row.original.id)}>{value}</Link>
          );
        },
      },
      {
        Header: ' ',
        Cell: ({ cell }) => {
          return (
            <DeleteUser
              entity={cell.row.original.id}
              deleteUrl={Api.routes.section}
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
      data={sections.results}
      meta={sections.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
