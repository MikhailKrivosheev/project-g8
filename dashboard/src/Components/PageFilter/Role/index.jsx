import { Grid } from '@material-ui/core';
import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import utilities from '../../../../utilities';
import Select from '../../../Form/Select/SelectMaterial';

export default function PageRoleFilter() {
  const { control, errors, watch } = useFormContext();
  const { ROLE_STATUSES } = utilities.constants;
  const roleWatcher = watch('role');
  const firstMount = useRef(true);

  const findRoleObject = useCallback((roleValue) => {
    return ROLE_STATUSES.find(({ value }) => value === roleValue);
  }, []);

  const defaultValue = useMemo(() => {
    return findRoleObject(roleWatcher) || null;
  }, []);

  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!firstMount.current && !roleWatcher) {
      setReset((prev) => prev + 1);
    }
  }, [roleWatcher]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Grid item xs={4}>
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            errors={errors}
            textFieldProps={{
              margin: 'dense',
            }}
            defaultValue={defaultValue}
            reset={reset}
            label="Роль"
            fullWidth
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            options={ROLE_STATUSES}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
            }}
          />
        )}
      />
    </Grid>
  );
}
