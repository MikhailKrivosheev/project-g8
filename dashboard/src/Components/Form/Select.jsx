import Select from 'Components/Form/Common/Select';
import { Controller, useFormContext } from 'react-hook-form';

export default function CommonSelect({
  defaultValue,
  reset,
  name,
  label,
  onChange,
  options,
  disableClearable,
  disabled,
  required,
  ...rest
}) {
  const { control, errors } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Select
            disabled={disabled}
            required={required}
            defaultValue={defaultValue}
            name={field.name}
            errors={errors}
            textFieldProps={{
              margin: 'dense',
            }}
            label={label}
            reset={reset}
            fullWidth
            disableClearable={disableClearable}
            variant="outlined"
            getOptionLabel={(option) => option.label || ''}
            getOptionSelected={(option, value) => option.value === value.value}
            options={options}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
              if (onChange) onChange(newValue);
            }}
            {...rest}
          />
        );
      }}
    />
  );
}
