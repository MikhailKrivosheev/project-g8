import { TextField } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';

const REQUIRED_MESSAGE = 'Поле обязательно для заполнения';

export default function SimpleFormField({
  label,
  name,
  rules,
  required,
  defaultValue,
  multiline,
  minRows,
  maxRows,
  variant,
  unregisterOnUnmount,
  className,
  type,
  maxLength,
}) {
  const { control, unregister } = useFormContext();

  const requiredOption = useMemo(() => {
    if (required) {
      if (typeof required === 'string') return required;
      return REQUIRED_MESSAGE;
    }
    return false;
  }, [required]);

  useEffect(() => {
    return () => {
      if (unregisterOnUnmount) unregister(name);
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ ...rules, required: requiredOption }}
      render={({ field, fieldState: { invalid, error } }) => (
        <InputMask
          mask="9(999)999-99-99"
          value={field.value}
          onChange={field.onChange}
        >
          {(inputProps) => (
            <TextField
              margin="dense"
              inputRef={field?.ref}
              error={invalid}
              helperText={error?.message}
              defaultValue={field.value}
              // onChange={field.onChange}
              fullWidth
              multiline={multiline}
              maxLength={maxLength}
              minRows={minRows}
              maxRows={maxRows}
              required={required}
              label={label}
              variant={variant}
              className={className}
              type={type}
              autoComplete="new-password"
            />
          )}
        </InputMask>
      )}
    />
  );
}
