import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const Tags = ({ tagsValue }) => {
  return <Typography variant="body2">{tagsValue}</Typography>;
};

export default function Select({
  options,
  multiple,
  label,
  getOptionLabel,
  getOptionSelected,
  disableCloseOnSelect,
  onChange,
  renderTags,
  required,
  textFieldProps,
  fullWidth,
  errors,
  limitTags,
  name,
  disabled,
  hideSelected,
  defaultValue,
  reset,
  inputRef,
  loading,
  disableClearable,
  controlledValue,
  disableBackspace,
  unregisterOnUnmount,
  inputLabelProps,
  popupIcon,
}) {
  const [value, setValue] = useState(defaultValue || (multiple ? [] : null));
  const firstMount = useRef(true);
  const { control, unregister } = useFormContext();

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue || (multiple ? [] : null));
    }
  }, [controlledValue]);

  useEffect(() => {
    if (!firstMount.current) {
      setValue(multiple ? [] : null);
    }
  }, [reset]);

  useEffect(() => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (unregisterOnUnmount) unregister(name);
    };
  }, []);

  return (
    <Autocomplete
      popupIcon={popupIcon}
      filterSelectedOptions={hideSelected}
      disableCloseOnSelect={disableCloseOnSelect}
      multiple={multiple}
      disabled={disabled}
      fullWidth={fullWidth}
      options={options}
      defaultValue={defaultValue}
      getOptionLabel={getOptionLabel}
      value={value}
      disableClearable={disableClearable}
      forcePopupIcon={!disabled}
      loading={loading}
      loadingText="Загрузка"
      noOptionsText="Ничего не найдено"
      renderTags={
        renderTags
          ? (tagsValue) => <Tags tagsValue={renderTags(tagsValue)} />
          : undefined
      }
      limitTags={limitTags || -1}
      getOptionSelected={getOptionSelected}
      onChange={(event, newValue, reason) => {
        if (reason === 'remove-option') {
          if (!disableBackspace) {
            setValue(newValue);
            onChange(newValue);
          }
        } else {
          setValue(newValue);
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          inputRef={inputRef}
          {...params}
          name={name}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          InputLabelProps={inputLabelProps}
          error={errors ? Boolean(errors[name]) : false}
          helperText={errors ? errors[name]?.message : null}
          {...textFieldProps}
          label={label}
          variant="outlined"
          required={required}
        />
      )}
    />
  );
}
