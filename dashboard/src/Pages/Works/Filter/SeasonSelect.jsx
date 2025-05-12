import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';

export default function SeasonSelect({ name, label, filter, onChange }) {
  const [options, setOptions] = useState([]);
  const [defaultValue, setDefaultValue] = useState({});

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

      setOptions(optionsToSet);
    };

    fetchSeasons();
  }, []);

  useEffect(() => {
    if (!filter[name]) setDefaultValue({});
  }, [filter]);

  useEffect(() => {
    if (filter[name]) {
      // eslint-disable-next-line
      const option = options?.find(({ value }) => value == filter[name]);
      setDefaultValue(option);
    }
  }, [options]);

  if (options.length <= 0) return null;

  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      label={label}
      options={options}
      onChange={onChange}
    />
  );
}
