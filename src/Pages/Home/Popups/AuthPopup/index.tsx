import Popup from 'Components/Popup';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';

import React, { useState } from 'react';

export default function AuthPopup() {
  const [isModalOpen, setModalOpen] = useState(true);
  const ROUTES = useRoutes();
  const translate = useTranslate();

  return (
    <Popup className="auth-popup" state={[isModalOpen, setModalOpen]}>
      <Title sizeName="semi-m">Зарегистрироваться как участник конкурса</Title>
      <Description>Примите участие в битве креативных индустрий</Description>
      <Button
        color="white"
        arrowColor="black"
        fullWidth
        icon="star"
        className="auth-popup__button"
        link={ROUTES.signUp()}
      >
        Регистрация
      </Button>
    </Popup>
  );
}
