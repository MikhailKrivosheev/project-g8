import Api from 'Api';
import Select from 'Components/UI/Form/Select';
import useAPIError from 'Hooks/useAPIError';
import useTranslate from 'Hooks/useTranslate';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import { IOption } from 'Types';

export default function ContestSelect() {
  const [options, setOptions] = useState<null | IOption[]>(null);
  const abortController = useRef(Api.generateAbortController());
  const setFilterParameterts = useSetRecoilState(workFilterAtom);
  const translate = useTranslate();
  const { handleAPIError } = useAPIError();
  const { watch, setValue } = useFormContext();
  const seasonWatcher = watch('season_id');

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();

    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.contests(),
          {
            season_id: seasonWatcher,
          },
          {
            signal: abortController.current.signal,
          }
        );
        setOptions(
          response?.results?.map(({ name, id }: any) => ({
            value: id,
            label: name,
          }))
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
      name="contest_id"
      placeholder={translate('Категория работы')}
      isGray
      disabled={options?.length <= 0}
      withEmptyOption
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          contest_id: value,
          nomination_stage: 'grand_prix',
        }));
        setValue('nomination_id', '');
      }}
      options={options}
    />
  );
}
