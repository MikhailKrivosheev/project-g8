import React, { useEffect, useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import debounce from 'debounce-promise';

const Tags = ({ tagsValue }) => {
  return <Typography variant="body2">{tagsValue}</Typography>;
};

export default function AsyncSelect({
  loading,
  options,
  onChange,
  onInputChange,
  errors,
  name,
  variant,
  required,
  label,
  fullWidth,
  limitTags,
  disabled,
  multiple,
  asyncCallback,
  getOptionLabel,
  getOptionSelected,
  defaultValue,
  hideSelected = true,
  textFieldProps,
  filterFields = [],
  filterValue,
  renderTags,
  controlledValue,
  disableCloseOnSelect,
  disableClearable,
  disableIcon,
  reset,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    multiple ? defaultValue || [] : defaultValue || null
  );
  const [inputValue, setInputValue] = useState('');
  const [inputReason, setInputReason] = useState('input');

  const debounceUpdate = debounce(asyncCallback, 200, { leading: false });
  const debounceLoadOptions = useCallback(
    (loadString) => debounceUpdate(loadString),
    []
  );

  useEffect(() => {
    if (controlledValue) {
      setValue(controlledValue || (multiple ? [] : null));
    }
  }, [controlledValue]);

  useEffect(() => {
    if (reset) setValue(multiple ? [] : null);
  }, [reset]);

  useEffect(() => {
    if (filterValue) setValue(filterValue(value));
  }, [...filterFields]);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (inputReason !== 'reset') {
      if (asyncCallback) debounceLoadOptions(inputValue);
    }
  }, [inputValue, inputReason]);

  return (
    <Autocomplete
      open={open}
      disabled={disabled}
      disableCloseOnSelect={disableCloseOnSelect}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      options={options}
      value={value}
      limitTags={limitTags || -1}
      multiple={multiple}
      disableClearable={disableClearable}
      loading={loading}
      filterSelectedOptions={hideSelected}
      filterOptions={(x) => x}
      fullWidth={fullWidth}
      loadingText="Загрузка"
      noOptionsText="Ничего не найдено"
      autoComplete
      renderTags={
        renderTags
          ? (tagsValue) => <Tags tagsValue={renderTags(tagsValue)} />
          : undefined
      }
      getOptionLabel={getOptionLabel}
      forcePopupIcon={
        disableIcon ? !disableIcon : !disabled && Boolean(options.length)
      }
      getOptionSelected={getOptionSelected}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue, reason) => {
        if (reason === 'input') {
          setInputValue(newInputValue);
        }
        if (reason !== inputReason) setInputReason(reason);
        if (onInputChange) onInputChange(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          required={required}
          label={label}
          name={name}
          error={errors ? Boolean(errors[name]) : false}
          helperText={errors ? errors[name]?.message : null}
          variant={variant || 'outlined'}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'nope',
          }}
        />
      )}
    />
  );
}
