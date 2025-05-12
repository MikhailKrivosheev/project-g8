import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import PasswordInput from './PasswordInput';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  rules?: object;
  name: string;
  shouldUnregister?: boolean;
  label?: string;
  value?: string;
  showPassword?: boolean;
}

export default function Password({
  name,
  rules,
  required,
  shouldUnregister = true,
  ...rest
}: IInput) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        required: required ? 'Обязательное поле' : false,
        ...rules,
      }}
      shouldUnregister={shouldUnregister}
      name={name}
      render={({ field, fieldState }) => (
        <PasswordInput
          {...field}
          {...fieldState}
          error={fieldState?.error}
          required={required}
          {...rest}
        />
      )}
    />
  );
}
