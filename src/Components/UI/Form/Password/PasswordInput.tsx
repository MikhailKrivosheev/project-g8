import { nanoid } from 'nanoid';
import React, { useRef, useState, forwardRef } from 'react';
import cn from 'classnames';
import PasswordIcon from 'Icons/PasswordIcon';
import { FieldError } from 'react-hook-form';
import FieldWrapper from '../Wrapper';

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  showPassword?: boolean;
  name: string;
  error?: FieldError | undefined;
}

function PasswordInput(
  {
    type = 'text',
    value,
    required,
    id,
    onChange,
    name,
    label,
    error,
    placeholder,
    showPassword = false,
  }: IInput,
  ref: React.Ref<HTMLInputElement>
) {
  const componentId = useRef(id || `form-field-${nanoid()}`);
  const [inputType, setInputType] = useState('password');
  const inputClassNames = cn('input', {
    'input--with-toggle': type === 'password' && showPassword,
  });

  const buttonClassNames = cn('input__show-button', {
    'input__show-button--hidden': inputType === 'password',
  });

  function changeType() {
    setInputType(inputType === 'password' ? 'text' : 'password');
  }

  return (
    <FieldWrapper label={label} error={error} required={required}>
      <>
        <input
          defaultValue={value}
          className={inputClassNames}
          id={componentId.current}
          required={required}
          type={inputType}
          onChange={onChange}
          ref={ref as React.Ref<HTMLInputElement>}
          name={name}
          placeholder={placeholder}
        />
        {showPassword && (
          <button
            className={buttonClassNames}
            type="button"
            onClick={() => {
              changeType();
            }}
          >
            <PasswordIcon />
          </button>
        )}
      </>
    </FieldWrapper>
  );
}

export default forwardRef<HTMLInputElement, IInput>(PasswordInput);
