import Api from 'Api';
import AsyncSelect from 'Components/Form/SelectAsync';
import React, { useMemo, useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function CustomAsyncSelect({ name, label, required }) {
  const [options, setOptions] = useState([]);
  const { control } = useFormContext();
  const watcher = useWatch({ control, name });

  const defaultValue = useMemo(() => {
    if (watcher) {
      return watcher.map((item) => {
        return {
          value: item?.id,
          label: `${item.first_name_ru} ${item.last_name_ru}`,
        };
      });
    }

    return null;
  }, []);

  const fetchTerms = async (value) => {
    const { results } = await Api.get(Api.routes.users(), {
      first_name_ru: value,
      role: 'curator',
      count: 0,
    });
    setOptions(
      results.map((user) => ({
        value: user.id,
        label: `${user.first_name_ru} ${user.last_name_ru}`,
        ...user,
      }))
    );
  };

  return (
    <AsyncSelect
      name={name}
      multiple
      label={label}
      defaultValue={defaultValue}
      options={options}
      asyncCallback={fetchTerms}
      required={required}
    />
  );
}
