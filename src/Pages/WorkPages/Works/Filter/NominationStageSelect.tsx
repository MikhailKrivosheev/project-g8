import Select from 'Components/UI/Form/Select';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dictionaryAtom from 'Recoil/Atoms/dictionary';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import useTranslate from 'Hooks/useTranslate';
import { IOption } from 'Types';
import Api from 'Api';
import useAPIError from 'Hooks/useAPIError';
import { useFormContext } from 'react-hook-form';

export default function NominationStageSelect() {
  const [options, setOptions] = useState<null | IOption[]>(null);
  const setFilterParameterts = useSetRecoilState(workFilterAtom);
  const abortController = useRef(Api.generateAbortController());
  const translate = useTranslate();
  const { handleAPIError } = useAPIError();
  const { watch } = useFormContext();
  const seasonWatcher = watch('season_id');

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();

    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.nominationStage(),
          {
            season_id: seasonWatcher,
          },
          {
            signal: abortController.current.signal,
          }
        );

        setOptions(
          Object.entries(response?.results?.nomination_work_stage).map(
            ([first, second]: any) => ({
              value: first,
              label: second,
            })
          )
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };

    if (seasonWatcher) fetchOptions();
    return () => {
      abortController.current.abort();
    };
  }, [seasonWatcher]);

  if (!options) return null;

  return (
    <Select
      name="nomination_stage"
      placeholder={translate('Все этапы')}
      withEmptyOption
      isGray
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          nomination_stage: value,
        }));
      }}
      options={options}
    />
  );
}
