/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import cn from 'classnames';
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import * as selectsActive from 'Utilities/selectActive';
import { IOption, TValue } from 'Types';
import { useFormContext } from 'react-hook-form';
import SelectOption from './Options';

interface ISelect {
  name: string;
  options: IOption[];
  defaultValue?: TValue;
  multiple?: boolean;
  disabled?: boolean;
  placeholder?: string;
  isGray?: boolean;
  isDirty?: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: ({ value }: IOption) => void;
}

function SelectReborn(
  {
    defaultValue, // must be momoized
    onChange,
    options,
    isGray,
    multiple,
    name,
    placeholder,
    isDirty,
    disabled,
  }: ISelect,
  ref: React.Ref<HTMLInputElement>
) {
  const [open, setOpen] = useState(false);
  const { watch } = useFormContext();
  const [value, setValue] = useState(defaultValue || (multiple ? [] : {}));
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const firstMount = useRef(true);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const watcher = watch(name);

  const selectClasses = cn('select', {
    'select--open': open,
    'select--gray': isGray,
    'select--disabled': disabled,
  });

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const isOptionChecked = (option: IOption) => {
    if (multiple) {
      return value.some(
        (valueItem: IOption) => valueItem.value === option.value
      );
    }
    return value.value === option.value;
  };

  const updateValue = (updatedOption: IOption) => {
    if (multiple) {
      const checkedNodes = [...dropDownRef.current.children].filter(
        (node) => node.checked
      );
      const selectedOptions = checkedNodes.reduce((acc, checkedNode) => {
        const selectedOption = options.find(
          (option) => option.value === checkedNode.value
        );
        if (selectedOption) acc.push(selectedOption);
        return acc;
      }, []);
      setValue(selectedOptions);
    } else {
      setValue(updatedOption);
    }
  };

  useEffect(() => {
    if (!watcher && !firstMount.current) setValue('');
  }, [watcher]);

  useEffect(() => {
    if (!firstMount.current) setValue(defaultValue);
  }, [defaultValue]);

  const onDocumentClick = () => {
    selectsActive.close(setOpen);
  };

  useEffect(() => {
    if (!firstMount.current) {
      onChange(value);
      setOpen(false);
    }
  }, [value]);

  useEffect(() => {
    if (open) {
      selectsActive.closeAll();
      selectsActive.add(setOpen);
    } else {
      selectsActive.close(setOpen);
    }
  }, [open]);

  useEffect(() => {
    firstMount.current = false;
    document.addEventListener('click', onDocumentClick);

    return () => {
      firstMount.current = true;
      document.removeEventListener('click', onDocumentClick);
    };
  }, []);

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
      ref={ref}
      className={selectClasses}
    >
      <button
        disabled={disabled}
        onClick={toggleOpen}
        ref={toggleRef}
        className="select-toggle"
        type="button"
      >
        {value?.label || placeholder}
      </button>
      <svg width="14" height="8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m1 1 6 6 6-6"
          stroke="#201F1E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <div className="select__dropdown" ref={dropDownRef}>
        {options?.length > 0 ? (
          options.map((option) => (
            <SelectOption
              key={option.value}
              multiple={multiple}
              name={name}
              value={option.value}
              label={option.label as string}
              checked={isOptionChecked(option)}
              onChange={() => updateValue(option)}
            />
          ))
        ) : isDirty ? (
          <SelectOption label="Ничего не найдено" standalone />
        ) : null}
      </div>
    </div>
  );
}

export default forwardRef<HTMLInputElement, ISelect>(SelectReborn);
