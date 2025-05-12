import Api from 'Api';
import Select from 'Components/Form/Select';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function PlaceSelect({ name, label }) {
  const [options, setOptions] = useState([]);
  const { control } = useFormContext();
  const watcher = useWatch({ control, name });

  const defaultValue = useMemo(() => {
    if (watcher && options?.length > 0) {
      return options.find(({ id }) => id === watcher);
    }

    return null;
  }, [options]);

  useEffect(() => {
    const fetchTerms = async (value) => {
      const { results } = await Api.get(Api.routes.rooms(), {
        name_ru: value,
        count: 0,
      });
      setOptions(
        results.map((room) => ({
          value: room.id,
          label: room.name_ru,
          ...room,
        }))
      );
    };

    fetchTerms();
  }, []);

  if (options?.length <= 0) return null;

  return (
    <Select
      name={name}
      multiple={false}
      label={label}
      defaultValue={defaultValue}
      options={options}
    />
  );
}
