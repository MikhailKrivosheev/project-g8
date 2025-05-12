import PageTable from 'Components/PageTable';
import { VotingLogsContext } from 'Context/VotingLogs';
import routes from 'Dictionaries/routes';
import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';

export default function VotingLogsInfo() {
  const [votingLogs, , updatePagination] = useContext(VotingLogsContext);

  const columns = useMemo(
    () => [
      {
        Header: 'Участник',
        accessor: 'account',
        Cell: ({ value }) => {
          return (
            <Link to={routes.userPage(value?.id)}>
              {value?.first_name_ru} {value?.last_name_ru}
            </Link>
          );
        },
      },
      {
        Header: 'Работа',
        accessor: 'work',
        Cell: ({ value }) => {
          return <Link to={routes.workPage(value?.id)}>{value?.name_ru}</Link>;
        },
      },
      {
        Header: 'Номинация',
        accessor: 'nomination',
        Cell: ({ value }) => {
          return (
            <Link to={routes.nominationPage(value?.id)}>{value?.name_ru}</Link>
          );
        },
      },
      {
        Header: 'Категория',
        accessor: 'contest',
        Cell: ({ cell, value }) => {
          return (
            <Link
              to={routes.contestPage(
                value?.id || cell?.row?.original?.nomination?.contest?.id
              )}
            >
              {value?.name_ru ||
                cell?.row?.original?.nomination?.contest?.name_ru}
            </Link>
          );
        },
      },
      {
        Header: 'Оценка',
        accessor: 'meta',
        Cell: ({ value }) => {
          // eslint-disable-next-line no-nested-ternary
          return value?.approved
            ? value.approved === true
              ? 'Да'
              : 'Нет'
            : value?.rating || 'Нет';
        },
      },
    ],
    []
  );

  return (
    <PageTable
      data={votingLogs.results}
      meta={votingLogs.meta}
      columns={columns}
      updatePagination={updatePagination}
    />
  );
}
