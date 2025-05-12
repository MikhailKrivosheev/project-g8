import Api from 'Api';
import routes from 'Api/routes';
import useAPIError from 'Hooks/useAPIError';
import LangAtom from 'Recoil/Atoms/Lang';
import settingsAtom from 'Recoil/Atoms/SettingsAtom';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function SeasonEffect() {
  const setSettings = useSetRecoilState(settingsAtom);
  const { handleAPIError } = useAPIError();

  const lang = useRecoilValue(LangAtom);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { results } = await Api.get(routes.api.settings());
        setSettings(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    fetchSettings();
  }, [lang]);

  return null;
}
