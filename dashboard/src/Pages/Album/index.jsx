/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { AlbumContext, AlbumContextProvider } from 'Context/Album';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Album() {
  const { albumId } = useParams();

  return (
    <AlbumContextProvider>
      <FormLayout
        condition={albumId}
        context={AlbumContext}
        title={
          (state) => (state ? state?.title_ru : 'Создание галереи')
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </AlbumContextProvider>
  );
}
