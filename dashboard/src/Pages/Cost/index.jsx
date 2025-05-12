/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { CostContext, CostContextProvider } from 'Context/Cost';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Cost() {
  const { costId } = useParams();

  return (
    <CostContextProvider>
      <FormLayout
        condition={costId}
        context={CostContext}
        title={
          (state) => (state ? `${state?.title_ru}` : 'Создание блока стоимости')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </CostContextProvider>
  );
}
