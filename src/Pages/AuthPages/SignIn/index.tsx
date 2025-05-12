import { DevTool } from '@hookform/devtools';
import Api from 'Api';
import Button from 'Components/UI/Button';
import Field from 'Components/UI/Form/Field';
import Password from 'Components/UI/Form/Password';
import Section from 'Components/UI/Section';
import useAPIError from 'Hooks/useAPIError';
import useRoutes from 'Hooks/useRoutes';
import useUserActions from 'Hooks/useUserActions';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Utilities from 'Utilities';
import useTranslate from 'Hooks/useTranslate';
import FormHeader from '../FormHeader';
import VKSign from '../VKSign';

export default function SignIn() {
  const ROUTES = useRoutes();
  const navigate = useNavigate();
  const translate = useTranslate();
  const { fetchUser } = useUserActions();
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleAPIError, clearError, apiError } = useAPIError({
    setError: methods.setError,
  });

  const { isSubmitting } = methods.formState;

  const onSubmit = async (values: any) => {
    try {
      const { results } = await Api.post(Api.routes.api.signIn(), values);
      clearError();
      const { api_token: apiToken } = results;
      Utilities.apiTokenStorage.set(apiToken);
      fetchUser();
      navigate(ROUTES.account());
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
            title={translate('Вход')}
            link={ROUTES.signUp()}
            linkText={translate('Зарегистрироваться')}
          />
          <Field label="Email" name="email" required />
          <Password
            name="password"
            type="password"
            required
            label={translate('Пароль')}
            showPassword
          />
          <Button color="black" type="submit" disabled={isSubmitting}>
            Войти
          </Button>
          <div className="auth-form__footer">
            <Link to={ROUTES.passwordReset()}>
              {translate('Не помню пароль')}
            </Link>
            <VKSign />
          </div>
          {apiError && <p className="form__error-text">{apiError}</p>}
        </form>
        <DevTool control={methods.control} />
      </FormProvider>
    </Section>
  );
}
