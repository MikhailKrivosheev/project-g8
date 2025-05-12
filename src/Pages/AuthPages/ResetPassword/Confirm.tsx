import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import Button from 'Components/UI/Button';
import Password from 'Components/UI/Form/Password';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useGetParams from 'Hooks/useGetParams';
import useRoutes from 'Hooks/useRoutes';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { NavLink, useNavigate, Navigate } from 'react-router-dom';
import useTranslate from 'Hooks/useTranslate';

export default function ConfirmPassword() {
  const { token } = useGetParams();
  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const translate = useTranslate();

  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      password_confirmation: '',
    },
  });

  const { handleAPIError, clearError, apiError } = useAPIError({
    setError: methods.setError,
  });
  const onSubmit = async (values: any) => {
    try {
      const { success } = await Api.post(Api.routes.api.confirmPassword(), {
        ...values,
        token,
      });
      clearError();
      if (success) navigate(ROUTES.signIn());
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  const { isSubmitting } = methods.formState;

  if (!token) {
    return <Navigate to={ROUTES.signIn()} />;
  }

  return (
    <Section>
      <FormProvider {...methods}>
        <form className="form" onSubmit={methods.handleSubmit(onSubmit)}>
          <Password
            name="password"
            type="password"
            required
            label={translate('Пароль')}
            showPassword
          />
          <Password
            name="password_confirmation"
            type="password"
            required
            label={translate('Повторите пароль')}
            showPassword
          />
          <Button color="black" type="submit" disabled={isSubmitting}>
            Войти
          </Button>
          {apiError && <p className="form__error-text">{apiError}</p>}
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Section>
  );
}
