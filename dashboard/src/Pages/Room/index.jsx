/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { RoomContext, RoomContextProvider } from 'Context/Room';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function Room() {
  const { roomId } = useParams();

  return (
    <RoomContextProvider>
      <FormLayout
        condition={roomId}
        context={RoomContext}
        title={
          (state) => (state ? `${state?.name_ru}` : 'Создание комнаты')

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </RoomContextProvider>
  );
}
