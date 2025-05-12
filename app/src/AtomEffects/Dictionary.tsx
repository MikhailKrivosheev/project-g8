import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import Api from 'Api';
import routes from 'Api/routes';
import useAPIError from 'Hooks/useAPIError';

const params = {
  name: [
    'account_role',
    'account_status',
    'season_contest_stage_code',
    'season_payment_system',
    'work_status',
    'payment_product',
    'payment_status',
    'sponsor_type_block_type',
    'cost_type',
    'album_type',
    'judge_type',
    'nomination_work_stage',
  ],
};

export default function DictionaryEffect() {
  const setDictionary = useSetRecoilState(dictionaryAtom);
  const { handleAPIError } = useAPIError();

  const lang = useRecoilValue(LangAtom);

  useEffect(() => {
    async function fetchDictionary() {
      try {
        const { results } = await Api.get(routes.api.dictionary(), params);
        setDictionary(results);
      } catch (error: any) {
        handleAPIError(error);
      }
    }

    fetchDictionary();
  }, [lang]);

  return null;
}
