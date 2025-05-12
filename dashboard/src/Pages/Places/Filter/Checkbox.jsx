import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function FilterCheckbox({ name, label, filter }) {
  const [checked, setChecked] = useState(filter[name] || false);
  const { control, register, setValue } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });

  useEffect(() => {
    register(name);
  }, [register]);

  useEffect(() => {
    if (!watcher) setChecked(false);
  }, [watcher]);

  useEffect(() => {
    setValue(name, checked || '');
  }, [checked]);

  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox
          checked={checked}
          color="primary"
          onChange={({ target }) => setChecked(target.checked)}
        />
      }
    />
  );
}
