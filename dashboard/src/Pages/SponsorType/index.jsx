/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import {
  SponsorTypeContext,
  SponsorTypeContextProvider,
} from 'Context/SponsorType';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function SponsorType() {
  const { sponsorTypeId } = useParams();

  return (
    <SponsorTypeContextProvider>
      <FormLayout
        condition={sponsorTypeId}
        context={SponsorTypeContext}
        title={(state) => state?.name || 'Тип спонсора'}
      >
        <Form />
      </FormLayout>
    </SponsorTypeContextProvider>
  );
}
