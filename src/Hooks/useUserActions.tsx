import Api from 'Api';
import routes from 'Api/routes';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import userAtom from 'Recoil/Atoms/User';
import Utilities from 'Utilities';
import useAPIError from './useAPIError';
import useRoutes from './useRoutes';

export default function useUserActions() {
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const ROUTES = useRoutes();
  const { handleAPIError } = useAPIError();

  const fetchUser = async () => {
    Utilities.cookie.removeByName('sid');
    try {
      const { results } = await Api.get(Api.routes.api.me());
      setUser({
        logged: true,
        ...results,
      });
    } catch (error: any) {
      setUser({
        logged: false,
      });
      Utilities.apiTokenStorage.remove();
      Utilities.cookie.removeByName('sid');
      handleAPIError(error);
    }
  };

  const fetchCsrf = async () => {
    try {
      Api.get(routes.api.csrf());
    } catch (error: any) {
      handleAPIError(error);
    }
  };

  const signOut = async () => {
    await Api.post(Api.routes.api.signOut(), {});
    Utilities.apiTokenStorage.remove();
    Utilities.cookie.removeByName('sid');

    navigate(ROUTES.signIn());
  };

  return {
    fetchUser,
    signOut,
    fetchCsrf,
  };
}
