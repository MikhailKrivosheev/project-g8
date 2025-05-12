import TableLayout from 'Components/TableLayout';
import { PlacesContext, PlacesContextProvider } from 'Context/Places';
import routes from 'Dictionaries/routes';
import Filter from './Filter';
import PlacesInfo from './PlacesInfo';

export default function Places() {
  return (
    <TableLayout title="Места проведения" createLink={routes.placeCreate()}>
      <PlacesContextProvider>
        <Filter context={PlacesContext} />
        <PlacesInfo />
      </PlacesContextProvider>
    </TableLayout>
  );
}
