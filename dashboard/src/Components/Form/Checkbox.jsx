/* eslint-disable prettier/prettier */
import { Box, Checkbox, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function SimpleFormCheckbox({ name, label, ...rest }) {
  const { control } = useFormContext();
  return (
    <Box my={2}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            label={label}
            control={(
              <Checkbox
                checked={field.value}
                name={field.name}
                value="on"
                color="primary"
                onChange={field.onChange}
                {...rest}
              />
            )}
          />
        )}
      />
    </Box>
  );
}
