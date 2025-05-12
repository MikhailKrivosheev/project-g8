import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Input from './Input';

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

export default function Field({
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
        <Input
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
