/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { DevTool } from '@hookform/devtools';
import Section from 'Components/UI/Section';
import { FormProvider, useForm } from 'react-hook-form';
import Field from 'Components/UI/Form/Field';
import Button from 'Components/UI/Button';
import Title from 'Components/UI/Title';
import Password from 'Components/UI/Form/Password/index';
import useAPIError from 'Hooks/useAPIError';
import Api from 'Api';
import userAtom, { IUser } from 'Recoil/Atoms/User';
import ModalComponent from 'Components/UI/Modal';
import FileInput from 'Components/UI/Form/File';
import { useRecoilState } from 'recoil';
import useTranslate from 'Hooks/useTranslate';
import setDefaultValues from './helper';

export default function Account() {
  const [user, setUser] = useRecoilState(userAtom);
  const [open, setOpen] = useState(false);
  const translate = useTranslate();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: setDefaultValues(user),
  });

  const { handleAPIError, apiError } = useAPIError({
    setError: methods.setError,
  });

  async function onSubmit(values: any) {
    let valuesToSend;

    if (typeof values.image === 'string') {
      valuesToSend = { ...values };
      valuesToSend.image_url = values.image;

      delete valuesToSend.image;
    }
    try {
      const { success, results } = await Api.put(
        Api.routes.api.meUpdate(user?.id),
        values
      );

      if (success) {
        setOpen(true);
        setUser((prev) => ({ ...prev, ...results }));
      }
    } catch (error: any) {
      handleAPIError(error);
      if (apiError) setOpen(true);
    }
  }

  return (
    <Section fullWidth>
      <FormProvider {...methods}>
        <form
          className="form account__form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FileInput name="image" />
          <div className="account__info">
            <div className="account__info-group">
              <Field name="first_name_ru" label="Имя" required />
              <Field name="last_name_ru" label="Фамилия" />
              <Field name="company_ru" label="Компания" />
              <Field name="job_title_ru" label="Должность" />
              <Field name="biography_ru" label="Биография" />
            </div>
            <div className="account__info-group">
              <Field name="first_name_en" label="Name" />
              <Field name="last_name_en" label="Last name" />
              <Field name="company_en" label="Company" />
              <Field name="job_title_en" label="Position" />
              <Field name="biography_en" label="Biography" />
            </div>
          </div>
          <div className="account__info-group">
            <Field name="email" label="Email" required />
            <Field name="phone" label={translate('Телефон')} required />
            <Field name="facebook" label="Facebook" />
            <Field name="telegram" label="Telegram" />
            <Field name="instagram" label="Instagram" />
            <Field name="vkontakte" label="Vkontakte" />
            <Field name="site" label={translate('Сайт')} />
          </div>
          <div className="account__info-group">
            <Title sizeName="m">Изменить пароль</Title>
            <Password
              name="password"
              type="password"
              label={translate('Старый пароль')}
            />
            <Password
              name="password_new"
              type="password"
              label={translate('Новый пароль')}
              showPassword
            />
            <Button color="black" type="submit">
              Сохранить изменения
            </Button>
          </div>
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
      <ModalComponent contentClassName="account-modal" state={[open, setOpen]}>
        <Title sizeName="m" align="center">
          {apiError || 'Изменения сохранены'}
        </Title>
        <Button onClick={() => setOpen(false)} align="center" color="gray">
          Ok
        </Button>
      </ModalComponent>
    </Section>
  );
}
