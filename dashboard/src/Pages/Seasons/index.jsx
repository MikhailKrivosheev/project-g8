import TableLayout from 'Components/TableLayout';
import { SeasonsContextProvider } from 'Context/Seasons';
import routes from 'Dictionaries/routes';
import { RecoilRoot } from 'recoil';
import Table from './Table';

export default function Seasons() {
  return (
    <RecoilRoot>
      <TableLayout
        title="Cезоны"
        createLink={routes.seasonCreate()}
        withBreadcrumbs={false}
        withSearch
        searchParamName="year"
        searchInputPlaceholder="Поиск сезона"
      >
        <SeasonsContextProvider>
          <Table />
        </SeasonsContextProvider>
      </TableLayout>
    </RecoilRoot>
  );
}
