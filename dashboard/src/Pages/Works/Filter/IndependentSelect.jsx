import { DictionaryContext } from 'Context/Dictionaries';
import React, { useEffect, useState, useMemo, useContext } from 'react';
import Select from 'Components/Form/Select';

export default function IndependentSelect({ name, label, filter, filterType }) {
  const dictionary = useContext(DictionaryContext);
  const [defaultValue, setDefaultValue] = useState({});

  const options = useMemo(() => {
    return Object.entries(dictionary[filterType]).map(([key, value]) => ({
      value: key,
      label: value,
    }));
  }, []);

  useEffect(() => {
    if (filter && !filter[name]) setDefaultValue({});
  }, [filter]);

  useEffect(() => {
    if (filter && filter[name]) {
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
