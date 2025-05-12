import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';

export default function SeasonsSelect({ name, label, filter }) {
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});
  const { control } = useFormContext();
  const fieldWatcher = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!fieldWatcher) setDefaultValue({});
  }, [fieldWatcher]);

  useEffect(() => {
    const fetchSeasons = async (value) => {
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
        count: 0,
      });
      if (filter[name]) {
        const defaultSeason = results.find(({ id }) => id === +filter[name]);
        setDefaultValue({
          value: defaultSeason.id,
          label: defaultSeason.year,
        });
      }
      setOptions(
        results.map((season) => ({
          value: season.id,
          label: season.year,
          ...season,
        }))
      );
    };
    fetchSeasons();
  }, []);
  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      label={label}
      options={options}
    />
  );
}
