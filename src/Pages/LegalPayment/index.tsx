import Button from 'Components/UI/Button';
import Description from 'Components/UI/Description';
import Checkbox from 'Components/UI/Form/Checkbox';
import Field from 'Components/UI/Form/Field';
import GrayField from 'Components/UI/Form/GrayInput';
import Section from 'Components/UI/Section';
import Title from 'Components/UI/Title';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import React, { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import SuccessPopup from './PopupSuccess';

export default function LegalPayment() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const translate = useTranslate();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      company_name: '',
      inn: '',
      kpp: '',
      legal_address: '',
      edo: '',
      email: '',
      phone: '',
      telegram_link: '',
    },
  });

  const { isSubmitting } = methods.formState;

  const { handleAPIError, apiError } = useAPIError({
    setError: methods.setError,
  });

  const onSubmit = async (values: object) => {
    try {
      const { success } = await Api.post(
        Api.routes.api.paymentLegal(id),
        values
      );
      if (success) {
        setOpen(true);
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  return (
    <Section className="legal-payment">
      <Title className="legal-payment__title">
        Оплата подачи работы для юридических лиц
      </Title>
      <Description sizeName="m" className="legal-payment__desctiption">
        Пожалуйста, заполните следующие поля и кликните на кнопку «Отправить»
      </Description>
      <Description sizeName="m" className="legal-payment__desctiption">
        Напишите, пожалуйста, ваши реквизиты и кликните на кнопку “Отправить”,
        мы пришлём приглашение и счет через ЭДО. После оплаты напишите на
        info@g8.art название юридического лица и список работ, мы опубликуем на
        сайте.
      </Description>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Field label="Наименование компании" required name="company_name" />
          <Field label="ИНН" required name="inn" />
          <Field label="КПП" name="kpp" />
          <Field label="Юридический адрес" required name="legal_address" />
          <Checkbox name="edo" required>
            Обмен документами через ЭДО*
          </Checkbox>
          <Field label="Email" required name="email" />
          <Field type="tel" label={translate('Телефон')} name="phone" />
          <Field label="Telegram" name="telegram_link" />
          <Button
            color="black"
            type="submit"
            className="legal-payment__button"
            disabled={isSubmitting}
          >
            Отправить
          </Button>
        </form>
      </FormProvider>

      <SuccessPopup openState={[open, setOpen]} />
    </Section>
  );
}
