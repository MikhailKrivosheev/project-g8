import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

export default function PageFilterSearchField({ label }) {
  const { control, watch } = useFormContext();
  const searchWatcher = watch('search');
  const firstMount = useRef(true);

  const defaultValue = useMemo(() => {
    return searchWatcher || null;
  }, []);

  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!firstMount.current && !searchWatcher) {
      setReset((prev) => prev + 1);
    }
  }, [searchWatcher]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  // !! reset не срабатывает когда: производим поиск, обновляем страницу, жмем очистить
  return (
    <Grid item xs={4}>
      <Controller
        control={control}
        name="search"
        render={({ field }) => (
          <TextField
            fullWidth
            onChange={field.onChange}
            label={label}
            margin="dense"
            reset={reset}
            defaultValue={defaultValue}
            name={field.name}
          />
        )}
      />
    </Grid>
  );
}
