import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import Button from 'Components/UI/Button';
import Field from 'Components/UI/Form/Field';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useTranslate from 'Hooks/useTranslate';
import FormHeader from '../FormHeader';

export default function ResetPassword() {
  const [email, setEmail] = useState<string | null>(null);
  const ROUTES = useRoutes();
  const translate = useTranslate();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const { isSubmitting } = methods.formState;

  const { handleAPIError, clearError, apiError } = useAPIError({
    setError: methods.setError,
  });

  const onSubmit = async (values: { email: string }) => {
    try {
      const response = await Api.post(Api.routes.api.resetPassword(), values);
      if (response?.success) setEmail(values?.email);
      clearError();
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  return (
    <Section>
      {email ? (
        <p>
          {translate('Для сброса пароля перейдите на')}{' '}
          <span style={{ color: '#ed0e00' }}>{`${email}`}</span>{' '}
          {translate('и следуйте инструкции')}
        </p>
      ) : (
        <FormProvider {...methods}>
          <form
            className="form auth-form"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <FormHeader
              title={translate('Восстановить пароль')}
              link={ROUTES.signIn()}
              linkText={translate('Войти')}
            />
            <Field label="Email" name="email" required />
            <Button disabled={isSubmitting} color="black" type="submit">
              Отправить
            </Button>
            {apiError && <p className="form__error-text">{apiError}</p>}
          </form>
          <DevTool control={methods.control} />
        </FormProvider>
      )}
    </Section>
  );
}
