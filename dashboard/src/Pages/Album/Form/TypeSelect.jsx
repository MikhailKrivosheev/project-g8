import Select from 'Components/Form/Common/Select';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { AlbumContext } from 'Context/Album';
import { DictionaryContext } from 'Context/Dictionaries';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Box } from '@material-ui/core';

const REQUIRED_MESSAGE = 'Required field';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    padding: '12px',
    '& p': {
      margin: '10px 0 0',
    },
  },
  tooltipConteiner: {
    marginLeft: '10px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

export default function CustomSelect({ name, label, required }) {
  const [options, setOptions] = useState([]);
  const { control, errors } = useFormContext();
  const [album] = useContext(AlbumContext);
  const dictionary = useContext(DictionaryContext);
  const classes = useStyles();

  const requiredOption = useMemo(() => {
    if (required) {
      if (typeof required === 'string') return required;
      return REQUIRED_MESSAGE;
    }
    return false;
  }, [required]);

  const defaultValue = useMemo(() => {
    if (dictionary && album) {
      const typeKey = Object.keys(dictionary.album_type).find(
        (key) => album.type === key
      );
      return {
        value: typeKey,
        label: dictionary.album_type[typeKey],
      };
    }

    return [];
  }, [dictionary]);

  useEffect(() => {
    if (dictionary) {
      setOptions(
        Object.entries(dictionary.album_type).map(([key, dictionaryLabel]) => ({
          value: key,
          label: dictionaryLabel,
        }))
      );
    }
  }, [dictionary]);

  return (
    <Box className={classes.container}>
      <Controller
        control={control}
        name={name}
        rules={{ required: requiredOption }}
        render={({ field }) => {
          return (
            <Select
              name={field.name}
              defaultValue={defaultValue}
              errors={errors}
              textFieldProps={{
                margin: 'dense',
              }}
              label={label}
              fullWidth
              required={required}
              inputRef={field?.ref}
              getOptionLabel={(option) => option.label || ''}
              getOptionSelected={
                (option, value) => option.value === value.value
                // eslint-disable-next-line react/jsx-curly-newline
              }
              options={options}
              onChange={(value) => {
                field.onChange(value.value);
              }}
            />
          );
        }}
      />
    </Box>
  );
}
