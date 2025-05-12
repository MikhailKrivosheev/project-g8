import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

export default function SearchByName({ name, label, filter }) {
  const [value, setValue] = useState(filter[name] || '');
  const { control, register, setValue: setFieldValue } = useFormContext();
  const watcher = useWatch({
    control,
    name,
  });

  useEffect(() => {
    register(name);
  }, [register]);

  useEffect(() => {
    if (!watcher) setValue('');
  }, [watcher]);

  useEffect(() => {
    setFieldValue(name, value);
  }, [value]);

  return (
    <TextField
      value={value}
      label={label}
      margin="dense"
      InputLabelProps={{
        shrink: Boolean(value),
      }}
      fullWidth
      onChange={({ target }) => setValue(target.value)}
    />
  );
}
