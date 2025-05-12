import React, { HTMLProps, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { nanoid } from 'nanoid';
import { IOption } from 'Types';
import RadioButton from './RadioButton';

interface IRadioButtons extends HTMLProps<HTMLButtonElement> {
  options: IOption[];
  emptyOption?: string;
}

export default function RadioButtons({
  options,
  name = '',
  emptyOption,
  label: inputLabel,
  disabled,
  className,
  onChange,
  required,
}: IRadioButtons) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const id = useRef(nanoid());

  const rowClassName = cn('form__row', className, 'form__radio', {
    'form__row--error': errors[name],
    'form__row--disabled': disabled,
  });

  return (
    <div className={rowClassName}>
      {inputLabel && (
        <label className="form__label" htmlFor={id.current}>
          {inputLabel}
          {required ? '*' : ''}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Required field' : false,
        }}
        render={({ field }) => (
          <>
            {emptyOption && (
              <RadioButton
                onChange={onChange}
                option={{
                  label:
                    typeof emptyOption === 'string'
                      ? emptyOption
                      : 'Не выбрано',
                  value: '',
                }}
                field={field}
              />
            )}
            {options.map((option, index) => (
              <RadioButton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onChange={onChange}
                option={option}
                field={field}
              />
            ))}
          </>
        )}
      />
      {errors[name] && (
        <span className="form__error-text">{errors[name]?.message}</span>
      )}
    </div>
  );
}
