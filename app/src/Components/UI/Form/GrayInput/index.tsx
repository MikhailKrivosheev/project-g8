import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import GrayInput from './Input';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  rules?: object;
  name: string;
  fullWidth?: boolean;
  shouldUnregister?: boolean;
  label?: string;
  value?: string;
  closeButton?: boolean;
  showPassword?: boolean;
}

export default function GrayField({
  name,
  rules,
  maxLength,
  required,
  fullWidth,
  shouldUnregister = true,
  closeButton,
  ...rest
}: IInput) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        required: required ? 'Обязательное поле' : false,
        maxLength: maxLength
          ? {
              value: maxLength,
              message: 'Превышено максимальное количество символов',
            }
          : 1500,
        ...rules,
      }}
      shouldUnregister={shouldUnregister}
      name={name}
      render={({ field, fieldState }) => (
        <GrayInput
          fullWidth={fullWidth}
          closeButton={closeButton}
          {...field}
          {...fieldState}
          maxLength={maxLength}
          error={fieldState?.error}
          required={required}
          {...rest}
        />
      )}
    />
  );
}
