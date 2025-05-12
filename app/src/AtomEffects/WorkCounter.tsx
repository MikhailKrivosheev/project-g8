import Api from 'Api';
import routes from 'Api/routes';
import workCounterAtom from 'Recoil/Atoms/WorksCounter';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useAPIError from 'Hooks/useAPIError';
import userAtom from 'Recoil/Atoms/User';
import userRoleSelector from 'Recoil/Selectors/UserRole';

export default function WorkCounterEffect() {
  const setWorkCounter = useSetRecoilState(workCounterAtom);
  const user = useRecoilValue(userAtom);
  const { isJudge } = useRecoilValue(userRoleSelector);
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    async function fetchWorkCounter() {
      try {
        const { results } = await Api.get(routes.api.votingState());
        setWorkCounter(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    if (isJudge) {
      fetchWorkCounter();
    }
  }, [user]);

  return null;
}
