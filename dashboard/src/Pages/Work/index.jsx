/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { WorkContext, WorkContextProvider } from 'Context/Work';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Work() {
  const { workId } = useParams();

  return (
    <WorkContextProvider>
      <FormLayout
        condition={workId}
        context={WorkContext}
        title={
          (state) => (state ? state?.name_ru : 'Создание работы')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </WorkContextProvider>
  );
}
