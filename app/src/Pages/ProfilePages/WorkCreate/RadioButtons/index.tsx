import cn from 'classnames';
import ContestBillet from 'Components/ContestType';
import { nanoid } from 'nanoid';
import React, { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import RadioButton from './RadioButton';

export default function RadioButtons({
  options,
  name,
  data,
  disabled,
  setActiveNominations,
  required,
}: any) {
  const advertisingOptions = options.filter(
    ({ type }) => type === 'creative_advertising'
  );

  const industriesOptions = options.filter(
    ({ type }) => type === 'creative_industries'
  );

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const id = useRef(nanoid());

  const rowClassName = cn('form__row', 'contests-radio', {
    'form__row--error': errors[name],
    'form__row--disabled': disabled,
  });

  return (
    <>
      {advertisingOptions?.length > 0 && (
        <div className={rowClassName}>
          <ContestBillet
            type="creative_advertising"
            className="contests-radio__contest-type"
            color="dark-blue"
            isUpperCase
          />
          {advertisingOptions.map((option: any, index: any) => (
            <Controller
              name={name}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              control={control}
              rules={{
                required: required ? 'Required field' : false,
              }}
              render={({ field }) => (
                <RadioButton
                  onChange={field.onChange}
                  id={id.current}
                  label={option?.label}
                  data={data}
                  setActiveNominations={setActiveNominations}
                  name={field.name}
                  value={option.value}
                />
              )}
            />
          ))}
          {errors[name] && (
            <span className="form__error-text">{errors[name]?.message}</span>
          )}
        </div>
      )}
      {industriesOptions?.length > 0 && (
        <div className={rowClassName}>
          <ContestBillet
            type="creative_industries"
            className="contests-radio__contest-type"
            color="gray"
            isUpperCase
          />
          {industriesOptions.map((option: any, index: any) => (
            <Controller
              name={name}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              control={control}
              rules={{
                required: required ? 'Required field' : false,
              }}
              render={({ field }) => (
                <RadioButton
                  onChange={field.onChange}
                  id={id.current}
                  label={option?.label}
                  data={data}
                  setActiveNominations={setActiveNominations}
                  name={field.name}
                  value={option.value}
                />
              )}
            />
          ))}
          {errors[name] && (
            <span className="form__error-text">{errors[name]?.message}</span>
          )}
        </div>
      )}
    </>
  );
}
