import Api from 'Api';
import Select from 'Components/UI/Form/Select';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import workFilterAtom from 'Recoil/Atoms/WorksFilter';
import { IOption } from 'Types';

export default function SeasonSelect() {
  const [options, setOptions] = useState<null | IOption[]>(null);
  const abortController = useRef(Api.generateAbortController());
  const setFilterParameterts = useSetRecoilState(workFilterAtom);
  const { reset } = useFormContext();
  const { handleAPIError } = useAPIError();

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();
    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.season(),
          {
            count: 0,
          },
          {
            signal: abortController.current.signal,
          }
        );
        setOptions(
          response?.results?.map(({ year, id }: any) => ({
            value: id,
            label: year,
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
  }, []);

  if (!options) return null;

  return (
    <Select
      name="season_id"
      onChange={(value) => {
        reset({ season_id: value });
        setFilterParameterts({ season_id: value });
      }}
      isGray
      options={options}
    />
  );
}
