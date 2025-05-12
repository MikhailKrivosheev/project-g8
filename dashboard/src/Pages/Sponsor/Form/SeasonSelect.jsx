import Api from 'Api';
import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import { useFormContext } from 'react-hook-form';

export default function SeasonSelect({ name, label, required }) {
  const [options, setOptions] = useState();
  const [defaultValue, setDefaultValue] = useState({});
  const { getValues } = useFormContext();

  useEffect(() => {
    const fetchSeasons = async (value) => {
      const { results } = await Api.get(Api.routes.seasons(), {
        year: value,
        count: 0,
      });

      const defaultSeason = results.find(({ id }) => id === getValues(name));

      setDefaultValue({
        value: defaultSeason?.id,
        label: defaultSeason?.year,
      });

      setOptions(
        results.map((season) => ({
          value: season.id,
          label: season.year,
        }))
      );
    };
    fetchSeasons();
  }, []);

  if (!options) return null;

  return (
    <Select
      name={name}
      label={label}
      options={options}
      required={required}
      defaultValue={defaultValue}
    />
  );
}
