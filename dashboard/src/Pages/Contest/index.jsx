/* eslint-disable no-nested-ternary */
import { ContestContext, ContestContextProvider } from 'Context/Contest';
import { useParams } from 'react-router-dom';
import ContestForm from './Form';
import FormLayout from './Form/FormLayout';

export default function Contest() {
  const { contestId } = useParams();

  return (
    <ContestContextProvider>
      <FormLayout condition={contestId} context={ContestContext}>
        <ContestForm />
      </FormLayout>
    </ContestContextProvider>
  );
}
