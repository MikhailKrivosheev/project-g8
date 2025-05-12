/* eslint-disable jsx-a11y/control-has-associated-label */
import Popup from 'Components/Popup';
import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Title from 'Components/UI/Title';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import Star from 'Icons/StarIcon';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuccessPopup({ openState }) {
  const [isModalOpen, setModalOpen] = openState;
  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const translate = useTranslate();

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div className="success-popup">
        <div className="success-popup__wrapper">
          <Star />
          <div className="success-popup__content">
            <Title sizeName="semi-m" className="success-popup__title">
              Поздравляем!
            </Title>
            <Description>
              Вы успешно отправили данные для оплаты, скоро мы отправим вам счет
              вам на почту
            </Description>
          </div>
        </div>
        <Button
          color="white"
          arrowColor="black"
          fullWidth
          className="success-popup__button"
          link={ROUTES.account()}
        >
          Окей
        </Button>
      </div>

      <button
        className="success-popup__overlay"
        type="button"
        onClick={() => {
          navigate(ROUTES.account());
          // setModalOpen(false);
        }}
      />
    </>
  );
}
