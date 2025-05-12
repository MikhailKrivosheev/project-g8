/* eslint-disable react/jsx-no-useless-fragment */
import { nanoid } from 'nanoid';
import React, { forwardRef, useRef } from 'react';
import { FieldError } from 'react-hook-form';
import cn from 'classnames';
import FieldWrapper from './Wrapper';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  name: string;
  error?: FieldError | undefined;
}

function Input(
  {
    type = 'text',
    value,
    required,
    id,
    onChange,
    name,
    error,
    label,
    placeholder,
    className,
  }: IInput,
  ref: React.Ref<HTMLInputElement>
) {
  const componentId = useRef(id || `form-field-${nanoid()}`);
  const classNames = cn('input', className);

  return (
    <>
      {label ? (
        <FieldWrapper label={label} error={error} required={required}>
          <input
            value={value}
            className={classNames}
            id={componentId.current}
            ref={ref}
            type={type}
            onChange={onChange}
            name={name}
            placeholder={placeholder}
          />
        </FieldWrapper>
      ) : (
        <input
          value={value}
          ref={ref}
          className={classNames}
          id={componentId.current}
          required={required}
          type={type}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
        />
      )}
    </>
  );
}

export default forwardRef<HTMLInputElement, IInput>(Input);
