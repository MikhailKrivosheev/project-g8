/* eslint-disable jsx-a11y/label-has-for */
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { IOption } from 'Types';
import CustomSelect from './Select';

interface ISelect {
  rules?: object;
  name: string;
  options: IOption[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isGray?: boolean;
  withEmptyOption?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: number) => void;
}

export default function Select({
  name,
  rules,
  required,
  disabled,
  options,
  onChange,
  isGray,
  withEmptyOption,
  ...rest
}: ISelect) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: required ? 'Required field' : false,
        ...rules,
      }}
      render={({
        field: { onChange: onFieldChange, value: selectValue, ...restField },
        fieldState,
      }) => {
        const defaultOption = useRef(
          options.find(
            ({ value }) => value?.toString() === selectValue?.toString()
          )
        );
        return (
          <CustomSelect
            disabled={disabled}
            {...restField}
            {...fieldState}
            {...rest}
            isGray={isGray}
            defaultValue={defaultOption.current}
            onChange={({ value }: IOption) => {
              if (onChange) onChange(value);
              onFieldChange(value);
            }}
            options={
              withEmptyOption
                ? [{ value: '', label: 'Не выбрано' }, ...options]
                : options
            }
          />
        );
      }}
    />
  );
}
