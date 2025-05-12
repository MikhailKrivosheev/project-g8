import Api from 'Api';
import RadioButtons from 'Components/UI/Form/RadioButtons';
import useAPIError from 'Hooks/useAPIError';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import conferenceFilterAtom from 'Recoil/Atoms/ConferenceFilter';
import { IOption } from 'Types';

export default function RoomsRadio() {
  const setFilterParameterts = useSetRecoilState(conferenceFilterAtom);
  const [options, setOptions] = useState<IOption[]>([]);

  const { handleAPIError } = useAPIError();

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await Api.get(Api.routes.api.rooms());
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
    fetchRooms();
  }, []);

  if (options.length <= 0) return null;

  return (
    <RadioButtons
      name="room_id"
      className="conference__radio"
      onChange={(value) => {
        setFilterParameterts((prev) => ({
          ...prev,
          room_id: value,
        }));
      }}
      emptyOption="Все"
      options={options}
    />
  );
}
