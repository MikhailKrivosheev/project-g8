import AsyncSelect from 'Components/Form/Common/SelectAsync';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function CommonSelectAsync({
  name,
  label,
  asyncCallback,
  defaultValue,
  options,
  multiple = false,
  reset,
  required,
}) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AsyncSelect
          multiple={multiple}
          defaultValue={defaultValue}
          fullWidth
          label={label}
          textFieldProps={{
            margin: 'dense',
          }}
          reset={reset}
          asyncCallback={asyncCallback}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label || ''}
          getOptionSelected={(option, value) => option.value === value.value}
          options={options}
          onChange={(value) => {
            field.onChange(
              multiple ? value?.map((item) => item.value) : value?.value
            );
          }}
          required={required}
        />
      )}
    />
  );
}
