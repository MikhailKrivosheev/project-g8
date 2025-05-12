import React, { useEffect, useState } from 'react';
import Select from 'Components/Form/Select';
import Api from 'Api';
import { useFormContext, useWatch } from 'react-hook-form';

export default function TypesSelect({ name, label, filter }) {
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
    const fetchTypes = async (value) => {
      const { results } = await Api.get(Api.routes.sponsorTypes(), {
        sponsor_type_id: value,
        count: 0,
      });
      if (filter[name]) {
        const defaultType = results.find(({ id }) => id === +filter[name]);
        setDefaultValue({
          value: defaultType.id,
          label: defaultType.title_ru,
        });
      }
      setOptions(
        results.map((type) => ({
          value: type.id,
          label: type.title_ru,
          ...type,
        }))
      );
    };
    fetchTypes();
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
