/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { SectionContext, SectionContextProvider } from 'Context/Section';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Section() {
  const { sectionId } = useParams();

  return (
    <SectionContextProvider>
      <FormLayout
        condition={sectionId}
        context={SectionContext}
        title={
          (state) => (state ? `${state?.name_ru}` : 'Создание секции')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </SectionContextProvider>
  );
}
