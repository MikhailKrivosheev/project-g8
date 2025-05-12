/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { ReportContext, ReportContextProvider } from 'Context/Report';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Report() {
  const { reportId } = useParams();

  return (
    <ReportContextProvider>
      <FormLayout
        condition={reportId}
        context={ReportContext}
        title={
          (state) => (state ? `${state?.name_ru}` : 'Создание доклада')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </ReportContextProvider>
  );
}
