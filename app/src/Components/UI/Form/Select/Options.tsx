import { nanoid } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

interface ISelectOption {
  label: string;
  value?: string | number;
  multiple?: boolean;
  name?: string;
  checked?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange?(event: React.FormEvent<HTMLInputElement>): void;
  standalone?: boolean;
}

export default function SelectOption({
  label,
  value,
  multiple,
  name,
  checked = false,
  onChange,
  standalone = false,
}: ISelectOption) {
  const id = useRef(nanoid());
  const ref = useRef<HTMLInputElement>(null);
  const [state, setState] = useState(checked);

  const classNames = cn('select__item', {
    'select__item--standalone': standalone,
  });

  useEffect(() => {
    setState(checked);
  }, [checked]);

  if (standalone) {
    return <div className={classNames}>{label}</div>;
  }

  return (
    <>
      <input
        type={multiple ? 'checkbox' : 'radio'}
        hidden
        ref={ref}
        checked={state}
        name={name}
        value={value}
        onChange={onChange}
        id={id.current}
      />
      <label className="select__item" htmlFor={id.current}>
        {label}
      </label>
    </>
  );
}
