import Api from 'Api';
import Select from 'Components/Form/Common/Select';
import SelectArrowDown from 'Icons/SelectArrowDown';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

export default function CuratorSelect({ name, label, required }) {
  const [options, setOptions] = useState([]);
  const { control, errors } = useFormContext();
  const watcher = useWatch({ control, name });
  const defaultValue = useMemo(() => {
    if (watcher && options?.length > 0) {
      return options.find(({ id }) => id === watcher);
    }

    return null;
  }, [options]);

  useEffect(() => {
    const fetchTerms = async (value) => {
      const { results } = await Api.get(Api.routes.users(), {
        first_name_ru: value,
        count: 0,
        role: 'curator',
      });
      setOptions(
        results.map((user) => ({
          value: user.id,
          label: `${user.first_name_ru} ${user.last_name_ru}`,
          ...user,
        }))
      );
    };

    fetchTerms();
  }, []);

  if (options?.length <= 0) return null;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <Select
            popupIcon={<SelectArrowDown />}
            multiple={false}
            required={required}
            defaultValue={defaultValue}
            name={field.name}
            errors={errors}
            textFieldProps={{
              margin: 'dense',
            }}
            label={!field.value ? label : ''}
            fullWidth
            disableClearable
            variant="outlined"
            getOptionLabel={(option) => option.label || ''}
            getOptionSelected={(option, value) => option.value === value.value}
            options={options}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
            }}
            inputLabelProps={{
              className: 'contest-form__select-label',
              shrink: false,
            }}
          />
        );
      }}
    />
  );
}
