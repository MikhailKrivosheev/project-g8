import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ChromePicker } from 'react-color';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '200px !important',
    height: '120px !important',
  },
  label: {
    margin: theme.spacing(1, 0),
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1.5',
    letterSpacing: '0.00938em',
  },
}));

export default function ColorPicker({ name }) {
  const { control } = useFormContext();
  const pickerStyles = useStyles();

  return (
    <Box my={2} width={1}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ChromePicker
            // className={pickerStyles.root}
            color={{ hex: field.value }}
            onChange={({ hex }) => field.onChange(hex)}
          />
        )}
      />

      <div className={pickerStyles.label}>Цвет фона</div>
    </Box>
  );
}
