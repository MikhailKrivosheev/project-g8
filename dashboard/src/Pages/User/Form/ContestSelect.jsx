import Api from 'Api';
import Select from 'Components/Form/Select';
import React, { useEffect, useMemo, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function CustomSelect({ name, label }) {
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
      const { results } = await Api.get(Api.routes.contests(), {
        name_ru: value,
        count: 0,
      });
      setOptions(
        results.map((contest) => ({
          value: contest.id,
          label: contest.name_ru,
          ...contest,
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
