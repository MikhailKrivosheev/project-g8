import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import useTranslate from 'Hooks/useTranslate';

interface IFieldWrapper {
  label?: string;
  required?: boolean;
  children: React.ReactElement;
  maxLength?: number;
  disabled?: boolean;
  name?: string;
  fullWidth?: boolean;
  error: FieldError | undefined;
}

export default function GrayFieldWrapper({
  label,
  required = false,
  error,
  maxLength,
  name,
  disabled = false,
  children,
  fullWidth = false,
}: IFieldWrapper) {
  let fieldWatcher;
  const { watch } = useFormContext();
  const translate = useTranslate();

  if (maxLength && name) fieldWatcher = watch(name);

  const id = useRef(nanoid());
  const rowClassName = cn('form__row', 'form__gray-row', {
    'form__row--error': error,
    'form__row--disabled': disabled,
    'form__gray-row--full-width': fullWidth,
  });
  return (
    <label className={rowClassName}>
      {label && (
        <div className="gray-input__label">
          {`${translate(label) || label}${required ? '*' : ''}`}
        </div>
      )}
      {maxLength && name && (
        <span className="gray-input__count">
          {fieldWatcher?.length || 0} / {maxLength}
        </span>
      )}
      {React.cloneElement(children, { id: id.current })}
      {error && <span className="form__error-text">{error.message}</span>}
    </label>
  );
}
