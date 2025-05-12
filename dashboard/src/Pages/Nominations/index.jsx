import Api from 'Api';
import Wrapper from 'Components/LocalBreadcrumbs/Wrapper';
import TableLayout from 'Components/TableLayout';
import { NominationsContextProvider } from 'Context/Nominations';
import routes from 'Dictionaries/routes';
import useQueryParams from 'Hooks/useQueryParams';
import { useSnackbar } from 'notistack';
import Table from './Table';

export default function Nominations() {
  const { seasonId, contestId, seasonName, contestName } = useQueryParams();
  const { enqueueSnackbar } = useSnackbar();

  const onButtonClick = async () => {
    try {
      await Api.put(Api.routes.publishAllNominations(contestId));
      enqueueSnackbar(`Все номинации успешно опубликованы`, {
        variant: 'success',
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Wrapper
        editLink={`${routes.contestPage(
          seasonId,
          contestId
        )}?season_name=${seasonName}&contest_name=${contestName}`}
        backLinkRoute={routes.seasons()}
      />
      <TableLayout
        createLink={`${routes.nominationCreate(
          seasonId,
          contestId
        )}?season_name=${seasonName}&contest_name=${contestName}`}
        withBreadcrumbs={false}
        withSearch
        searchParamName="name_ru"
        searchInputPlaceholder="Поиск номинации"
        isTitleButton
        buttonText="Опубликовать все номинации"
        onButtonClick={onButtonClick}
      >
        <NominationsContextProvider contestId={contestId}>
          <Table />
        </NominationsContextProvider>
      </TableLayout>
    </>
  );
}
