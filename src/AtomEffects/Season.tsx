import Api from 'Api';
import routes from 'Api/routes';
import LangAtom from 'Recoil/Atoms/Lang';
import seasonAtom from 'Recoil/Atoms/Season';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import useAPIError from 'Hooks/useAPIError';

export default function SeasonEffect() {
  const setSeason = useSetRecoilState(seasonAtom);
  const { handleAPIError } = useAPIError();

  const lang = useRecoilValue(LangAtom);

  useEffect(() => {
    async function fetchSeason() {
      try {
        const { results } = await Api.get(routes.api.currentSeason());
        setSeason(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    fetchSeason();
  }, [lang]);

  return null;
}
