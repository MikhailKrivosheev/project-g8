import React, { useEffect, useState, useRef } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';

export default function SeasonSelect({ name, label }) {
  const [options, setOptions] = useState([]);
  const { control } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });
  const defaultValue = useRef();

  useEffect(() => {
    const fetchSeasons = async (value) => {
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
        count: 0,
      });

      const optionsToSet = results.map((season) => ({
        value: season.id,
        label: season.year,
      }));

      defaultValue.current = optionsToSet.find(
        // eslint-disable-next-line eqeqeq
        ({ value: valueOption }) => valueOption == watcher
      );
      setOptions(optionsToSet);
    };

    fetchSeasons();
  }, []);

  if (options.length <= 0) return null;

  return (
    <Select
      defaultValue={defaultValue.current}
      name={name}
      // controlledValue={options.find(({ value }) => value === watcher)}
      label={label}
      options={options}
    />
  );
}
