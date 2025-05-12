import Select from 'Components/Form/Select';
import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const OPTIONS = [
  { value: 'speaker', label: 'Спикер' },
  { value: 'curator', label: 'Куратор' },
  { value: 'judge', label: 'Жюри' },
  { value: 'user', label: 'Участник' },
  { value: 'administrator', label: 'Администратор' },
  { value: 'chairman', label: 'Председатель' },
];

export default function SortType({ name, label, filter }) {
  const [defaultValue, setDefaultValue] = useState({});
  const { control } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!watcher) setDefaultValue({});
  }, [watcher]);

  useEffect(() => {
    if (filter && filter[name]) {
      const option = OPTIONS.find(({ value }) => value === filter[name]);
      setDefaultValue(option);
    }
  }, []);
  return (
    <Select
      defaultValue={defaultValue}
      name={name}
      label={label}
      options={OPTIONS}
    />
  );
}
