/* eslint-disable react/jsx-no-useless-fragment */
import classNames from 'classnames';
import { nanoid } from 'nanoid';
import React, { forwardRef, useRef, useState } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import FieldWrapper from './Wrapper';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  maxLength?: number;
  label?: string;
  value?: string;
  fullWidth?: boolean;
  closeButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: FieldError | undefined;
}

function GrayInput(
  {
    type = 'text',
    fullWidth,
    value,
    required,
    id,
    onChange,
    name,
    maxLength,
    closeButton = false,
    error,
    label,
    placeholder,
  }: IInput,
  ref: React.Ref<HTMLInputElement>
) {
  const [isVisible, setVisible] = useState(false);
  const componentId = useRef(id || `form-field-${nanoid()}`);
  const { setValue, watch } = useFormContext();
  const watcher = watch(name);
  const inputClassNames = classNames('gray-input', {
    'gray-input--visible': isVisible || value,
  });

  return (
    <>
      <FieldWrapper
        label={label}
        error={error}
        fullWidth={fullWidth}
        name={name}
        required={required}
        maxLength={maxLength}
      >
        {type === 'textarea' ? (
          <textarea
            className={inputClassNames}
            id={componentId.current}
            ref={ref}
            value={value}
            onFocus={() => setVisible(true)}
            onBlur={() => setVisible(false)}
            type={type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { target } = event;
              target.style.height = 'auto';
              target.style.height = `${event?.target?.scrollHeight}px`;
              if (onChange) {
                onChange(event);
              }
            }}
            name={name}
            placeholder={placeholder}
          />
        ) : (
          <>
            <input
              className={inputClassNames}
              id={componentId.current}
              ref={ref}
              onFocus={() => setVisible(true)}
              onBlur={() => setVisible(false)}
              type={type}
              value={value}
              onChange={onChange}
              name={name}
              placeholder={placeholder}
            />
            {closeButton && watcher && (
              <button
                type="button"
                className="gray-input__cross"
                onClick={() => setValue(name, '')}
              >
                reset input
              </button>
            )}
          </>
        )}
      </FieldWrapper>
    </>
  );
}

export default forwardRef<HTMLInputElement, IInput>(GrayInput);
