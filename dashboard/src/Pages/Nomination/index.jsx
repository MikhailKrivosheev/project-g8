/* eslint-disable no-nested-ternary */
import {
  NominationContext,
  NominationContextProvider,
} from 'Context/Nomination';
import { useParams } from 'react-router-dom';
import NominationForm from './Form';
import FormLayout from './Form/FormLayout';

export default function Nomination() {
  const { nominationId } = useParams();

  return (
    <NominationContextProvider>
      <FormLayout condition={nominationId} context={NominationContext}>
        <NominationForm />
      </FormLayout>
    </NominationContextProvider>
  );
}
