import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useEffect, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export default function TextInput({
  label,
  name,
  rules,
  required,
  defaultValue,
  multiline,
  minRows,
  maxRows,
  variant,
  unregisterOnUnmount,
  className,
  type,
  maxLength,
  fullWidth = true,
}) {
  const { control, unregister, setValue } = useFormContext();

  const requiredOption = useMemo(() => {
    if (required) {
      return 'Обязательное поле';
    }
    return false;
  }, [required]);

  useEffect(() => {
    return () => {
      if (unregisterOnUnmount) unregister(name);
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{ ...rules, required: requiredOption }}
      render={({ field, fieldState }) => (
        <TextField
          margin="dense"
          inputRef={field?.ref}
          error={fieldState.invalid}
          defaultValue={field.value}
          onChange={field.onChange}
          fullWidth={fullWidth}
          multiline={multiline}
          maxLength={maxLength}
          minRows={minRows}
          maxRows={maxRows}
          required={required}
          label={!field.value ? label : ''}
          InputLabelProps={{
            className: 'season-form__input-label',
            shrink: false,
          }}
          variant={variant}
          className={`season-form__input-holder ${className}`}
          type={type}
          autoComplete="new-password"
          InputProps={{
            endAdornment: field.value && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Очистить поле"
                  onClick={() => setValue(name, '')}
                  edge="end"
                  className="clear-button"
                  disableRipple
                  disableFocusRipple
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...field}
          {...fieldState}
        />
      )}
    />
  );
}
