import React, { useRef } from 'react';
import Select from 'Components/Form/Select';
import { useFormContext } from 'react-hook-form';

const SEASONS = [
  { value: 'summer', label: 'Лето' },
  { value: 'autumn', label: 'Осень' },
  { value: 'winter', label: 'Зима' },
  { value: 'spring', label: 'Весна' },
];

export default function SeasonSelect({ name, label }) {
  const { getValues } = useFormContext();
  const defaultSeason = getValues(name);

  const defaultValue = useRef(() => {
    return SEASONS.find(({ value }) => value === defaultSeason);
  });

  return (
    <Select
      name={name}
      label={label}
      options={SEASONS}
      defaultValue={defaultValue.current}
    />
  );
}
