/* eslint-disable react/no-array-index-key */
import React, {
  HTMLProps,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import cn from 'classnames';
import { ICallback, IOption } from 'Types';
import CheckboxTab from './CheckboxTab';

interface ICheckboxTabs extends HTMLProps<HTMLButtonElement> {
  options: IOption[];
  callback: ICallback<string[]>;
}

export default function CheckboxTabs({
  options,
  name = '',
  callback,
  className,
  disabled,
  required,
}: ICheckboxTabs) {
  const {
    formState: { errors },
    watch,
    control,
    setValue,
  } = useFormContext();

  const tabsWatcher = watch(name);
  const [tabs, setTabs] = useState<string[]>(
    tabsWatcher?.length > 0 ? tabsWatcher : []
  );

  const firstMount = useRef(true);

  const rowClassName = cn('form__row', 'form__radio', className, {
    'form__row--error': errors[name],
    'form__row--disabled': disabled,
  });

  const updateTabs = useCallback((tabValue: string, isChecked: boolean) => {
    if (!isChecked) {
      setTabs((prev) =>
        prev.filter((elementValue) => elementValue !== tabValue)
      );
    } else {
      setTabs((prev) => [...prev, tabValue]);
    }
  }, []);

  useEffect(() => {
    if (!firstMount.current && tabs?.length > 0) {
      setValue(name, tabs);
      if (callback) callback(tabs);
    }
  }, [tabs]);

  useEffect(() => {
    if (!firstMount.current && tabsWatcher?.length <= 0) {
      setTabs([]);
    }
  }, [tabsWatcher]);

  useEffect(() => {
    if (tabs?.length === 0 && tabsWatcher > 0) {
      setValue(name, []);
      callback([]);
    }
  }, [tabs, tabsWatcher]);

  useEffect(() => {
    firstMount.current = false;
  }, []);

  return (
    <div className={rowClassName}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? 'Required field' : false,
        }}
        render={() => (
          <>
            {options.map((option, index) => {
              return (
                <CheckboxTab
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  option={option}
                  isChecked={tabsWatcher.includes(option?.value?.toString())}
                  updateTabs={updateTabs}
                />
              );
            })}
          </>
        )}
      />

      {errors[name] && (
        <span className="form__error-text">{errors[name]?.message}</span>
      )}
    </div>
  );
}
