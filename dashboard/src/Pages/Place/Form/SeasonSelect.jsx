import Api from 'Api';
import Select from 'Components/Form/Select';
import React, { useMemo, useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function CustomAsyncSelect({ name, label }) {
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
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
      });
      setOptions(
        results.map((season) => ({
          value: season.id,
          label: season.year,
          ...season,
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
