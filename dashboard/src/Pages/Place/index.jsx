/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { PlaceContext, PlaceContextProvider } from 'Context/Place';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Place() {
  const { placeId } = useParams();

  return (
    <PlaceContextProvider>
      <FormLayout
        condition={placeId}
        context={PlaceContext}
        title={
          (state) => (state ? `${state?.name_ru}` : 'Создание локации')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </PlaceContextProvider>
  );
}
