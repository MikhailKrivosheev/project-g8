import { Button, Chip, Grid, TextField, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export default function TagsField({ label, name }) {
  const { control, setValue } = useFormContext();
  const tagsWatcher = useWatch({ control, name });
  const chipsStyles = useStyles();
  const inputRef = useRef();

  const onDelete = (tagToDelete) => {
    setValue(
      name,
      tagsWatcher.filter((tag) => tag !== tagToDelete)
    );
  };

  const addTags = () => {
    const tagsToBeAdded = inputRef.current.value
      .replace(/s*,s*/g, ',')
      .replace(/,{2,}/g, ',')
      .replace(/(^,|,$)/g, '')
      .split(',')
      .map((item) => item.trim());
    if (inputRef.current.value.length > 0 && tagsToBeAdded.length > 0) {
      if (tagsWatcher) {
        setValue(name, [...new Set([...tagsWatcher, ...tagsToBeAdded])]);
      } else {
        setValue(name, [...new Set(tagsToBeAdded)]);
      }
      inputRef.current.value = '';
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={() => (
        <Box width={1} mb={6} mt={3}>
          <Grid spacing={2} container direction="column">
            <Grid item>
              <TextField
                margin="dense"
                fullWidth
                inputRef={inputRef}
                label={label}
              />
            </Grid>
            {tagsWatcher?.length > 0 && (
              <Grid
                item
                component={(gridProps) => (
                  <Box
                    {...gridProps}
                    component="ul"
                    className={chipsStyles.root}
                    style={{ listStyle: 'none' }}
                  />
                )}
              >
                {tagsWatcher.map((tag) => (
                  <li key={tag}>
                    <Chip
                      className={chipsStyles.chip}
                      label={tag.name}
                      onDelete={() => onDelete(tag)}
                    />
                  </li>
                ))}
              </Grid>
            )}
            <Grid item>
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={addTags}
              >
                Добавить тэг
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    />
  );
}
