/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { SponsorContext, SponsorContextProvider } from 'Context/Sponsor';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Sponsor() {
  const { sponsorId } = useParams();

  return (
    <SponsorContextProvider>
      <FormLayout
        condition={sponsorId}
        context={SponsorContext}
        title={
          (state) => (state ? `${state?.name}` : 'Создание спонсора')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </SponsorContextProvider>
  );
}
