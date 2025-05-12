import Api from 'Api';
import AsyncSelect from 'Components/Form/Select';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function CustomAsyncSelect({ name, label, required }) {
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
    const fetchContests = async (value) => {
      const { results } = await Api.get(Api.routes.sponsorTypes(), {
        sponsor_type_id: value,
        count: 0,
      });
      setOptions(
        results.map((contest) => ({
          value: contest.id,
          label: contest.title_ru,
          ...contest,
        }))
      );
    };

    fetchContests();
  }, []);

  if (options?.length <= 0) return null;

  return (
    <AsyncSelect
      name={name}
      multiple={false}
      label={label}
      defaultValue={defaultValue}
      options={options}
      required={required}
    />
  );
}
