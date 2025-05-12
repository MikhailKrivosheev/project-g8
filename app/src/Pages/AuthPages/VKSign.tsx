import useRoutes from 'Hooks/useRoutes';
import useUserActions from 'Hooks/useUserActions';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Utilities from 'Utilities';
import useTranslate from 'Hooks/useTranslate';

export default function VKSign() {
  const { fetchUser } = useUserActions();
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const translate = useTranslate();

  const receiveMessage = async (event: MessageEvent) => {
    if (event.data.event === 'auth_token') {
      const { token } = event.data;
      Utilities.apiTokenStorage.set(token);
      window.removeEventListener('message', receiveMessage);
      fetchUser();
      navigate(ROUTES.account());
    }
  };

  const handleVKSend = async () => {
    window.open(
      `${window.location.origin}/vkontakte/auth`,
      'vk auth',
      'width=700,height=500,top=100,left=100'
    );
    window.addEventListener('message', receiveMessage);
  };

  return (
    <button
      className="auth-form__vk-button"
      type="button"
      onClick={handleVKSend}
      style={{ marginLeft: 'auto ' }}
    >
      {translate('Войти через Вк')}
    </button>
  );
}
