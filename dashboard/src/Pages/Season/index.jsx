/* eslint-disable no-nested-ternary */
import { SeasonContext, SeasonContextProvider } from 'Context/Season';
import { SeasonsContextProvider } from 'Context/Seasons';
import FormLayout from 'Pages/Season/Form/FormLayout';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Season() {
  const { seasonId } = useParams();

  return (
    <SeasonsContextProvider>
      <SeasonContextProvider>
        <FormLayout condition={seasonId} context={SeasonContext}>
          <Form />
        </FormLayout>
      </SeasonContextProvider>
    </SeasonsContextProvider>
  );
}
