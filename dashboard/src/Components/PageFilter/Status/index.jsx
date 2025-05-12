import { Grid } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import utilities from 'Utilities';
import Select from 'Components/Form/Select';

export default function PageStatusFilter() {
  const { control, errors, watch } = useFormContext();
  const { CARD_STATUSES } = utilities.constants;
  const statusWatcher = watch('status');
  const firstMount = useRef(true);

  const defaultValue = useMemo(() => {
    if (statusWatcher) {
      return CARD_STATUSES.filter(
        ({ value }) => statusWatcher.indexOf(value) > -1
      );
    }
    return [];
  }, []);

  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!firstMount.current && !statusWatcher) {
      setReset((prev) => prev + 1);
    }
  }, [statusWatcher]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Grid item xs={4} container alignContent="flex-end">
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            multiple
            errors={errors}
            textFieldProps={{
              margin: 'dense',
            }}
            defaultValue={defaultValue}
            reset={reset}
            label="Статус"
            fullWidth
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            options={CARD_STATUSES}
            onChange={(newValue) => {
              field.onChange(newValue?.map(({ value }) => value));
            }}
          />
        )}
      />
    </Grid>
  );
}
