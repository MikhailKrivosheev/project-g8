import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { FieldError } from 'react-hook-form';
import cn from 'classnames';

interface IFieldWrapper {
  label?: string;
  required?: boolean;
  children: React.ReactElement;
  disabled?: boolean;
  error: FieldError | undefined;
}

export default function FieldWrapper({
  label,
  required = false,
  error,
  disabled = false,
  children,
}: IFieldWrapper) {
  const id = useRef(nanoid());
  const rowClassName = cn('form__row', {
    'form__row--error': error,
    'form__row--disabled': disabled,
  });
  return (
    <div className={rowClassName}>
      {label && (
        <label className="input__label" htmlFor={id.current}>
          {`${label}${required ? '*' : ''}`}
        </label>
      )}
      {React.cloneElement(children, { id: id.current })}
      {error && <span className="form__error-text">{error.message}</span>}
    </div>
  );
}
