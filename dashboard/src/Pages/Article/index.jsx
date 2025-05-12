/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { ArticleContext, ArticleContextProvider } from 'Context/Article';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Article() {
  const { articleId } = useParams();

  return (
    <ArticleContextProvider>
      <FormLayout
        condition={articleId}
        context={ArticleContext}
        title={(state) => state?.name || 'Создание журнала'}
      >
        <Form />
      </FormLayout>
    </ArticleContextProvider>
  );
}
