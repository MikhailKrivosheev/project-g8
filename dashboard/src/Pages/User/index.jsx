/* eslint-disable no-nested-ternary */
import FormLayout from 'Components/FormLayout';
import { UserContext, UserContextProvider } from 'Context/User';
import React from 'react';
import { useParams } from 'react-router-dom';
import Form from './Form';

export default function User() {
  const { userId } = useParams();

  return (
    <UserContextProvider>
      <FormLayout
        condition={userId}
        context={UserContext}
        title={
          (state) =>
            state
              ? `${state?.first_name_ru} ${state?.last_name_ru}`
              : 'Создание пользователя'

          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        <Form />
      </FormLayout>
    </UserContextProvider>
  );
}
