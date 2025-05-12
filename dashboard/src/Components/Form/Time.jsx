import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function SimpleFormField({ label, name, rules }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { invalid, error } }) => (
        <TextField
          margin="dense"
          error={invalid}
          type="time"
          helperText={error?.message}
          defaultValue={field.value}
          onChange={field.onChange}
          fullWidth
          ampm="false"
          required={rules?.required}
          label={label}
        />
      )}
    />
  );
}
