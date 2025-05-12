import Api from 'Api';
import CheckboxTabs from 'Components/UI/Form/CheckboxTabs';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import conferenceFilterAtom from 'Recoil/Atoms/ConferenceFilter';
import { IOption } from 'Types';

export default function Tags() {
  const setFilterParameterts = useSetRecoilState(conferenceFilterAtom);

  const [options, setOptions] = useState<IOption[]>([]);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await Api.get(Api.routes.api.tags());
        setOptions(
          response?.results?.map(
            ({ id, name }: { id: number; name: string }) => ({
              value: id,
              label: name,
            })
          )
        );
      } catch (error: any) {
        handleAPIError(error);
      }
    }
    fetchTags();
  }, []);

  if (options.length <= 0) return null;
  return (
    <CheckboxTabs
      required
      name="tag_ids"
      className="conference-tabs"
      callback={(tabs) => {
        setFilterParameterts((prev) => ({ ...prev, tag_ids: tabs }));
      }}
      options={options}
    />
  );
}
