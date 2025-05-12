import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import cn from 'classnames';
import { Controller, useFormContext } from 'react-hook-form';
import { ICallback } from 'Types';
import Description from 'Components/UI/Description';
import useTranslate from 'Hooks/useTranslate';

interface ICheckbox {
  name: string;
  children?: React.ReactNode;
  defaultChecked?: boolean;
  className?: string;
  required?: boolean;
  index?: number;
  label?: string;
  callback?: ICallback<string>;
  description?: string;
}

export default function Checkbox({
  defaultChecked,
  name,
  label,
  required,
  index,
  className,
  callback,
  children,
  description,
}: ICheckbox) {
  const id = useRef(nanoid());
  const { control } = useFormContext();

  const translate = useTranslate();

  return (
    <Controller
      rules={{ required }}
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div
          className={cn('form__checkbox-inline-wrapper', className, {
            'form__checkbox-inline-wrapper--error': fieldState.error,
          })}
        >
          <input
            hidden
            id={id.current}
            defaultChecked={defaultChecked}
            type="checkbox"
            {...field}
            onChange={(event) => {
              field?.onChange(event);
              if (callback) callback(field?.value, index);
            }}
          />
          <label className="form__checkbox-inline" htmlFor={id.current}>
            {label || children}
          </label>
          {description && (
            <Description className="form__checkbox-description">
              {translate(`${description}`)}
            </Description>
          )}
        </div>
      )}
    />
  );
}
