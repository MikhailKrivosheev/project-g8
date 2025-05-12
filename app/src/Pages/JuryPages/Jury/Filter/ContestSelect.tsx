import Api from 'Api';
import Select from 'Components/UI/Form/Select';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import juryFilterAtom from 'Recoil/Atoms/JuryFilter';
import seasonAtom from 'Recoil/Atoms/Season';
import useTranslate from 'Hooks/useTranslate';

export default function ContestSelect() {
  const [options, setOptions] = useState([]);
  const season = useRecoilValue(seasonAtom);
  const setFilterParameterts = useSetRecoilState(juryFilterAtom);
  const { handleAPIError } = useAPIError();
  const abortController = useRef(Api.generateAbortController());
  const translate = useTranslate();

  useEffect(() => {
    abortController.current.abort();
    abortController.current = Api.generateAbortController();

    const fetchOptions = async () => {
      try {
        const response = await Api.get(
          Api.routes.api.contests(),
          {
            season_id: season?.id,
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

    fetchOptions();
    return () => {
      abortController.current.abort();
    };
  }, []);

  if (!options?.length) return null;

  return (
    <Select
      name="contest_id"
      placeholder={translate('Все категории')}
      isGray
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          contest_id: value,
        }));
      }}
      withEmptyOption
      options={options}
    />
  );
}
