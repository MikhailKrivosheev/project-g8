import React, { useEffect, useMemo, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useFormContext, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';
import Utilities from 'Utilities';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
}));

export default function DateFrom({ name }) {
  const classes = useStyles();
  const { control, watch } = useFormContext();
  const dateWatcher = watch(name);
  const firstMount = useRef(true);
  const id = useRef(nanoid());

  const defaultValue = useMemo(() => {
    return dateWatcher ? Utilities.date.dateToApp(dateWatcher) : null;
  }, []);

  const [reset, setReset] = useState(0);

  useEffect(() => {
    if (!firstMount.current && !dateWatcher) {
      setReset((prev) => prev + 1);
    }
  }, [dateWatcher]);

  useEffect(() => {
    firstMount.current = false;

    return () => {
      firstMount.current = true;
    };
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          onChange={({ target }) => {
            const { value } = target;
            field.onChange(Utilities.date.dateToServer(value));
          }}
          id={id.current}
          label="Левая граница даты создания"
          reset={reset}
          defaultValue={defaultValue}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
}
