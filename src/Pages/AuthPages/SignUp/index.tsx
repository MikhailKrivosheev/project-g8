import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import Button from 'Components/UI/Button';
import Checkbox from 'Components/UI/Form/Checkbox';
import Field from 'Components/UI/Form/Field';
import Password from 'Components/UI/Form/Password';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import useTranslate from 'Hooks/useTranslate';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';
import FormHeader from '../FormHeader';
import VKSign from '../VKSign';

type TFormValues = {
  company_ru: string;
  email: string;
  first_name_en: string;
  first_name_ru: string;
  last_name_en: string;
  last_name_ru: string;
  password: string;
  phone: string;
  isAgreement: boolean;
};

export default function SignUp() {
  const ROUTES = useRoutes();
  const lang = useRecoilValue(LangAtom);
  const navigate = useNavigate();
  const translate = useTranslate();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      first_name_ru: '',
      first_name_en: '',
      last_name_ru: '',
      last_name_en: '',
      company_ru: '',
      email: '',
      phone: '',
      password: '',
    },
  });
  const { isSubmitting } = methods.formState;

  const { handleAPIError, apiError } = useAPIError({
    setError: methods.setError,
  });

  const onSubmit = async (values: TFormValues) => {
    const { isAgreement, ...newValues } = values;

    try {
      const { success } = await Api.post(Api.routes.api.signUp(), newValues);
      if (success) {
        navigate(ROUTES.signIn());
      }
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  return (
    <Section>
      <FormProvider {...methods}>
        <form
          className="form auth-form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <FormHeader
            title={translate('Регистрация')}
            link={ROUTES.signIn()}
            linkText="Войти"
          />
          <Field label={translate('Имя')} name="first_name_ru" required />
          <Field label={translate('Фамилия')} name="last_name_ru" required />
          <Field label={translate('Компания')} name="company_ru" />
          <Field label={translate('Email')} name="email" required />
          <Field
            type="tel"
            label={translate('Телефон')}
            name="phone"
            required
          />
          <Password
            name="password"
            type="password"
            required
            label={translate('Пароль')}
            showPassword
          />
          <Checkbox required name="isAgreement">
            {translate('Я даю ')}
            <a
              href="https://g8.art/storage/docs/RegistrationConsent.pdf"
              target="_blank"
              rel="noreferrer"
              className="auth-form__agreement"
            >
              {translate('согласие на обработку персональных данных.')}
            </a>
          </Checkbox>
          <Button disabled={isSubmitting} color="black" type="submit">
            Отправить
          </Button>
          <div className="auth-form__footer">
            <VKSign />
          </div>
          {apiError && <p className="form__error-text">{apiError}</p>}
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Section>
  );
}
