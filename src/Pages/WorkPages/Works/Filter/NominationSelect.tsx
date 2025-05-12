import Api from 'Api';
import Select from 'Components/UI/Form/Select';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import useTranslate from 'Hooks/useTranslate';
import { IOption } from 'Types';

export default function NomintaionSelect() {
  const [options, setOptions] = useState<null | IOption[]>(null);
  const setFilterParameterts = useSetRecoilState(workFilterAtom);
  const abortController = useRef(Api.generateAbortController());
  const { handleAPIError } = useAPIError();
  const { watch } = useFormContext();
  const translate = useTranslate();
  const contestWatcher = watch('contest_id');

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();
    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.nomination(),
          {
            contest_id: contestWatcher,
          },
          {
            signal: abortController.current.signal,
          }
        );
        setOptions(
          response?.results?.map(({ name: nameRu, id }: any) => ({
            value: id,
            label: nameRu,
          }))
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    };
    fetchOptions();
    return () => {
      abortController.current.abort();
    };
  }, [contestWatcher]);

  if (!options) return null;

  return (
    <Select
      name="nomination_id"
      withEmptyOption
      placeholder={translate('Все номинации')}
      disabled={options?.length <= 0 || !contestWatcher}
      isGray
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          nomination_id: value,
        }));
      }}
      options={options}
    />
  );
}
