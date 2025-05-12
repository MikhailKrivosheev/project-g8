import { DictionaryContext } from 'Context/Dictionaries';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import Select from 'Components/Form/Select';
import { useFormContext, useWatch } from 'react-hook-form';

export default function TypeSelect({ name, label, filter }) {
  const dictionary = useContext(DictionaryContext);
  const [defaultValue, setDefaultValue] = useState({});
  const { control } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });

  const options = useMemo(() => {
    return Object.entries(dictionary.album_type).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }, []);

  useEffect(() => {
    if (!watcher) setDefaultValue({});
  }, [watcher]);

  useEffect(() => {
    if (filter[name]) {
      const option = options.find(({ value }) => value === filter[name]);
      setDefaultValue(option);
    }
  }, []);
  return (
    <Select
      options={options}
      label={label}
      name={name}
      defaultValue={defaultValue}
    />
  );
}
