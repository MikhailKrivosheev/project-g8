import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import FileInput from './FileInput';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  rules?: object;
  name: string;
  shouldUnregister?: boolean;
  label?: string;
  value?: string;
  showPassword?: boolean;
  text?: string;
  maxSize?: number;
  error?: {
    message?: string;
  };
}

export default function Field({
  name,
  rules,
  required,
  text,
  shouldUnregister = true,
  maxSize,
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
        <FileInput
          {...field}
          {...fieldState}
          error={fieldState?.error}
          text={text}
          required={required}
          maxSize={maxSize}
          {...rest}
        />
      )}
    />
  );
}
