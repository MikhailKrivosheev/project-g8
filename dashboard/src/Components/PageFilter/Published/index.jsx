import { Grid } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import utilities from '../../../../utilities';
import Select from '../../../Form/Select/SelectMaterial';

export default function PublishedFilter() {
  const { control, errors, watch } = useFormContext();
  const { PUBLISHED_STATUSES } = utilities.constants;
  const publishedWatcher = watch('published');
  const firstMount = useRef(true);

  const findPublishedValue = useCallback((publishedValue) => {
    return PUBLISHED_STATUSES.find(({ value }) => value === publishedValue);
  });

  const defaultValue = useMemo(() => {
    return findPublishedValue(publishedWatcher) || null;
  }, []);

  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!firstMount.current && !publishedWatcher) {
      setReset((prev) => prev + 1);
    }
  }, [publishedWatcher]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Grid item xs={4}>
      <Controller
        name="published"
        control={control}
        render={({ field }) => (
          <Select
            name={field.name}
            errors={errors}
            defaultValue={defaultValue}
            reset={reset}
            label="Статус публикации"
            fullWidth
            getOptionLabel={(option) => option.label}
            getOptionSelected={(option, value) => option.value === value.value}
            options={PUBLISHED_STATUSES}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
            }}
          />
        )}
      />
    </Grid>
  );
}
