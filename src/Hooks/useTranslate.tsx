import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import LangAtom from 'Recoil/Atoms/Lang';
import { translate as translateUtility } from 'Utilities/translate';

export default function useTranslate() {
  const lang = useRecoilValue(LangAtom);

  const translatePhrase = useCallback(
    (item: string) => {
      return translateUtility(item, lang);
    },
    [lang]
  );

  return translatePhrase;
}
